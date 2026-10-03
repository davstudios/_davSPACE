import test from 'node:test';
import assert from 'node:assert/strict';
import { formatBytes, formatCount, matchesFile, normalizeSearch, percentage, sortLargest, topItems } from '../src/space-utils.js';

test('formatBytes formats byte values', () => {
  assert.equal(formatBytes(0), '0 B');
  assert.equal(formatBytes(1024), '1.00 KB');
  assert.equal(formatBytes(1024 * 1024), '1.00 MB');
});

test('formatCount formats numeric counts', () => {
  assert.equal(formatCount(0), '0');
  assert.ok(formatCount(1200).length >= 5);
});

test('percentage stays inside valid range', () => {
  assert.equal(percentage(50, 100), 50);
  assert.equal(percentage(5, 0), 0);
  assert.equal(percentage(200, 100), 100);
});

test('normalizeSearch trims and normalizes case', () => {
  assert.equal(normalizeSearch('  PHOTO.JPG '), 'photo.jpg');
});

test('matchesFile checks name path extension and category', () => {
  const file = { name: 'Movie.MP4', path: '/Videos/Movie.MP4', extension: 'mp4', category: 'video' };
  assert.equal(matchesFile(file, 'movie'), true);
  assert.equal(matchesFile(file, 'video'), true);
  assert.equal(matchesFile(file, 'pdf'), false);
});

test('sortLargest sorts without mutating input', () => {
  const input = [{ size: 10 }, { size: 30 }, { size: 20 }];
  const result = sortLargest(input);
  assert.deepEqual(result.map((item) => item.size), [30, 20, 10]);
  assert.deepEqual(input.map((item) => item.size), [10, 30, 20]);
});

test('topItems limits and sorts buckets', () => {
  const result = topItems([{ size: 2 }, { size: 8 }, { size: 4 }], 2);
  assert.deepEqual(result.map((item) => item.size), [8, 4]);
});

