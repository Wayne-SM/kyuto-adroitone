const fs = require('fs');
const file = 'C:/Projects/Kyuto/index.html';
let s = fs.readFileSync(file, 'utf8');
const all = [
  ['<a href="#collections">Candles</a>', '<a href="collections/candles.html">Candles</a>'],
  ['<a href="#collections">Mugs</a>', '<a href="collections/mugs.html">Mugs</a>'],
  ['<a href="#collections">Cup-Saucer Sets</a>', '<a href="collections/cup-saucer.html">Cup-Saucer Sets</a>'],
  ['<a href="#collections">Bowls</a>', '<a href="collections/bowls.html">Bowls</a>'],
  ['<a class="drawer-sub" href="#collections">Candles</a>', '<a class="drawer-sub" href="collections/candles.html">Candles</a>'],
  ['<a class="drawer-sub" href="#collections">Mugs</a>', '<a class="drawer-sub" href="collections/mugs.html">Mugs</a>'],
  ['<a class="drawer-sub" href="#collections">Cup-Saucer Sets</a>', '<a class="drawer-sub" href="collections/cup-saucer.html">Cup-Saucer Sets</a>'],
  ['<a class="drawer-sub" href="#collections">Bowls</a>', '<a class="drawer-sub" href="collections/bowls.html">Bowls</a>'],
  ['<a href="#about">About</a>', '<a href="about.html">About</a>'],
  ['<a href="#journal">Blog</a>', '<a href="blog.html">Blog</a>'],
  ['<a href="#contact">Contact</a>', '<a href="contact.html">Contact</a>'],
  ['<li><a href="#about">About</a></li>', '<li><a href="about.html">About</a></li>'],
  ['<li><a href="#contact">Contact</a></li>', '<li><a href="contact.html">Contact</a></li>'],
  ['<li><a href="#journal">Blog</a></li>', '<li><a href="blog.html">Blog</a></li>'],
  ['<li><a href="#faq">FAQ</a></li>', '<li><a href="#" data-soon="FAQ is coming soon">FAQ</a></li>'],
  ['<li><a href="#account">My Account</a></li>', '<li><a href="#" data-soon="Account sign-in is not part of this demo">My Account</a></li>'],
  ['<li><a href="#shipping">Shipping Policy</a></li>', '<li><a href="#" data-soon="Shipping policy coming soon">Shipping Policy</a></li>'],
  ['<li><a href="#returns">Returns Policy</a></li>', '<li><a href="#" data-soon="Returns policy coming soon">Returns Policy</a></li>'],
  ['<li><a href="#privacy">Privacy Policy</a></li>', '<li><a href="#" data-soon="Privacy policy coming soon">Privacy Policy</a></li>'],
  ['<link rel="stylesheet" href="assets/styles.css?v=2" />', '<link rel="stylesheet" href="assets/styles.css?v=3" />'],
  ['<script src="assets/app.js?v=2"></script>', '<script src="assets/catalog.js?v=3"></script>\n<script src="assets/app.js?v=3"></script>'],
];
for (const [a, b] of all) {
  const n = s.split(a).length - 1;
  s = s.split(a).join(b);
  console.log((n ? 'OK  ' : 'MISS'), n, JSON.stringify(a.slice(0, 46)));
}
fs.writeFileSync(file, s, 'utf8');
console.log('saved');
