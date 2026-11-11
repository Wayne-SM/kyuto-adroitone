/* ===== Kyuto clone â€” app logic (shared by all pages) ===== */

const BASE = (document.body && document.body.dataset.base) || '';
const CATALOG = window.KYUTO_CATALOG || [];
const PRODUCTS = {};
for (const p of CATALOG) PRODUCTS[p.id] = { ...p, href: p.slug, rating: p.reviews > 0 ? 5 : 0 };

const FAVOURITES = ['sweet-cherry-branch-handmade-ceramic-mug', '3d-coral-heart-paradise-handmade-ceramic-cup', 'coral-heart-pink-handmade-ceramic-cup', 'red-poppy-garden-handmade-ceramic-cup-saucer-set', 'blue-blossom-garden-handmade-ceramic-cup-saucer-set', 'love-nests-heart-surprise-handmade-ceramic-mug', 'colorful-cat-friends-handmade-ceramic-cup', 'playful-puppy-surprise-mug'];
const NEW_IN = ['coral-white-love-hearts-handmade-ceramic-mug', 'romantic-bow-and-ribbon-handmade-ceramic-cup-saucer-set', 'rainbow-scattered-hearts-handmade-ceramic-cup-saucer-set', 'adorable-panda-face-handmade-ceramic-mug', 'red-arch-elegance-handmade-ceramic-mug', 'sunny-smile-flower-handmade-ceramic-mug'];

const COLLECTIONS = [
  { name: 'Mugs', img: 'assets/col-mugs.jpg', href: 'collections/mugs.html' },
  { name: 'Cup-Saucer Sets', img: 'assets/col-cup-saucer.jpg', href: 'collections/cup-saucer.html' },
  { name: 'Bowls', img: 'assets/col-bowls.jpg', href: 'collections/bowls.html' },
  { name: 'Candles', img: 'assets/col-candles.jpg', href: 'collections/candles.html' },
  { name: 'Sale', img: 'assets/col-sale.jpg', href: 'collections/mugs.html' },
];

const REVIEWS = [
  { name: 'Soba', text: "I was literally not okay with this purchase, never it was my first time buying things online and I'm obsessed! Look at the Mug.", product: '', img: 'assets/rev-soba.jpg', rating: 5 },
  { name: 'Taruni P', text: 'It is definitely aesthetic and gives extremely vibes.', product: '', img: 'assets/rev-taruni.jpg', rating: 5 },
  { name: 'Kirti S.', text: 'Ordered the cup-saucer set as a wedding gift. The recipient was thrilled, it looks so premium in real life.', product: 'Ivory Cup & Saucer Set', img: 'assets/rev-kirti.jpg', rating: 5 },
  { name: 'Suri B.', text: "I bought this cutie puppy cup and omg it's so adorable.", product: 'Ivory Cup & Saucer Set', img: 'assets/rev-suri.jpg', rating: 5 },
  { name: 'Pranita Singh', text: 'Loved the color and shape.', product: 'Ivory Cup & Saucer Set', img: 'assets/rev-pranita.jpg', rating: 5 },
  { name: 'Zoya', text: 'This is more pretty in real, look at the 3D detailing. Loved it Kyuto', product: 'Ivory Cup & Saucer Set', img: 'assets/rev-zoya.jpg', rating: 5 },
];

const inr = n => 'â‚¹' + Number(n).toLocaleString('en-IN', { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 });
const STAR = '<svg viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/></svg>';
const starsHTML = rating => {
  let s = '<span class="stars stars-pink">';
  for (let i = 0; i < 5; i++) s += `<span class="${i < rating ? '' : 'stars-empty'}" style="display:inline-flex">${STAR}</span>`;
  return s + '</span>';
};

const HEART = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/></svg>';
const BAG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:16px;height:16px"><path d="M16 10a4 4 0 0 1-8 0"/><path d="M3.103 6.034h17.794"/><path d="M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z"/></svg>';
const TRASH = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:18px;height:18px"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>';

/* ---------- state ---------- */
const store = {
  read(key, fallback) { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } },
  write(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch {} },
};
let cart = store.read('kyuto-cart', []);       // [{id, qty}]
let wishlist = new Set(store.read('kyuto-wishlist', []));
const saveCart = () => store.write('kyuto-cart', cart);
const saveWishlist = () => store.write('kyuto-wishlist', [...wishlist]);

const cartCount = () => cart.reduce((n, i) => n + i.qty, 0);
const cartTotal = () => cart.reduce((sum, i) => sum + (PRODUCTS[i.id]?.price ?? 0) * i.qty, 0);

/* ---------- toast ---------- */
const toastEl = document.getElementById('toast');
let toastTimer;
function toast(msg) {
  if (!toastEl) return;
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2800);
}

/* ---------- badges ---------- */
const cartBadge = document.getElementById('cartBadge');
const wishlistBadge = document.getElementById('wishlistBadge');
function renderBadges() {
  if (!cartBadge || !wishlistBadge) return;
  const c = cartCount(), w = wishlist.size;
  cartBadge.hidden = c === 0; cartBadge.textContent = c;
  wishlistBadge.hidden = w === 0; wishlistBadge.textContent = w;
}

/* ---------- product card render ---------- */
function productCard(p, opts = {}) {
  const badge = p.badge
    ? `<div class="badge-stack"><span class="pill ${p.oos ? 'pill-oos' : p.badge === 'New' ? 'pill-new' : 'pill-sale'}">${p.badge}</span></div>`
    : '<div class="badge-stack"></div>';
  const compare = p.mrp ? `<span class="compare">${inr(p.mrp)}</span>` : '';
  const rating = p.reviews > 0
    ? `<div class="rating-row" aria-label="${p.rating} out of 5, ${p.reviews} reviews">${starsHTML(p.rating)}<span class="count">(${p.reviews})</span></div>`
    : '';
  const cta = p.oos
    ? `<button class="add-btn" data-notify="${p.id}">Notify Me</button>`
    : `<button class="add-btn" data-add="${p.id}">Add to Cart</button>`;
  const wished = wishlist.has(p.id) ? ' is-active' : '';
  const hover = p.imgB
    ? `<img class="img-hover" src="${BASE}${p.imgB}" alt="" aria-hidden="true" loading="lazy" onerror="this.style.display='none'" />`
    : '';
  const wrapClass = opts.grid ? 'grid-card' : 'rail-card';
  return `
  <div class="${wrapClass}">
    <div class="product-card">
      <a class="product-media" href="${p.href || p.slug}" aria-label="${p.name}" data-demo-link>
        <img class="img-main" src="${BASE}${p.imgA}" alt="${p.name}" loading="lazy" onerror="this.onerror=null;this.src='${BASE}assets/kyuto-logo.png'" />
        ${hover}
        ${badge}
        <button class="wish-btn${wished}" data-wish="${p.id}" aria-label="Toggle wishlist for ${p.name}" aria-pressed="${wished.trim() ? 'true' : 'false'}">${HEART}</button>
      </a>
      <div class="product-body">
        <h3 class="product-name" title="${p.name}">${p.name}</h3>
        <div class="price-row"><span class="price">${inr(p.price)}</span>${compare}</div>
        ${rating}
        ${cta}
      </div>
    </div>
  </div>`;
}

const favouritesRail = document.getElementById('favouritesRail');
const newRail = document.getElementById('newRail');
if (favouritesRail) favouritesRail.innerHTML = FAVOURITES.map(id => PRODUCTS[id] && productCard(PRODUCTS[id])).join('');
if (newRail) newRail.innerHTML = NEW_IN.map(id => PRODUCTS[id] && productCard(PRODUCTS[id])).join('');

/* ---------- collections row (homepage) ---------- */
const collectionsRow = document.getElementById('collectionsRow');
if (collectionsRow) {
  const base = document.body.dataset.base || '';
  collectionsRow.innerHTML = COLLECTIONS.map(c => `
    <a class="collection-item" href="${base}${c.href}">
      <div class="collection-circle"><img src="${base}${c.img}" alt="${c.name}" loading="lazy" onerror="this.onerror=null;this.src='${base}assets/kyuto-logo.png'" /></div>
      <span>${c.name}</span>
    </a>`).join('');
}

/* ---------- reviews ---------- */
const overallStars = document.getElementById('overallStars');
const reviewRail = document.getElementById('reviewRail');
if (overallStars && reviewRail) {
  overallStars.innerHTML = Array.from({ length: 5 }, () => STAR).join('');
  reviewRail.innerHTML = REVIEWS.map(r => `
    <figure class="review-card">
      <div class="review-photo"><img src="${BASE}${r.img}" alt="Customer photo from ${r.name}" loading="lazy" onerror="this.closest('.review-photo').style.display='none'" /></div>
      <div class="review-body">
        <span class="stars stars-amber">${Array.from({ length: r.rating }, () => STAR).join('')}${Array.from({ length: 5 - r.rating }, () => `<span class="stars-empty" style="display:inline-flex">${STAR}</span>`).join('')}</span>
        <blockquote class="review-text">${r.text}</blockquote>
        <figcaption class="review-foot">
          <p class="review-name">${r.name}</p>
          ${r.product ? `<p class="review-product">${r.product}</p>` : ''}
        </figcaption>
      </div>
    </figure>`).join('');
}

/* ---------- collection grid pages ---------- */
const grid = document.getElementById('collectionGrid');
if (grid) {
  const base = document.body.dataset.base || '';
  const collection = document.body.dataset.collection;
  const searchEl = document.getElementById('gridSearch');
  const sortEl = document.getElementById('gridSort');
  const clearEl = document.getElementById('gridClear');
  const countEl = document.getElementById('gridCount');
  const total = CATALOG.filter(p => p.collection === collection).length;

  const render = () => {
    const q = (searchEl?.value || '').trim().toLowerCase();
    let items = CATALOG.filter(p => p.collection === collection && (!q || p.name.toLowerCase().includes(q)));
    const sort = sortEl?.value || 'relevant';
    if (sort === 'price-asc') items = [...items].sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') items = [...items].sort((a, b) => b.price - a.price);
    else if (sort === 'newest') items = [...items].sort((a, b) => (b.badge === 'New') - (a.badge === 'New'));
    grid.innerHTML = items.length
      ? items.map(p => productCard({ ...p, href: '#' }, { grid: true })).join('')
      : `<div class="grid-empty"><p><strong>No matches for &ldquo;${q}&rdquo;</strong></p><p>Try a different word or <a href="${base}index.html#shop">browse everything</a>.</p></div>`;
    if (countEl) countEl.textContent = `Showing ${items.length} of ${total} products`;
  };
  searchEl?.addEventListener('input', render);
  sortEl?.addEventListener('change', render);
  clearEl?.addEventListener('click', () => { if (searchEl) searchEl.value = ''; if (sortEl) sortEl.value = 'relevant'; render(); });
  render();
}

/* ---------- cart drawer ---------- */
const cartDrawer = document.getElementById('cartDrawer');
const cartBackdrop = document.getElementById('cartBackdrop');
const cartBody = document.getElementById('cartBody');
const cartTotalEl = document.getElementById('cartTotal');
const openCart = () => { if (!cartDrawer) return; cartDrawer.classList.add('open'); cartBackdrop.hidden = false; cartDrawer.setAttribute('aria-hidden', 'false'); };
const closeCart = () => { if (!cartDrawer) return; cartDrawer.classList.remove('open'); cartBackdrop.hidden = true; cartDrawer.setAttribute('aria-hidden', 'true'); };

function renderCart() {
  if (!cartBody) { renderBadges(); return; }
  if (cart.length === 0) {
    cartBody.innerHTML = `<div class="cart-empty">${BAG}<p><strong>Your cart is empty</strong></p><p>Add something handmade â€” your shelf deserves it.</p></div>`;
  } else {
    cartBody.innerHTML = cart.map(item => {
      const p = PRODUCTS[item.id]; if (!p) return '';
      return `<div class="cart-item">
        <img src="${BASE}${p.imgA}" alt="${p.name}" onerror="this.onerror=null;this.src='${BASE}assets/kyuto-logo.png'" />
        <div class="cart-item-info">
          <p class="cart-item-name">${p.name}</p>
          <p class="cart-item-price">${inr(p.price)} each</p>
          <div class="qty-row">
            <button class="qty-btn" data-dec="${p.id}" aria-label="Decrease quantity">âˆ’</button>
            <span>${item.qty}</span>
            <button class="qty-btn" data-inc="${p.id}" aria-label="Increase quantity">+</button>
          </div>
        </div>
        <button class="cart-item-remove" data-remove="${p.id}" aria-label="Remove ${p.name}">${TRASH}</button>
      </div>`;
    }).join('');
  }
  if (cartTotalEl) cartTotalEl.textContent = inr(cartTotal());
  renderBadges();
}

function addToCart(id) {
  const existing = cart.find(i => i.id === id);
  if (existing) existing.qty += 1; else cart.push({ id, qty: 1 });
  saveCart(); renderCart();
  toast('Added to cart ðŸŒ¸');
}

/* ---------- wishlist ---------- */
function toggleWishlist(id, btn) {
  if (wishlist.has(id)) { wishlist.delete(id); btn?.classList.remove('is-active'); btn?.setAttribute('aria-pressed', 'false'); toast('Removed from wishlist'); }
  else { wishlist.add(id); btn?.classList.add('is-active'); btn?.setAttribute('aria-pressed', 'true'); toast('Saved to wishlist â™¥'); }
  saveWishlist(); renderBadges();
}

/* ---------- global click delegation ---------- */
document.addEventListener('click', e => {
  const demoLink = e.target.closest('[data-demo-link]');
  if (demoLink) { /* product detail pages are not part of the clone */ e.preventDefault(); return; }
  const add = e.target.closest('[data-add]');
  if (add) { addToCart(add.dataset.add); return; }
  const dec = e.target.closest('[data-dec]');
  if (dec) { const i = cart.find(x => x.id === dec.dataset.dec); if (i) { i.qty -= 1; if (i.qty <= 0) cart = cart.filter(x => x.id !== i.id); saveCart(); renderCart(); } return; }
  const inc = e.target.closest('[data-inc]');
  if (inc) { const i = cart.find(x => x.id === inc.dataset.inc); if (i) { i.qty += 1; saveCart(); renderCart(); } return; }
  const rem = e.target.closest('[data-remove]');
  if (rem) { cart = cart.filter(x => x.id !== rem.dataset.remove); saveCart(); renderCart(); return; }
  const wish = e.target.closest('[data-wish]');
  if (wish) { e.preventDefault(); e.stopPropagation(); toggleWishlist(wish.dataset.wish, wish); return; }
  const notify = e.target.closest('[data-notify]');
  if (notify) { notify.textContent = "We'll notify you! âœ“"; notify.disabled = true; toast('We will email you when it is back ðŸŒ¸'); return; }
  const railBtn = e.target.closest('.rail-btn[data-rail]');
  if (railBtn) { const rail = document.getElementById(railBtn.dataset.rail); if (!rail) return; const dir = railBtn.classList.contains('rail-next') ? 1 : -1; rail.scrollBy({ left: dir * rail.clientWidth * 0.8, behavior: 'smooth' }); return; }
});

document.getElementById('openCart')?.addEventListener('click', openCart);
document.getElementById('closeCart')?.addEventListener('click', closeCart);
cartBackdrop?.addEventListener('click', closeCart);
document.getElementById('checkoutBtn')?.addEventListener('click', () => {
  if (cart.length === 0) { toast('Your cart is empty'); return; }
  cart = []; saveCart(); renderCart(); closeCart();
  toast('Demo checkout complete â€” order placed! ðŸŽ‰');
});

document.getElementById('openWishlist')?.addEventListener('click', () => {
  toast(wishlist.size ? `Wishlist: ${wishlist.size} item${wishlist.size > 1 ? 's' : ''} saved â™¥` : 'Your wishlist is empty');
});

document.getElementById('openAccount')?.addEventListener('click', () => {
  toast('Account sign-in is not part of this demo âœ¨');
});

/* ---------- mobile drawer ---------- */
const mobileDrawer = document.getElementById('mobileDrawer');
const drawerBackdrop = document.getElementById('drawerBackdrop');
const openMenu = () => { if (!mobileDrawer) return; mobileDrawer.classList.add('open'); drawerBackdrop.hidden = false; mobileDrawer.setAttribute('aria-hidden', 'false'); };
const closeMenu = () => { if (!mobileDrawer) return; mobileDrawer.classList.remove('open'); drawerBackdrop.hidden = true; mobileDrawer.setAttribute('aria-hidden', 'true'); };
document.getElementById('openMenu')?.addEventListener('click', openMenu);
document.getElementById('closeMenu')?.addEventListener('click', closeMenu);
drawerBackdrop?.addEventListener('click', closeMenu);
mobileDrawer?.addEventListener('click', e => { if (e.target.closest('a')) closeMenu(); });

/* ---------- hero carousel ---------- */
const slides = [...document.querySelectorAll('.hero-slide')];
const dotsWrap = document.getElementById('heroDots');
if (slides.length && dotsWrap) {
  let slideIndex = 0, autoplay;
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'hero-dot' + (i === 0 ? ' is-active' : '');
    dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
    dot.addEventListener('click', () => goTo(i, true));
    dotsWrap.appendChild(dot);
  });
  const dots = [...dotsWrap.children];
  function goTo(i, user) {
    slideIndex = (i + slides.length) % slides.length;
    slides.forEach((s, idx) => s.classList.toggle('is-active', idx === slideIndex));
    dots.forEach((d, idx) => d.classList.toggle('is-active', idx === slideIndex));
    if (user) restartAutoplay();
  }
  function restartAutoplay() { clearInterval(autoplay); autoplay = setInterval(() => goTo(slideIndex + 1), 6000); }
  document.getElementById('heroNext').addEventListener('click', () => goTo(slideIndex + 1, true));
  document.getElementById('heroPrev').addEventListener('click', () => goTo(slideIndex - 1, true));
  restartAutoplay();
}

/* ---------- search ---------- */
const searchOverlay = document.getElementById('searchOverlay');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const openSearch = () => { if (!searchOverlay) return; searchOverlay.hidden = false; renderSearch(''); setTimeout(() => searchInput.focus(), 50); };
const closeSearch = () => { if (!searchOverlay) return; searchOverlay.hidden = true; searchInput.value = ''; };
document.getElementById('openSearch')?.addEventListener('click', openSearch);
document.getElementById('closeSearch')?.addEventListener('click', closeSearch);
searchOverlay?.addEventListener('click', e => { if (e.target === searchOverlay) closeSearch(); });
document.getElementById('searchForm')?.addEventListener('submit', e => e.preventDefault());

function renderSearch(q) {
  q = q.trim().toLowerCase();
  const hits = CATALOG.filter(p => !q || p.name.toLowerCase().includes(q));
  searchResults.innerHTML = hits.length
    ? hits.slice(0, 8).map(p => `<a class="search-hit" href="${BASE}index.html#shop" data-search-hit><img src="${BASE}${p.imgA}" alt="" onerror="this.onerror=null;this.src='${BASE}assets/kyuto-logo.png'" /><span>${p.name} - ${inr(p.price)}</span></a>`).join('')
    : '<p class="search-empty">Nothing found for that &mdash; try &ldquo;mug&rdquo;, &ldquo;candle&rdquo; or &ldquo;cup&rdquo;.</p>';
  searchResults.querySelectorAll('[data-search-hit]').forEach(a => a.addEventListener('click', closeSearch));
}
searchInput?.addEventListener('input', e => renderSearch(e.target.value));

/* ---------- newsletter ---------- */
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('newsletterEmail');
    const value = email.value.trim();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(value)) { toast('Please enter a valid email'); return; }
    store.write('kyuto-newsletter', value);
    newsletterForm.innerHTML = '<p style="color:#f9a8d4;font-family:\'Cormorant Garamond\',serif;font-style:italic;font-size:1.1rem;padding:0.5rem 0">Welcome to the family â€” your 10% code is <strong>WELCOME10</strong> ðŸŒ¸</p>';
    toast('Subscribed! Check your inbox');
  });
}

/* ---------- contact form (about/contact pages share validation UX) ---------- */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('contactName');
    const email = document.getElementById('contactEmail');
    const message = document.getElementById('contactMessage');
    if (!name.value.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(email.value.trim()) || !message.value.trim()) {
      toast('Please fill name, a valid email and a message');
      return;
    }
    const card = contactForm.closest('.contact-card') || contactForm.parentElement;
    card.innerHTML = '<div class="contact-success"><p class="hand hand-pink">message received!</p><h2 class="font-heading contact-success-title">Thank you, ' + name.value.trim().split(' ')[0] + ' ðŸŒ¸</h2><p>Weâ€™ll get back to you within a day or two â€” usually faster.</p></div>';
    toast('Message sent â€” talk soon!');
  });
}

/* ---------- placeholder links with no matching page ---------- */
document.querySelectorAll('[data-soon]').forEach(a => {
  a.addEventListener('click', e => { e.preventDefault(); toast(a.getAttribute('data-soon') || 'Coming soon âœ¨'); });
});

/* ---------- welcome popup ---------- */
const welcomePopup = document.getElementById('welcomePopup');
if (welcomePopup) {
  const dismissWelcome = () => { welcomePopup.hidden = true; store.write('kyuto-welcomed', true); };
  if (!store.read('kyuto-welcomed', false)) {
    setTimeout(() => { welcomePopup.hidden = false; }, 1800);
  }
  document.getElementById('popupClose').addEventListener('click', dismissWelcome);
  document.getElementById('maybeLater').addEventListener('click', dismissWelcome);
  welcomePopup.addEventListener('click', e => { if (e.target === welcomePopup) dismissWelcome(); });
  document.getElementById('claimBtn').addEventListener('click', () => {
    try { navigator.clipboard?.writeText('WELCOME10'); } catch {}
    dismissWelcome();
    toast('Code WELCOME10 copied â€” 10% off your first order ðŸŽ‰');
  });
  document.getElementById('copyCode').addEventListener('click', e => {
    try { navigator.clipboard?.writeText('WELCOME10'); } catch {}
    e.currentTarget.textContent = 'COPIED âœ“';
    setTimeout(() => { e.currentTarget.textContent = 'WELCOME10'; }, 1500);
  });
}

/* ---------- customize CTA ---------- */
document.getElementById('startCustomizing')?.addEventListener('click', () => {
  toast('Custom candle studio coming soon â€” WhatsApp us to start ðŸ•¯ï¸');
});

/* ---------- escape key ---------- */
document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  closeSearch(); closeCart(); closeMenu();
  if (welcomePopup && !welcomePopup.hidden) { welcomePopup.hidden = true; store.write('kyuto-welcomed', true); }
});

/* ---------- reveal on scroll (scroll-based; works even when IO is throttled) ---------- */
const revealEls = [...document.querySelectorAll('.reveal, .reveal-left, .reveal-right')];
if (revealEls.length) {
  const revealCheck = () => {
    const limit = window.innerHeight * 0.92;
    for (const el of revealEls) {
      if (el.classList.contains('is-visible')) continue;
      const r = el.getBoundingClientRect();
      if (r.top < limit && r.bottom > 0) el.classList.add('is-visible');
    }
  };
  window.addEventListener('scroll', revealCheck, { passive: true });
  window.addEventListener('resize', revealCheck, { passive: true });
  revealCheck();
  setTimeout(() => revealEls.forEach(el => el.classList.add('is-visible')), 1500);
}

/* ---------- init ---------- */
renderCart();
renderBadges();

