import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const packageJson=JSON.parse(fs.readFileSync('package.json','utf8'));
const tauri=JSON.parse(fs.readFileSync('src-tauri/tauri.conf.json','utf8'));
const cargo=fs.readFileSync('src-tauri/Cargo.toml','utf8');
const launcher=fs.readFileSync('RUN-WINDOWS.bat','utf8');
const vite=fs.readFileSync('vite.config.js','utf8');
const scanner=fs.readFileSync('src-tauri/src/space.rs','utf8');
const releaseWorkflow=fs.readFileSync('.github/workflows/release.yml','utf8');

test('Windows launcher preserves the proven _davRENAME flow',()=>{
  assert.match(launcher,/npm install --no-audit --no-fund/i);
  assert.match(launcher,/npm run desktop/i);
});

test('Vite development configuration preserves the proven Tauri isolation',()=>{
  assert.match(vite,/const host = process\.env\.TAURI_DEV_HOST/);
  assert.match(vite,/src-tauri/);
  assert.match(vite,/strictPort:true/);
});

test('frontend and Tauri dependency versions match the proven base',()=>{
  assert.equal(packageJson.dependencies['@tauri-apps/api'],'2.11.1');
  assert.equal(packageJson.dependencies['@tauri-apps/plugin-dialog'],'2.7.3');
  assert.equal(packageJson.devDependencies['@tauri-apps/cli'],'2.11.4');
  assert.equal(packageJson.devDependencies.vite,'8.2.2');
});

test('release metadata and required files are coherent',()=>{
  const rustVersion=cargo.match(/^version\s*=\s*"([^"]+)"/m)?.[1];
  assert.equal(packageJson.version,'26.10.1');
  assert.equal(tauri.version,packageJson.version);
  assert.equal(rustVersion,packageJson.version);
  for(const path of ['README.md','CHANGELOG.md','src-tauri/icons/icon.ico'])assert.equal(fs.existsSync(path),true);
});


test('GitHub release workflow matches the stable suite flow',()=>{
  assert.match(releaseWorkflow,/push:\s*\n\s*tags:/);
  assert.match(releaseWorkflow,/github\.ref_name/);
  assert.match(releaseWorkflow,/Verify release versions/);
  assert.match(releaseWorkflow,/Read release description from tagged commit/);
  assert.match(releaseWorkflow,/git log -1 --pretty=%b/);
  assert.match(releaseWorkflow,/releaseBody:\s*\$\{\{ steps\.release_description\.outputs\.body \}\}/);
  assert.match(releaseWorkflow,/prerelease:\s*false/);
  assert.match(releaseWorkflow,/releaseName:\s*'_davSPACE v__VERSION__'/);
  assert.doesNotMatch(releaseWorkflow,/Stable release of _davSPACE|generateReleaseNotes:\s*true/);
});

test('scanner contract is read-only and does not follow symlinks',()=>{
  assert.match(scanner,/follow_links\(false\)/);
  assert.match(scanner,/file_type\.is_symlink\(\)/);
  assert.doesNotMatch(scanner,/fs::(?:write|remove_file|remove_dir|rename|copy)/);
});

test('Linux release workflow ignores unrelated Microsoft apt repository',()=>{
  assert.match(releaseWorkflow,/packages\.microsoft\.com/);
  assert.match(releaseWorkflow,/disabled-davspace/);
  assert.match(releaseWorkflow,/Acquire::Retries=3/);
  assert.match(releaseWorkflow,/--no-install-recommends/);
});

test('metadata pacchetto _davstudios presenti',()=>{
  assert.equal(packageJson.author,'_davstudios');
  assert.equal(packageJson.license,'MIT');
  assert.equal(packageJson.homepage,'https://davstudios.it');
  assert.equal(tauri.identifier,'studio.dav.space');
  assert.equal(tauri.bundle.category,'Productivity');
  assert.equal(tauri.bundle.publisher,'_davstudios');
  assert.equal(tauri.bundle.homepage,'https://davstudios.it');
  assert.equal(tauri.bundle.copyright,'© 2026 _davstudios');
  assert.equal(tauri.bundle.license,'MIT');
  assert.equal(tauri.bundle.licenseFile,'../LICENSE');
  assert.equal(tauri.bundle.linux.deb.section,'utils');
  assert.equal(tauri.bundle.linux.deb.priority,'optional');
  assert.match(cargo,/license = "MIT"/);
  assert.match(cargo,/homepage = "https:\/\/davstudios\.it"/);
});

test('identifier storico resta invariato',()=>{
  assert.equal(tauri.identifier,'studio.dav.space');
});

test('package metadata e set icone documentano lo standard release',()=>{
  const metadata=fs.readFileSync('PACKAGE-METADATA.md','utf8');
  assert.match(metadata,/Version: `26\.10\.1`/);
  assert.match(metadata,/Public release tag: `v26\.10\.1`/);
  assert.match(metadata,/Developer \/ Publisher: `_davstudios`/);
  assert.match(metadata,/Identifier: `studio\.dav\.space`/);
  assert.match(metadata,/Category: `Productivity`/);
  for(const file of ['32x32.png','128x128.png','128x128@2x.png','app-icon.png','icon.ico','icon.icns']){
    assert.equal(fs.existsSync(`src-tauri/icons/${file}`),true,`${file} mancante`);
  }
});

