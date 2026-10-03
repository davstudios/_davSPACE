import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const packageJson = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8'));
const packageLock = JSON.parse(readFileSync(resolve(root, 'package-lock.json'), 'utf8'));
const tauriConfig = JSON.parse(readFileSync(resolve(root, 'src-tauri/tauri.conf.json'), 'utf8'));
const cargoText = readFileSync(resolve(root, 'src-tauri/Cargo.toml'), 'utf8');
const cargoLockText = readFileSync(resolve(root, 'src-tauri/Cargo.lock'), 'utf8');
const mainSource = readFileSync(resolve(root, 'src/main.js'), 'utf8');
const viteSource = readFileSync(resolve(root, 'vite.config.js'), 'utf8');
const cargoVersion = cargoText.match(/^version\s*=\s*"([^"]+)"/m)?.[1];

function cargoLockVersion(text) {
  return text.match(/\[\[package\]\]\r?\nname = "davspace"\r?\nversion = "([^"]+)"/)?.[1];
}

test('versioni tecniche sincronizzate', () => {
  assert.equal(packageJson.version, '26.10.3');
  assert.equal(packageLock.version, packageJson.version);
  assert.equal(packageLock.packages[''].version, packageJson.version);
  assert.equal(tauriConfig.version, packageJson.version);
  assert.equal(cargoVersion, packageJson.version);
  assert.equal(cargoLockVersion(cargoLockText), packageJson.version);
});

test('Cargo.lock resta leggibile con CRLF Windows', () => {
  const windowsCargoLock = cargoLockText.replace(/\r?\n/g, '\r\n');
  assert.equal(cargoLockVersion(windowsCargoLock), packageJson.version);
});

test('interfaccia legge versione da Tauri', () => {
  assert.match(mainSource, /getVersion/);
  assert.doesNotMatch(mainSource, /v0\.1\.0/);
});

test('Vite usa Oxc e ignora src-tauri', () => {
  assert.match(viteSource, /minify:'oxc'/);
  assert.match(viteSource, /src-tauri/);
  assert.doesNotMatch(viteSource, /minify:'esbuild'/);
});

