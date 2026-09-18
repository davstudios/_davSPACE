export const categoryOrder = ['video', 'images', 'audio', 'documents', 'archives', 'code', 'applications', 'other'];

export function formatBytes(value) {
  const bytes = Number(value) || 0;
  if (bytes < 1024) return `${bytes} B`;
  const units = ['KB', 'MB', 'GB', 'TB', 'PB'];
  let amount = bytes;
  let index = -1;
  do {
    amount /= 1024;
    index += 1;
  } while (amount >= 1024 && index < units.length - 1);
  const digits = amount >= 100 ? 0 : amount >= 10 ? 1 : 2;
  return `${amount.toFixed(digits)} ${units[index]}`;
}

export function formatCount(value) {
  return new Intl.NumberFormat().format(Number(value) || 0);
}

export function percentage(value, total) {
  if (!total) return 0;
  return Math.max(0, Math.min(100, (Number(value) / Number(total)) * 100));
}

export function normalizeSearch(value) {
  return String(value || '').trim().toLocaleLowerCase();
}

export function matchesFile(file, query) {
  const needle = normalizeSearch(query);
  if (!needle) return true;
  return [file.name, file.path, file.extension, file.category].some((value) => normalizeSearch(value).includes(needle));
}

export function sortLargest(files) {
  return [...files].sort((a, b) => Number(b.size) - Number(a.size));
}

export function topItems(items, limit = 12) {
  return [...items].sort((a, b) => Number(b.size) - Number(a.size)).slice(0, limit);
}
