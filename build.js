/* Generates the static pages sharing one chrome (header/footer/drawer/etc.) */
const fs = require('fs');
const path = require('path');
const ROOT = __dirname;

const ICONS = {
  menu: '<path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/>',
  chevDown: '<path d="m6 9 6 6 6-6"/>',
  chevLeft: '<path d="m15 18-6-6 6-6"/>',
  chevRight: '<path d="m9 18 6-6-6-6"/>',
  search: '<path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/>',
  heart: '<path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/>',
  bag: '<path d="M16 10a4 4 0 0 1-8 0"/><path d="M3.103 6.034h17.794"/><path d="M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z"/>',
  user: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  mail: '<path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/><rect x="2" y="4" width="20" height="16" rx="2"/>',
  message: '<path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"/>',
  pin: '<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
  ig: '<rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>',
  leaf: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><path d="M16 3.128a4 4 0 0 1 0 7.744"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><circle cx="9" cy="7" r="4"/>',
  sparkles: '<path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"/><path d="M20 2v4"/><path d="M22 4h-4"/><circle cx="4" cy="20" r="2"/>',
};
const icon = (name, size = 20, sw = 2) => `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name]}</svg>`;

const chrome = (prefix, title, description) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${title}</title>
<meta name="description" content="${description}" />
<link rel="icon" type="image/png" href="${prefix}assets/kyuto-logo.png" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=DM+Sans:ital,wght@0,300..1000;1,300..1000&family=Cormorant+Garamond:ital,wght@0,300..700;1,300..700&display=swap" rel="stylesheet" />
<link rel="stylesheet" href="${prefix}assets/styles.css?v=3" />
</head>
<body class="min-h-full" data-base="${prefix}">

<div class="ribbon" aria-hidden="true">
  <div class="ribbon-inner">
    <span>Handmade with love in India&nbsp;&nbsp;·&nbsp;&nbsp;Free Shipping on orders above ₹1299&nbsp;&nbsp;·&nbsp;&nbsp;Use Code <b>KYUTD10</b> for 10% off&nbsp;&nbsp;·&nbsp;&nbsp;Easy 7-day Returns&nbsp;&nbsp;·&nbsp;&nbsp;</span><span>Handmade with love in India&nbsp;&nbsp;·&nbsp;&nbsp;Free Shipping on orders above ₹1299&nbsp;&nbsp;·&nbsp;&nbsp;Use Code <b>KYUTD10</b> for 10% off&nbsp;&nbsp;·&nbsp;&nbsp;Easy 7-day Returns&nbsp;&nbsp;·&nbsp;&nbsp;</span>
  </div>
</div>

<header class="site-header">
  <div class="container header-inner">
    <div class="header-mobile-left">
      <button class="icon-btn" id="openMenu" aria-label="Open menu">${icon('menu', 22)}</button>
    </div>
    <a class="logo" href="${prefix}index.html" aria-label="Kyuto home"><img src="${prefix}assets/kyuto-logo.png" alt="Kyuto" width="160" height="160" /></a>
    <nav class="desktop-nav" aria-label="Primary">
      <a href="${prefix}index.html#shop">Shop</a>
      <div class="nav-item">
        <a href="${prefix}index.html#shop" class="nav-link-drop">Collections ${icon('chevDown', 14)}</a>
        <div class="dropdown">
          <a href="${prefix}collections/candles.html">Candles</a>
          <a href="${prefix}collections/mugs.html">Mugs</a>
          <a href="${prefix}collections/cup-saucer.html">Cup-Saucer Sets</a>
          <a href="${prefix}collections/bowls.html">Bowls</a>
        </div>
      </div>
      <a href="${prefix}about.html">About</a>
      <a href="${prefix}blog.html">Blog</a>
      <a href="${prefix}contact.html">Contact</a>
    </nav>
    <div class="header-icons">
      <button class="icon-btn" id="openSearch" aria-label="Search"><span class="icon-inner">${icon('search')}</span></button>
      <button class="icon-btn" id="openWishlist" aria-label="Wishlist">${icon('heart')}<span class="badge" id="wishlistBadge" hidden>0</span></button>
      <button class="icon-btn" id="openCart" aria-label="Cart">${icon('bag')}<span class="badge" id="cartBadge" hidden>0</span></button>
      <button class="icon-btn" id="openAccount" aria-label="Account"><span class="icon-inner">${icon('user')}</span></button>
    </div>
  </div>
</header>

<div class="drawer-backdrop" id="drawerBackdrop" hidden></div>
<aside class="mobile-drawer" id="mobileDrawer" aria-hidden="true">
  <div class="drawer-head">
    <img src="${prefix}assets/kyuto-logo.png" alt="Kyuto" width="120" height="120" />
    <button class="icon-btn" id="closeMenu" aria-label="Close menu">${icon('x', 22)}</button>
  </div>
  <nav class="drawer-nav" aria-label="Mobile">
    <a href="${prefix}index.html#shop">Shop</a>
    <p class="drawer-label">Collections</p>
    <a class="drawer-sub" href="${prefix}collections/candles.html">Candles</a>
    <a class="drawer-sub" href="${prefix}collections/mugs.html">Mugs</a>
    <a class="drawer-sub" href="${prefix}collections/cup-saucer.html">Cup-Saucer Sets</a>
    <a class="drawer-sub" href="${prefix}collections/bowls.html">Bowls</a>
    <a href="${prefix}about.html">About</a>
    <a href="${prefix}blog.html">Blog</a>
    <a href="${prefix}contact.html">Contact</a>
    <a href="${prefix}index.html#gifting">Corporate Gifting</a>
  </nav>
  <p class="drawer-foot">Where Art Meets Aroma · India</p>
</aside>

<main>`;

const footer = (prefix) => `</main>

<footer class="site-footer" id="contact">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <img src="${prefix}assets/kyuto-logo.png" alt="Kyuto" width="160" height="160" loading="lazy" class="footer-logo" />
        <p class="hand hand-pink">Where Art Meets Aroma</p>
        <div class="social-row">
          <a href="https://www.instagram.com/kyuto.aesthetics" target="_blank" rel="noreferrer" aria-label="Instagram">${icon('ig', 18)}</a>
          <a href="mailto:kyuto.asthetics@gmail.com" aria-label="Email">${icon('mail', 18)}</a>
        </div>
      </div>
      <nav aria-label="Quick links">
        <h4 class="footer-heading">Quick Links</h4>
        <ul class="footer-links">
          <li><a href="${prefix}index.html#shop">Shop</a></li>
          <li><a href="${prefix}about.html">About</a></li>
          <li><a href="${prefix}contact.html">Contact</a></li>
          <li><a href="#" data-soon="FAQ is coming soon">FAQ</a></li>
          <li><a href="${prefix}index.html#gifting">Corporate Gifting</a></li>
          <li><a href="${prefix}blog.html">Blog</a></li>
          <li><a href="#" data-soon="Account sign-in is not part of this demo">My Account</a></li>
        </ul>
      </nav>
      <nav aria-label="Policies">
        <h4 class="footer-heading">Policies</h4>
        <ul class="footer-links">
          <li><a href="#" data-soon="Shipping policy coming soon">Shipping Policy</a></li>
          <li><a href="#" data-soon="Returns policy coming soon">Returns Policy</a></li>
          <li><a href="#" data-soon="Privacy policy coming soon">Privacy Policy</a></li>
        </ul>
      </nav>
      <div>
        <h4 class="footer-heading">Join Kyuto Family</h4>
        <p class="footer-note">Get 10% off on your first order.</p>
        <form class="newsletter-form" id="newsletterForm" novalidate>
          <input type="email" id="newsletterEmail" required placeholder="you@example.com" aria-label="Email for newsletter" />
          <button type="submit" class="btn btn-gradient btn-block">Subscribe</button>
        </form>
      </div>
    </div>
    <div class="demo-note" role="note">Demo project for design purposes — not the official Kyuto store and not affiliated with the Kyuto brand. Brand names, logos and images belong to their respective owners. No transactions are processed and no orders are placed or fulfilled on this site.</div>
    <div class="footer-bar">
      <p>© 2026 Kyuto. All rights reserved.</p>
      <p class="hand hand-white">Crafted with love in India.</p>
    </div>
  </div>
</footer>

<div class="drawer-backdrop" id="cartBackdrop" hidden></div>
<aside class="cart-drawer" id="cartDrawer" aria-hidden="true" aria-label="Shopping cart">
  <div class="cart-head">
    <h3>Your Cart</h3>
    <button class="icon-btn" id="closeCart" aria-label="Close cart">${icon('x', 22)}</button>
  </div>
  <div class="cart-body" id="cartBody"></div>
  <div class="cart-foot">
    <div class="cart-row"><span>Subtotal</span><strong id="cartTotal">â‚¹0</strong></div>
    <p class="cart-hint">Shipping calculated at checkout · Free above ₹1299</p>
    <button class="btn btn-gradient btn-block btn-lg" id="checkoutBtn">Checkout</button>
  </div>
</aside>

<div class="search-overlay" id="searchOverlay" hidden>
  <div class="search-panel">
    <form class="search-form" id="searchForm" role="search">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg>
      <input type="search" id="searchInput" placeholder="Search mugs, candles, bowls" autocomplete="off" aria-label="Search products" />
      <button type="button" class="icon-btn" id="closeSearch" aria-label="Close search">${icon('x')}</button>
    </form>
    <div class="search-results" id="searchResults"></div>
  </div>
</div>

<div class="popup-backdrop" id="welcomePopup" hidden>
  <div class="popup-card" role="dialog" aria-modal="true" aria-labelledby="popupTitle">
    <button class="popup-close" id="popupClose" aria-label="Close">${icon('x', 18)}</button>
    <img src="${prefix}assets/kyuto-logo.png" alt="Kyuto" width="88" height="88" class="popup-logo" />
    <h3 class="popup-title" id="popupTitle">Welcome to the world of Kyuto!</h3>
    <p class="popup-sub">Enjoy 10% off your first order with code:</p>
    <button class="popup-code" id="copyCode" title="Click to copy">WELCOME10</button>
    <button class="btn btn-gradient btn-block btn-lg" id="claimBtn">Claim &amp; Shop Now</button>
    <button class="popup-later" id="maybeLater">Maybe later</button>
  </div>
</div>

<a class="wa-float" href="https://wa.me/919370899377?text=Hi%20Kyuto!" target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp">
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.52 3.48A11.94 11.94 0 0 0 12.06 0C5.5 0 .18 5.32.18 11.88c0 2.1.55 4.14 1.6 5.94L.06 24l6.4-1.68a11.9 11.9 0 0 0 5.6 1.43h.01c6.55 0 11.88-5.32 11.88-11.88 0-3.17-1.24-6.15-3.43-8.39ZM12.07 21.8h-.01a9.86 9.86 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.8 9.8 0 0 1-1.5-5.28c0-5.45 4.44-9.88 9.9-9.88a9.83 9.83 0 0 1 6.99 2.9 9.82 9.82 0 0 1 2.89 6.98c0 5.46-4.44 9.91-9.9 9.91Zm5.43-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07a8.2 8.2 0 0 1-2.4-1.48 9 9 0 0 1-1.67-2.08c-.17-.3 0-.46.14-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37 0-.52-.05-.15-.67-1.6-.91-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.05 1.03-1.05 2.5s1.07 2.9 1.23 3.1c.15.2 2.1 3.2 5.1 4.5.71.31 1.27.5 1.71.64.72.23 1.37.2 1.89.12.58-.09 1.76-.72 2-1.42.25-.7.25-1.3.18-1.42-.07-.12-.27-.2-.57-.35Z"/></svg>
</a>

<div class="toast" id="toast" role="status" aria-live="polite"></div>

<script src="${prefix}assets/catalog.js?v=3"></script>
<script src="${prefix}assets/app.js?v=3"></script>
</body>
</html>
`;

const page = (prefix, title, description, main, dataCollection) => {
  let head = chrome(prefix, title, description);
  head = head.replace(`<body class="min-h-full" data-base="${prefix}">`, `<body class="page-wrap" data-base="${prefix}"${dataCollection ? ` data-collection="${dataCollection}"` : ''}>`);
  return head + main + footer(prefix);
};
const write = (rel, content) => {
  const dest = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, content);
  console.log('wrote', rel);
};

/* ================= About ================= */
write('about.html', page('', 'About · Kyuto', 'Kyuto was born from curiosity, built on friendship, and fuelled by a belief that beautiful things deserve a place in every home.', `
<div class="bg-gradient-section">
  <section class="container about-grid">
    <div class="reveal">
      <p class="hand hand-pink">our story</p>
      <h1 class="about-h1">Thoughtfully made, designed to last</h1>
      <p class="about-lead">Kyuto was born from curiosity, built on friendship, and fuelled by a belief that beautiful things deserve a place in every home. Two friends, one gap in the market, and a whole lot of heart - that's how our ceramic journey began at Sarath City Capital Mall, Hyderabad. The overwhelming love from our customers pushed us to dream bigger, and now we're bringing Kyuto to doorsteps across India. Today, we're scaling nationally through our online store, expanding our catalog with scented candles, and continuing to grow a brand our customers genuinely love.</p>
      <p class="about-lead">At Kyuto, we don't just sell ceramics - we design the feeling of home.</p>
    </div>
    <div class="about-photo reveal-right">
      <img src="assets/about-founders.jpg" alt="Kyuto founders" loading="eager" onerror="this.onerror=null;this.src='assets/kyuto-logo.png'" />
    </div>
  </section>

  <section class="container about-grid2">
    <div class="about-photo-tall reveal-left">
      <img src="assets/about-studio.jpg" alt="Kyuto studio" loading="eager" onerror="this.onerror=null;this.src='assets/kyuto-logo.png'" />
    </div>
    <div class="reveal">
      <h2 class="about-h2">A brand that listens</h2>
      <p class="about-lead">We design for the moments that matter - morning chai in a handcrafted mug, a quiet corner made warmer by a flickering scented candle, a table that feels like you. Every piece in our collection is chosen with intention, because we believe your space should tell your story.</p>
      <p class="about-lead">We listen to our customers deeply. It's what pushed us from one outlet in Hyderabad to homes across India and it's what keeps us raising the bar, one beautiful piece at a time.</p>
    </div>
  </section>

  <section class="container values">
    <div class="section-head reveal">
      <p class="hand hand-pink">what we value</p>
      <h2 class="section-title">The Kyuto way</h2>
    </div>
    <div class="values-grid">
      <div class="value-card reveal"><div class="value-icon">${icon('heart', 18)}</div><h3>Made with love</h3><p>Every ceramic piece is shaped and finished by hand - made by humans, not machines.</p></div>
      <div class="value-card reveal"><div class="value-icon">${icon('leaf', 18)}</div><h3>Thoughtful materials</h3><p>Carefully chosen ceramics, natural glazes, and mindfully sourced materials - because what goes into your home matters.</p></div>
      <div class="value-card reveal"><div class="value-icon">${icon('users', 18)}</div><h3>Local artisans</h3><p>Rooted in Hyderabad, expanding across India - we're a homegrown brand that believes in keeping things real and close to heart.</p></div>
      <div class="value-card reveal"><div class="value-icon">${icon('sparkles', 18)}</div><h3>Small batches</h3><p>Every collection is curated, not mass-produced - so what you pick truly feels special.</p></div>
    </div>
  </section>

  <section class="container visit">
    <h2 class="visit-title">Come say hi</h2>
    <p class="visit-copy">We love hearing from you - whether it's feedback, a custom request, or just a kind note. Our inbox is warm and our replies are real.</p>
    <div class="visit-actions">
      <a class="btn btn-gradient btn-lg" href="contact.html">Contact us</a>
      <a class="btn-soft" href="index.html#shop">Shop the collection</a>
    </div>
  </section>
</div>
`));

/* ================= Blog ================= */
write('blog.html', page('', 'Blog · Kyuto', 'Slow thoughts on craft, home, and living with a little more intention.', `
<div class="bg-gradient-section">
  <section class="container blog-head">
    <p class="hand hand-pink">the kyuto journal</p>
    <h1 class="blog-h1">Notes from the studio</h1>
    <p class="blog-sub">Slow thoughts on craft, home, and living with a little more intention.</p>
  </section>

  <div class="container">
    <a class="blog-feature reveal" href="#" data-soon="This article is not included in the demo">
      <div class="blog-feature-img"><img src="assets/blog-artisans.jpg" alt="The hands behind every piece - meet the artisans of Kyuto" loading="lazy" onerror="this.onerror=null;this.src='assets/kyuto-logo.png'" /></div>
      <div class="blog-feature-body">
        <p class="blog-tag">Ceramics</p>
        <h2 class="blog-feature-title">The hands behind every piece - meet the artisans of Kyuto</h2>
        <p class="blog-excerpt">Before a ceramic piece reaches your home, it passes through the hands of someone who has spent years, sometimes decades - learning to shape, fire, and finish clay. Here's the story we don't tell enough.</p>
        <p class="blog-meta">Kyuto · 2 min read</p>
      </div>
    </a>

    <div class="blog-grid">
      <a class="blog-card reveal" href="#" data-soon="This article is not included in the demo">
        <div class="blog-card-img"><img src="assets/blog-ritual.jpg" alt="A slow morning ritual, in 3 steps" loading="lazy" onerror="this.onerror=null;this.src='assets/kyuto-logo.png'" /></div>
        <div class="blog-card-body">
          <p class="blog-tag">Rituals</p>
          <h2 class="blog-card-title">A slow morning ritual, in 3 steps</h2>
          <p class="blog-card-excerpt">You don't need a 12-step routine. A cup of tea, a candle, and five minutes alone can change your whole day.</p>
          <p class="blog-meta">3 min read</p>
        </div>
      </a>
      <a class="blog-card reveal" href="#" data-soon="This article is not included in the demo">
        <div class="blog-card-img"><img src="assets/blog-gifting.jpg" alt="The Kyuto gifting guide" loading="lazy" onerror="this.onerror=null;this.src='assets/kyuto-logo.png'" /></div>
        <div class="blog-card-body">
          <p class="blog-tag">Gifting</p>
          <h2 class="blog-card-title">The Kyuto gifting guide</h2>
          <p class="blog-card-excerpt">How we think about putting together a hamper that feels personal, not performative.</p>
          <p class="blog-meta">5 min read</p>
        </div>
      </a>
    </div>
  </div>
</div>
`));

/* ================= Contact ================= */
write('contact.html', page('', 'Contact · Kyuto', 'Questions, feedback, or just want to chat about products? Drop us a note and we will reply within a day or two.', `
<div class="bg-gradient-section">
  <section class="container contact-head">
    <p class="hand hand-pink">say hello</p>
    <h1 class="contact-h1">We'd love to hear from you!</h1>
    <p class="blog-sub">Questions, feedback, or just want to chat about products? Drop us a note and we'll reply within a day or two.</p>
  </section>

  <div class="container contact-grid">
    <div class="contact-card reveal">
      <form id="contactForm" novalidate>
        <div class="field-row">
          <label class="field"><span>Name</span><input id="contactName" type="text" required placeholder="Your name" /></label>
          <label class="field"><span>Email</span><input id="contactEmail" type="email" required placeholder="you@example.com" /></label>
        </div>
        <div class="field-row">
          <label class="field"><span>Phone (optional)</span><input id="contactPhone" type="text" inputmode="tel" placeholder="+91" /></label>
          <label class="field"><span>Topic</span>
            <select id="contactTopic"><option selected>General</option><option>Order help</option><option>Returns</option><option>Custom / bulk</option><option>Press</option></select>
          </label>
        </div>
        <label class="field"><span>Message</span><textarea id="contactMessage" required placeholder="Tell us what you love, need help with, or simply want to say hi"></textarea></label>
        <button type="submit" class="btn btn-gradient">Send message</button>
      </form>
    </div>

    <aside class="contact-aside">
      <div class="info-card reveal">
        <div class="info-icon">${icon('mail', 18)}</div>
        <p class="info-title">Email us</p>
        <a class="info-link" href="mailto:kyuto.asthetics@gmail.com">kyuto.asthetics@gmail.com</a>
        <p class="info-note">For orders, returns &amp; partnerships.</p>
      </div>
      <div class="info-card reveal">
        <div class="info-icon pink">${icon('message', 18)}</div>
        <p class="info-title">WhatsApp</p>
        <a class="info-link" href="https://wa.me/919370899377" target="_blank" rel="noreferrer">+919370899377</a>
        <p class="info-note">Mon-Sat | 10am-7pm IST</p>
      </div>
      <div class="info-card reveal">
        <div class="info-icon">${icon('pin', 18)}</div>
        <p class="info-title">Studio</p>
        <p class="info-note" style="font-size:0.9rem;color:var(--grey)">Kyuto<br />Sarath City Capital Mall, Hyderabad 500084<br />India</p>
      </div>
    </aside>
  </div>
</div>
`));

/* ================= Collection: full grid ================= */
const gridPage = (slug, title, tagline, pill, total) => page('../', title, `${title} - handcrafted in India, made to last.`, `
<div class="collection-head">
  <div class="container">
    <nav class="crumbs" aria-label="Breadcrumb"><a href="../index.html">Home</a><span>/</span><a href="../index.html#shop">Shop</a><span>/</span><span aria-current="page">${title}</span></nav>
    <p class="hand hand-pink">${tagline}</p>
    <h1 class="collection-title">${title}</h1>
    <div class="collection-toolbar">
      <input type="search" class="grid-search" id="gridSearch" placeholder="Search candles, mugs, hampers" aria-label="Search products" />
      <select class="grid-sort" id="gridSort" aria-label="Sort products">
        <option value="relevant" selected>Most Relevant</option>
        <option value="newest">Newest First</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
      </select>
      <span class="filter-pill">${pill}</span>
      <button class="grid-clear" id="gridClear">Clear all</button>
    </div>
    <p class="grid-count" id="gridCount">Showing ${total} of ${total} products</p>
  </div>
</div>
<div class="container">
  <div class="product-grid" id="collectionGrid"></div>
</div>
`, slug);

write('collections/mugs.html', gridPage('mugs', 'Mugs', 'morning rituals', 'Mugs', 44));
write('collections/cup-saucer.html', gridPage('cup-saucer', 'Cup & Saucer Sets', 'afternoon grace', 'Cup & Saucer Sets', 5));

/* ================= Collection: launching soon ================= */
const soonPage = (slug, title) => page('../', `${title} · Kyuto`, `${title} are launching soon at Kyuto.`, `
<section class="launching">
  <p class="hand hand-pink">launching soon âœ¨</p>
  <h1 class="launching-title">${title}</h1>
  <p class="launching-sub">Something beautiful is on its way. Stay tuned!</p>
  <a class="mini-btn" href="../index.html">Back to Home</a>
</section>
`, slug);

write('collections/candles.html', soonPage('candles', 'Candles'));
write('collections/bowls.html', soonPage('bowls', 'Bowls'));
console.log('done');
