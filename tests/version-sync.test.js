import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const packageJson=JSON.parse(fs.readFileSync('package.json','utf8'));
const tauri=JSON.parse(fs.readFileSync('src-tauri/tauri.conf.json','utf8'));
const cargo=fs.readFileSync('src-tauri/Cargo.toml','utf8');
const packageLock=JSON.parse(fs.readFileSync('package-lock.json','utf8'));
const cargoLock=fs.readFileSync('src-tauri/Cargo.lock','utf8');
const main=fs.readFileSync('src/main.js','utf8');
const vite=fs.readFileSync('vite.config.js','utf8');
const rustVersion=cargo.match(/^version\s*=\s*"([^"]+)"/m)?.[1];

test('versioni tecniche sincronizzate',()=>{
  assert.equal(packageJson.version,'26.10.2');
  assert.equal(packageLock.version,packageJson.version);
  assert.equal(packageLock.packages[''].version,packageJson.version);
  assert.equal(tauri.version,packageJson.version);
  assert.equal(rustVersion,packageJson.version);
  const cargoLockVersion=cargoLock.match(/\[\[package\]\]\r?\nname = "davspace"\r?\nversion = "([^"]+)"/)?.[1];
  assert.equal(cargoLockVersion,packageJson.version);
});


test('Cargo.lock resta leggibile con CRLF Windows',()=>{
  const windowsCargoLock=cargoLock.replace(/(?<!\r)\n/g,'\r\n');
  const cargoLockVersion=windowsCargoLock.match(/\[\[package\]\]\r?\nname = "davspace"\r?\nversion = "([^"]+)"/)?.[1];
  assert.equal(cargoLockVersion,packageJson.version);
});

test('interfaccia legge versione da Tauri',()=>{
  assert.match(main,/getVersion/);
  assert.doesNotMatch(main,/v0\.1\.0/);
});

test('Vite usa Oxc e ignora src-tauri',()=>{
  assert.match(vite,/minify:'oxc'/);
  assert.match(vite,/src-tauri/);
  assert.doesNotMatch(vite,/minify:'esbuild'/);
});
