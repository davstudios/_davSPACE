import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const packageJson=JSON.parse(fs.readFileSync('package.json','utf8'));
const tauri=JSON.parse(fs.readFileSync('src-tauri/tauri.conf.json','utf8'));
const cargo=fs.readFileSync('src-tauri/Cargo.toml','utf8');
const launcher=fs.readFileSync('RUN-WINDOWS.bat','utf8');
const vite=fs.readFileSync('vite.config.js','utf8');
const scanner=fs.readFileSync('src-tauri/src/space.rs','utf8');

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
  assert.equal(packageJson.version,'1.0.2');
  assert.equal(tauri.version,packageJson.version);
  assert.equal(rustVersion,packageJson.version);
  for(const path of ['README.md','CHANGELOG.md','src-tauri/icons/icon.ico'])assert.equal(fs.existsSync(path),true);
});

test('scanner contract is read-only and does not follow symlinks',()=>{
  assert.match(scanner,/follow_links\(false\)/);
  assert.match(scanner,/file_type\.is_symlink\(\)/);
  assert.doesNotMatch(scanner,/fs::(?:write|remove_file|remove_dir|rename|copy)/);
});
