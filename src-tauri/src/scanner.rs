use serde::Serialize;
use std::collections::HashMap;
use std::path::{Path, PathBuf};
use std::time::Instant;
use walkdir::WalkDir;

#[derive(Serialize, Clone)]
pub struct Bucket {
    key: String,
    size: u64,
    count: u64,
}

#[derive(Serialize, Clone)]
pub struct FolderBucket {
    name: String,
    path: String,
    size: u64,
    count: u64,
}

#[derive(Serialize, Clone)]
pub struct FileEntry {
    name: String,
    path: String,
    extension: String,
    category: String,
    size: u64,
}

#[derive(Serialize)]
pub struct ScanResult {
    root: String,
    root_name: String,
    total_size: u64,
    files: u64,
    folders: u64,
    skipped: u64,
    duration_ms: u64,
    categories: Vec<Bucket>,
    extensions: Vec<Bucket>,
    folders_breakdown: Vec<FolderBucket>,
    largest_files: Vec<FileEntry>,
}

fn category_for(extension: &str) -> &'static str {
    match extension {
        "mp4" | "mkv" | "mov" | "avi" | "webm" | "mpeg" | "mpg" | "m4v" | "mts" | "m2ts" | "flv" | "wmv" | "3gp" | "3g2" | "ogv" | "vob" | "asf" | "f4v" => "video",
        "jpg" | "jpeg" | "png" | "webp" | "avif" | "bmp" | "tif" | "tiff" | "gif" | "heic" | "heif" | "ico" | "svg" | "psd" | "psb" | "dng" | "cr2" | "cr3" | "nef" | "arw" | "orf" | "rw2" | "raf" | "pef" | "srw" | "jxl" | "jp2" | "j2k" | "tga" => "images",
        "mp3" | "wav" | "flac" | "aac" | "m4a" | "ogg" | "opus" | "wma" | "aiff" | "aif" | "ac3" | "amr" | "caf" | "alac" | "ape" | "mka" | "mid" | "midi" => "audio",
        "pdf" | "doc" | "docx" | "odt" | "rtf" | "pages" | "ppt" | "pptx" | "odp" | "key" | "xls" | "xlsx" | "ods" | "numbers" | "epub" | "mobi" | "azw" | "azw3" | "fb2" | "txt" | "md" | "markdown" => "documents",
        "zip" | "7z" | "rar" | "tar" | "gz" | "tgz" | "bz2" | "tbz2" | "xz" | "txz" | "zst" | "cab" | "iso" | "dmg" => "archives",
        "js" | "mjs" | "cjs" | "ts" | "tsx" | "jsx" | "html" | "htm" | "css" | "scss" | "sass" | "less" | "json" | "yaml" | "yml" | "xml" | "csv" | "tsv" | "toml" | "ini" | "log" | "rs" | "py" | "java" | "kt" | "swift" | "go" | "c" | "h" | "cpp" | "hpp" | "cs" | "php" | "rb" | "sql" | "sh" | "ps1" | "bat" => "code",
        "exe" | "msi" | "app" | "appimage" | "deb" | "rpm" | "pkg" | "apk" | "jar" | "dll" | "so" | "dylib" => "applications",
        _ => "other",
    }
}

fn extension_for(path: &Path) -> String {
    path.extension()
        .and_then(|value| value.to_str())
        .unwrap_or("")
        .to_lowercase()
}

fn add_bucket(map: &mut HashMap<String, (u64, u64)>, key: &str, size: u64) {
    let entry = map.entry(key.to_string()).or_insert((0, 0));
    entry.0 = entry.0.saturating_add(size);
    entry.1 = entry.1.saturating_add(1);
}

fn buckets_from(map: HashMap<String, (u64, u64)>) -> Vec<Bucket> {
    let mut values: Vec<Bucket> = map
        .into_iter()
        .map(|(key, (size, count))| Bucket { key, size, count })
        .collect();
    values.sort_by(|a, b| b.size.cmp(&a.size).then_with(|| a.key.cmp(&b.key)));
    values
}

fn folder_buckets_from(map: HashMap<String, (String, u64, u64)>) -> Vec<FolderBucket> {
    let mut values: Vec<FolderBucket> = map
        .into_iter()
        .map(|(name, (path, size, count))| FolderBucket { name, path, size, count })
        .collect();
    values.sort_by(|a, b| b.size.cmp(&a.size).then_with(|| a.name.cmp(&b.name)));
    values
}

#[tauri::command]
pub async fn scan_directory(path: String) -> Result<ScanResult, String> {
    tauri::async_runtime::spawn_blocking(move || scan_directory_blocking(path))
        .await
        .map_err(|error| error.to_string())?
}

fn scan_directory_blocking(path: String) -> Result<ScanResult, String> {
    let started = Instant::now();
    let root = PathBuf::from(&path);
    if !root.exists() {
        return Err("Selected path does not exist".to_string());
    }
    if !root.is_dir() {
        return Err("Selected path is not a directory".to_string());
    }

    let mut total_size = 0_u64;
    let mut files = 0_u64;
    let mut folders = 0_u64;
    let mut skipped = 0_u64;
    let mut categories: HashMap<String, (u64, u64)> = HashMap::new();
    let mut extensions: HashMap<String, (u64, u64)> = HashMap::new();
    let mut top_folders: HashMap<String, (String, u64, u64)> = HashMap::new();
    let mut largest_files: Vec<FileEntry> = Vec::with_capacity(500);

    for result in WalkDir::new(&root).follow_links(false).into_iter() {
        let entry = match result {
            Ok(value) => value,
            Err(_) => {
                skipped = skipped.saturating_add(1);
                continue;
            }
        };

        if entry.depth() == 0 {
            continue;
        }

        if entry.file_type().is_dir() {
            folders = folders.saturating_add(1);
            continue;
        }

        if !entry.file_type().is_file() {
            continue;
        }

        let metadata = match entry.metadata() {
            Ok(value) => value,
            Err(_) => {
                skipped = skipped.saturating_add(1);
                continue;
            }
        };

        let size = metadata.len();
        let file_path = entry.path();
        let extension = extension_for(file_path);
        let category = category_for(&extension).to_string();
        let name = entry.file_name().to_string_lossy().to_string();
        let full_path = file_path.to_string_lossy().to_string();

        total_size = total_size.saturating_add(size);
        files = files.saturating_add(1);
        add_bucket(&mut categories, &category, size);
        add_bucket(&mut extensions, if extension.is_empty() { "—" } else { &extension }, size);

        if let Ok(relative) = file_path.strip_prefix(&root) {
            let mut components = relative.components();
            if let Some(first) = components.next() {
                if components.next().is_some() {
                    let folder_name = first.as_os_str().to_string_lossy().to_string();
                    let folder_path = root.join(first.as_os_str()).to_string_lossy().to_string();
                    let folder = top_folders.entry(folder_name).or_insert((folder_path, 0, 0));
                    folder.1 = folder.1.saturating_add(size);
                    folder.2 = folder.2.saturating_add(1);
                }
            }
        }

        largest_files.push(FileEntry {
            name,
            path: full_path,
            extension,
            category,
            size,
        });

        if largest_files.len() > 500 {
            largest_files.sort_by(|a, b| b.size.cmp(&a.size));
            largest_files.truncate(250);
        }
    }

    largest_files.sort_by(|a, b| b.size.cmp(&a.size).then_with(|| a.name.cmp(&b.name)));
    largest_files.truncate(250);

    let root_name = root
        .file_name()
        .and_then(|value| value.to_str())
        .filter(|value| !value.is_empty())
        .unwrap_or(&path)
        .to_string();

    Ok(ScanResult {
        root: root.to_string_lossy().to_string(),
        root_name,
        total_size,
        files,
        folders,
        skipped,
        duration_ms: started.elapsed().as_millis() as u64,
        categories: buckets_from(categories),
        extensions: buckets_from(extensions),
        folders_breakdown: folder_buckets_from(top_folders),
        largest_files,
    })
}


