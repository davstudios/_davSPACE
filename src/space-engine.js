export const categoryOrder=['video','image','audio','archive','document','code','other'];

const sets={
  video:new Set(['mp4','mkv','mov','webm','avi','m4v','wmv','flv','mpeg','mpg','ts','mts','m2ts']),
  image:new Set(['jpg','jpeg','png','webp','avif','gif','bmp','tif','tiff','heic','heif','svg','ico','raw','cr2','nef','arw']),
  audio:new Set(['mp3','m4a','aac','wav','flac','ogg','opus','wma','aiff','alac']),
  archive:new Set(['zip','7z','rar','tar','gz','bz2','xz','iso','dmg']),
  document:new Set(['pdf','doc','docx','xls','xlsx','ppt','pptx','odt','ods','odp','rtf','txt','md','csv','epub']),
  code:new Set(['js','mjs','cjs','ts','tsx','jsx','rs','py','java','c','cpp','h','hpp','go','swift','kt','kts','php','rb','cs','html','css','scss','json','xml','yaml','yml','toml','sql','sh','ps1'])
};

export function categoryForExtension(extension=''){
  const ext=String(extension).toLowerCase().replace(/^\./,'');
  return categoryOrder.find((category)=>sets[category]?.has(ext))||'other';
}

export function formatBytes(value=0){
  const bytes=Math.max(0,Number(value)||0);
  if(bytes<1024) return `${bytes} B`;
  const units=['KB','MB','GB','TB','PB'];
  let amount=bytes;
  let index=-1;
  do{amount/=1024;index+=1;}while(amount>=1024&&index<units.length-1);
  const digits=amount>=100?0:amount>=10?1:2;
  return `${amount.toFixed(digits)} ${units[index]}`;
}

export function percent(part,total){
  const denominator=Number(total)||0;
  if(denominator<=0) return 0;
  return Math.max(0,Math.min(100,(Number(part)||0)/denominator*100));
}

export function filterFiles(files,{search='',category='all',minBytes=0}={}){
  const needle=String(search).trim().toLowerCase();
  return (Array.isArray(files)?files:[]).filter((file)=>{
    if(category!=='all'&&file.category!==category) return false;
    if(Number(file.size||0)<Number(minBytes||0)) return false;
    if(!needle) return true;
    return String(file.name||'').toLowerCase().includes(needle)||String(file.path||'').toLowerCase().includes(needle);
  });
}

export function pageSlice(items,page=1,pageSize=200){
  const safePage=Math.max(1,Number(page)||1);
  const safeSize=Math.max(1,Number(pageSize)||200);
  const pages=Math.max(1,Math.ceil((items?.length||0)/safeSize));
  const current=Math.min(safePage,pages);
  return {items:(items||[]).slice((current-1)*safeSize,current*safeSize),page:current,pages,total:items?.length||0};
}
