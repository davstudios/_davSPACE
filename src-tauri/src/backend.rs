use crate::core::{result, ActionOptions, ActionResult};
use std::{collections::BTreeMap, path::Path};
use walkdir::WalkDir;

fn category(path: &Path) -> &'static str {
    match path.extension().and_then(|v| v.to_str()).unwrap_or("").to_lowercase().as_str() {
        "mp4"|"mkv"|"mov"|"avi"|"webm"=>"Video","jpg"|"jpeg"|"png"|"webp"|"gif"|"heic"|"tiff"=>"Images","pdf"|"doc"|"docx"|"xls"|"xlsx"|"ppt"|"pptx"|"txt"|"md"=>"Documents","zip"|"rar"|"7z"|"tar"|"gz"=>"Archives","mp3"|"wav"|"flac"|"aac"|"m4a"|"ogg"|"opus"=>"Audio",_=>"Other"
    }
}

#[tauri::command]
pub fn run_action(action: String, paths: Vec<String>, _options: ActionOptions) -> ActionResult {
    if action != "scan" && action != "largest" && action != "categories" { return result(false,"Preview feature","This visualization will be enabled after scanner validation",action); }
    let Some(root) = paths.first() else { return result(false,"Folder required","Choose a folder to scan",String::new()); };
    let mut total=0u64; let mut files=0u64; let mut dirs=0u64; let mut cats:BTreeMap<String,u64>=BTreeMap::new(); let mut largest:Vec<(u64,String)>=Vec::new();
    for entry in WalkDir::new(root).follow_links(false).into_iter().filter_map(Result::ok) {
        if entry.file_type().is_dir(){dirs+=1;continue;} if !entry.file_type().is_file(){continue;}
        if let Ok(meta)=entry.metadata(){let size=meta.len();total+=size;files+=1;*cats.entry(category(entry.path()).into()).or_default()+=size;largest.push((size,entry.path().to_string_lossy().into_owned()));}
    }
    largest.sort_by(|a,b|b.0.cmp(&a.0)); largest.truncate(20);
    let cat_text=cats.into_iter().map(|(k,v)|format!("{}: {} bytes",k,v)).collect::<Vec<_>>().join("\n");
    let big_text=largest.into_iter().map(|(s,p)|format!("{} bytes · {}",s,p)).collect::<Vec<_>>().join("\n");
    result(true,"Scan completed",&format!("{} files · {} folders · {} bytes",files,dirs,total),format!("CATEGORIES\n{}\n\nLARGEST FILES\n{}",cat_text,big_text))
}
