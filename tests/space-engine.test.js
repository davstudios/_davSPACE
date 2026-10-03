import test from 'node:test';
import assert from 'node:assert/strict';
import { categoryForExtension, filterFiles, formatBytes, pageSlice, percent } from '../src/space-engine.js';

test('classifica formati comuni',()=>{
  assert.equal(categoryForExtension('mp4'),'video');
  assert.equal(categoryForExtension('.png'),'image');
  assert.equal(categoryForExtension('flac'),'audio');
  assert.equal(categoryForExtension('zip'),'archive');
  assert.equal(categoryForExtension('pdf'),'document');
  assert.equal(categoryForExtension('rs'),'code');
  assert.equal(categoryForExtension('abc'),'other');
});

test('formatta dimensioni',()=>{
  assert.equal(formatBytes(0),'0 B');
  assert.equal(formatBytes(1024),'1.00 KB');
  assert.equal(formatBytes(1024*1024),'1.00 MB');
});

test('percentuale resta entro i limiti',()=>{
  assert.equal(percent(50,100),50);
  assert.equal(percent(200,100),100);
  assert.equal(percent(1,0),0);
});

test('filtra file per ricerca categoria e dimensione',()=>{
  const files=[
    {name:'film.mp4',path:'/video/film.mp4',category:'video',size:100},
    {name:'foto.png',path:'/img/foto.png',category:'image',size:50}
  ];
  assert.equal(filterFiles(files,{search:'film'}).length,1);
  assert.equal(filterFiles(files,{category:'image'}).length,1);
  assert.equal(filterFiles(files,{minBytes:60}).length,1);
});

test('pagina risultati senza limiti artificiali',()=>{
  const input=Array.from({length:451},(_,index)=>index);
  const page=pageSlice(input,3,200);
  assert.equal(page.items.length,51);
  assert.equal(page.pages,3);
  assert.equal(page.total,451);
});

