/* Downloads all catalog + page images locally and emits assets/catalog.js */
const fs = require('fs');
const path = require('path');
const https = require('https');

const ROOT = __dirname;
const IMG_DIR = path.join(ROOT, 'assets', 'p');
fs.mkdirSync(IMG_DIR, { recursive: true });

const read = f => JSON.parse(fs.readFileSync(path.join(ROOT, 'data', f), 'utf8'));
const mugs = read('mugs.json');
const cupSaucer = read('cup-saucer.json');

const withLimit = u => {
  if (!u) return u;
  if (u.includes('f_auto') || u.includes('q_auto')) {
    return u.replace('/upload/', '/upload/f_auto,q_auto,w_640,c_limit/');
  }
  return u.replace('/upload/', '/upload/f_auto,q_auto,w_640,c_limit/');
};

function download(url, dest) {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(dest)) return resolve('cached');
    const file = fs.createWriteStream(dest);
    https.get(url, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        file.close(); fs.unlinkSync(dest);
        return download(res.headers.location, dest).then(resolve, reject);
      }
      if (res.statusCode !== 200) { file.close(); fs.unlinkSync(dest); return reject(new Error('HTTP ' + res.statusCode + ' for ' + url)); }
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', err => { file.close(); try { fs.unlinkSync(dest); } catch {} reject(err); });
  });
}

const ext = u => (path.extname(new URL(u).pathname) || '.jpg').toLowerCase();

(async () => {
  const catalog = [];
  const jobs = [];
  const pushGroup = (group, collection) => {
    for (const item of group.items) {
      const id = item.slug.split('/').pop();
      const aExt = ext(item.imgA), bExt = item.imgB ? ext(item.imgB) : null;
      const rec = {
        id, slug: item.slug, name: item.name, price: item.price, mrp: item.mrp,
        badge: item.badge, oos: item.oos, reviews: item.reviews, collection,
        imgA: `assets/p/${id}-a${aExt}`,
        imgB: item.imgB ? `assets/p/${id}-b${bExt}` : '',
      };
      catalog.push(rec);
      jobs.push([withLimit(item.imgA), path.join(IMG_DIR, `${id}-a${aExt}`)]);
      if (item.imgB) jobs.push([withLimit(item.imgB), path.join(IMG_DIR, `${id}-b${bExt}`)]);
    }
  };
  pushGroup(mugs, 'mugs');
  pushGroup(cupSaucer, 'cup-saucer');

  const extra = [
    ['assets/about-founders.jpg', 'https://res.cloudinary.com/dtyvqag3h/image/upload/f_auto,q_auto,w_1080,c_limit/v1776399316/418cf639-9232-4dc5-856e-eca62ece02c7_hkivsw.jpg'],
    ['assets/about-studio.jpg', 'https://res.cloudinary.com/dtyvqag3h/image/upload/f_auto,q_auto,w_1080,c_limit/v1776288254/Momento_de_Respirac%CC%A7a%CC%83o_gbmp6y.jpg'],
    ['assets/blog-artisans.jpg', 'https://res.cloudinary.com/dtyvqag3h/image/upload/f_auto,q_auto,w_1080,c_limit/v1776288462/Unique_Bargains_Wooden_Resistance_to_Warping_and_Cracking_Round_Pottery_Wheel_Bat_6_Pcs_6_ledeev.jpg'],
    ['assets/blog-ritual.jpg', 'https://res.cloudinary.com/dtyvqag3h/image/upload/f_auto,q_auto,w_1080,c_limit/v1776288635/20_Morning_Self_Care_Activities_to_Kickstart_Your_Day_with_Positivity_Number_11_Is_a_Must_v25pxr.jpg'],
    ['assets/blog-gifting.jpg', 'https://res.cloudinary.com/dtyvqag3h/image/upload/f_auto,q_auto,w_1080,c_limit/v1776288801/Artisanal_finds_unique_gifts_and_one_of_a_kind_cgtgjd.jpg'],
  ];
  for (const [dest, url] of extra) jobs.push([url, path.join(ROOT, dest)]);

  let done = 0, failed = [];
  for (const [url, dest] of jobs) {
    try { await download(url, dest); done++; }
    catch (e) { failed.push(dest); console.error('FAIL', dest, e.message); }
  }
  fs.writeFileSync(path.join(ROOT, 'assets', 'catalog.js'),
    'window.KYUTO_CATALOG = ' + JSON.stringify(catalog, null, 1) + ';\n');
  console.log(`downloaded/cached ${done}/${jobs.length} images; ${catalog.length} catalog items`);
  if (failed.length) { console.error('FAILED:', failed.join(', ')); process.exitCode = 1; }
})();
