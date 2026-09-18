import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

function text(name) {
  return readFileSync(resolve(root, name), 'utf8');
}

test('Windows launcher preserves the proven _davRENAME flow', () => {
  const launcher = text('RUN-WINDOWS.bat');
  assert.match(launcher, /where node >nul 2>nul/i);
  assert.match(launcher, /where cargo >nul 2>nul/i);
  assert.match(launcher, /npm install --no-audit --no-fund/i);
  assert.match(launcher, /npm run desktop/i);
  assert.match(launcher, /if errorlevel 1 pause/i);
});

test('Vite development configuration preserves the proven Tauri isolation', () => {
  const config = text('vite.config.js');
  assert.match(config, /const host = process\.env\.TAURI_DEV_HOST/);
  assert.match(config, /port: 5173/);
  assert.match(config, /strictPort: true/);
  assert.match(config, /host: host \|\| false/);
  assert.match(config, /hmr: host \? \{ protocol: 'ws', host, port: 5174 \} : undefined/);
  assert.match(config, /watch: \{ ignored: \['\*\*\/src-tauri\/\*\*'\] \}/);
});

test('frontend and Tauri dependency versions match the proven base', () => {
  const pkg = JSON.parse(text('package.json'));
  assert.equal(pkg.dependencies['@tauri-apps/api'], '2.11.1');
  assert.equal(pkg.dependencies['@tauri-apps/plugin-dialog'], '2.7.3');
  assert.equal(pkg.dependencies['@tauri-apps/plugin-opener'], '2');
  assert.equal(pkg.devDependencies['@tauri-apps/cli'], '2.11.4');
  assert.equal(pkg.devDependencies.vite, '8.2.2');
  const cargo = text('src-tauri/Cargo.toml');
  assert.match(cargo, /rust-version = "1\.77\.2"/);
  assert.match(cargo, /tauri-plugin-dialog = "2"/);
  assert.match(cargo, /tauri-plugin-opener = "2"/);
});

test('preview metadata and required files are coherent', () => {
  const config = JSON.parse(text('src-tauri/tauri.conf.json'));
  assert.equal(config.productName, '_davSPACE');
  assert.equal(config.version, '0.1.0');
  assert.equal(config.identifier, 'studio.dav.space');
  assert.equal(existsSync(resolve(root, 'README.md')), true);
  assert.equal(existsSync(resolve(root, 'src-tauri/icons/icon.ico')), true);
  assert.equal(existsSync(resolve(root, 'src-tauri/icons/icon.icns')), true);
  assert.equal(existsSync(resolve(root, 'src-tauri/icons/app-icon.png')), true);
});

test('scanner contract is read-only and does not follow symlinks', () => {
  const scanner = text('src-tauri/src/scanner.rs');
  assert.match(scanner, /follow_links\(false\)/);
  assert.doesNotMatch(scanner, /remove_file|remove_dir|rename\(|write\(|create_dir|File::create/);
});
