let currentLang = 'sq';
let currentPage = 'home';
let slideInterval = null;
let heroLoadTimer = null;
let mqlDark = null;

const VALID_LANGUAGES = ['sq', 'en', 'el'];
const VALID_THEMES = ['auto', 'light', 'dark'];
const VALID_FONT_SIZES = ['small', 'normal', 'large'];

function storageGet(key, fallback = null) {
  try {
    const value = window.localStorage.getItem(key);
    return value === null ? fallback : value;
  } catch (error) {
    return fallback;
  }
}

function storageSet(key, value) {
  try {
    window.localStorage.setItem(key, value);
    return true;
  } catch (error) {
    return false;
  }
}

function getStoredTheme() {
  const theme = storageGet('app_theme', 'dark');
  return VALID_THEMES.includes(theme) ? theme : 'dark';
}
function applyTheme(theme) {
  if (!VALID_THEMES.includes(theme)) theme = 'dark';
  const prefersDark = typeof window.matchMedia === 'function'
    ? window.matchMedia('(prefers-color-scheme: dark)').matches
    : false;
  const effective = theme === 'auto' ? (prefersDark ? 'dark' : 'light') : theme;
  document.documentElement.setAttribute('data-theme', effective);
  storageSet('app_theme', theme);
  const metaTheme = document.querySelector('meta[name="theme-color"]');
  if (metaTheme) metaTheme.setAttribute('content', effective === 'light' ? '#F7F4EE' : '#1A1F3C');
}
function setTheme(theme) { applyTheme(theme); if (currentPage === 'settings') loadPage('settings'); }
function initThemeWatcher() {
  if (typeof window.matchMedia !== 'function') return;
  if (!mqlDark) mqlDark = window.matchMedia('(prefers-color-scheme: dark)');
  const handler = () => { if (getStoredTheme() === 'auto') applyTheme('auto'); };
  if (mqlDark.addEventListener) mqlDark.addEventListener('change', handler);
  else if (mqlDark.addListener) mqlDark.addListener(handler);
}

function getStoredFontSize() {
  const size = storageGet('app_font_size', 'normal');
  return VALID_FONT_SIZES.includes(size) ? size : 'normal';
}
function applyFontSize(size) {
  if (!VALID_FONT_SIZES.includes(size)) size = 'normal';
  document.documentElement.setAttribute('data-font-size', size);
  storageSet('app_font_size', size);
}
function setFontSize(size) { applyFontSize(size); if (currentPage === 'settings') loadPage('settings'); }

function getStoredReducedMotion() { return storageGet('app_reduced_motion', 'false') === 'true'; }
function applyReducedMotion(reduced) {
  const enabled = reduced === true || reduced === 'true';
  document.documentElement.setAttribute('data-reduced-motion', enabled ? 'true' : 'false');
  storageSet('app_reduced_motion', enabled ? 'true' : 'false');
}
function setReducedMotion(reduced) {
  applyReducedMotion(reduced);
  if (slideInterval) { clearInterval(slideInterval); slideInterval = null; }
  if (!reduced && currentPage === 'home') initHeroSlider();
  if (currentPage === 'settings') loadPage('settings');
}

function applyTranslations() {
  document.querySelectorAll('.lang-opt').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === currentLang);
  });
  document.querySelectorAll('[data-t]').forEach(el => {
    const key = el.getAttribute('data-t');
    const entry = AppT[key];
    if (!entry) return;
    const text = entry[currentLang] || entry.sq || '';
    el.innerHTML = text.indexOf('<') !== -1 ? text : text.replace(/\n/g, '<br>');
  });
}
function setAppLang(lang, opts) {
  const rerender = !opts || opts.rerender !== false;
  if (!VALID_LANGUAGES.includes(lang)) lang = 'sq';
  currentLang = lang;
  storageSet('app_lang', lang);
  document.documentElement.lang = lang;
  applyTranslations();
  if (rerender && currentPage) loadPage(currentPage);
  updatePageTitle();
}

function toggleLangModal() { const o = document.getElementById('langModalOverlay'); if (o) o.classList.toggle('open'); }
function toggleProfileModal() { const o = document.getElementById('profileModalOverlay'); if (o) o.classList.toggle('open'); }
function toggleListenModal() { const o = document.getElementById('listenModalOverlay'); if (o) o.classList.toggle('open'); }
function toggleSoonModal(titleText, bodyText) {
  const o = document.getElementById('soonModalOverlay');
  const t = document.getElementById('soonModalTitle');
  const b = document.getElementById('soonModalText');
  if (!o) return;
  if (t) t.textContent = titleText || (AppT.profile_soon_title[currentLang] || 'Së shpejti');
  if (b) b.textContent = bodyText || (AppT.profile_soon_text[currentLang] || '');
  o.classList.toggle('open');
}

function updateTabBar(page) {
  const moreSet = { catechism: 1, prayer: 1, books: 1, settings: 1 };
  const activeTab = moreSet[page] ? 'more' : page;
  document.querySelectorAll('.tab-bar a').forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${activeTab}`);
  });
}

function navigateTo(page, title, replace) {
  const validPages = ['home', 'history', 'events', 'gallery', 'catechism', 'prayer', 'books', 'more', 'settings'];
  if (!validPages.includes(page)) page = 'home';
  currentPage = page;
  if (replace) history.replaceState({ page }, title || page, `?page=${page}`);
  else history.pushState({ page }, title || page, `?page=${page}`);
  updatePageTitle();
  loadPage(page);
  updateTabBar(page);
  if (window.scrollY > 10) window.scrollTo({ top: 0, behavior: 'smooth' });
  else window.scrollTo(0, 0);
}

function navigateBack() {
  navigateTo('more');
}

function loadPage(page) {
  const validPages = ['home', 'history', 'events', 'gallery', 'catechism', 'prayer', 'books', 'more', 'settings'];
  if (!validPages.includes(page)) page = 'home';
  currentPage = page;
  const container = document.getElementById('page-content');
  if (!container) return;
  if (slideInterval) { clearInterval(slideInterval); slideInterval = null; }
  if (heroLoadTimer) { clearTimeout(heroLoadTimer); heroLoadTimer = null; }
  container.classList.toggle('page-inner', page !== 'home');
  container.innerHTML = getPageHTML(page);
  applyTranslations();
  if (page === 'home') { initHeroSlider(); lazyLoadHeroSlides(); }
  if (typeof initPageFeatures === 'function') initPageFeatures(page);
}

function updatePageTitle() {
  const titleEl = document.querySelector('.app-header .titles h1');
  if (!titleEl) return;
  const pageNames = {
    home: AppT.nav_home, history: AppT.nav_history, events: AppT.nav_events,
    gallery: AppT.nav_gallery, catechism: AppT.nav_catechism,
    prayer: AppT.nav_prayer, books: AppT.nav_books,
    more: AppT.nav_more, settings: AppT.settings_title
  };
  const entry = pageNames[currentPage];
  titleEl.textContent = entry ? (entry[currentLang] || entry.sq) : currentPage;
}

window.addEventListener('popstate', function (event) {
  const pageFromState = event.state && event.state.page;
  const pageFromUrl = new URLSearchParams(window.location.search).get('page');
  const page = pageFromState || pageFromUrl || 'home';
  loadPage(page);
  updatePageTitle();
  updateTabBar(currentPage);
});

function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  if (slides.length <= 1) return;
  if (document.documentElement.getAttribute('data-reduced-motion') === 'true') return;
  let idx = 0;
  slideInterval = setInterval(() => {
    if (!document.body.contains(slides[0])) { clearInterval(slideInterval); slideInterval = null; return; }
    slides[idx].classList.remove('active');
    idx = (idx + 1) % slides.length;
    slides[idx].classList.add('active');
  }, 4000);
}
function lazyLoadHeroSlides() {
  const slides = document.querySelectorAll('.hero-slide[data-src]');
  if (!slides.length) return;
  heroLoadTimer = setTimeout(() => {
    slides.forEach(slide => {
      const url = slide.getAttribute('data-src');
      if (!url) return;
      slide.style.backgroundImage = `url('${url}')`;
      slide.removeAttribute('data-src');
    });
    heroLoadTimer = null;
  }, 1500);
}

function initSplash() {
  const splash = document.getElementById('splash');
  if (!splash) return;
  setTimeout(() => splash.classList.add('fade-out'), 1600);
  setTimeout(() => { splash.style.display = 'none'; }, 2100);
}
function registerServiceWorker() {
  if (!('serviceWorker' in navigator) || location.protocol === 'file:') return;
  navigator.serviceWorker.register('/sw.js').catch(() => {});
}

document.addEventListener('DOMContentLoaded', function () {
  const urlParams = new URLSearchParams(window.location.search);
  const pageParam = urlParams.get('page');

  applyTheme(getStoredTheme());
  applyFontSize(getStoredFontSize());
  applyReducedMotion(getStoredReducedMotion());
  initThemeWatcher();

  const savedLanguage = storageGet('app_lang', 'sq');
  currentLang = VALID_LANGUAGES.includes(savedLanguage) ? savedLanguage : 'sq';
  document.documentElement.lang = currentLang;

  initSplash();
  registerServiceWorker();

  const langBtn = document.getElementById('langGlobeBtn');
  if (langBtn) langBtn.addEventListener('click', toggleLangModal);
  const profileBtn = document.getElementById('profileBtn');
  if (profileBtn) profileBtn.addEventListener('click', toggleProfileModal);

  if (pageParam && pageParam !== 'home') {
    navigateTo(pageParam, null, true);
  } else {
    currentPage = 'home';
    loadPage('home');
    updatePageTitle();
    updateTabBar('home');
    history.replaceState({ page: 'home' }, 'Kryefaqja', '?page=home');
  }

  window.setAppLang = setAppLang;
  window.navigateTo = navigateTo;
  window.navigateBack = navigateBack;
  window.toggleLangModal = toggleLangModal;
  window.toggleProfileModal = toggleProfileModal;
  window.toggleListenModal = toggleListenModal;
  window.toggleSoonModal = toggleSoonModal;
  window.setTheme = setTheme;
  window.setFontSize = setFontSize;
  window.setReducedMotion = setReducedMotion;
});

/* ===================== LIGHTBOX (swipe, no buttons) ===================== */
let lbPhotos = [];
let lbIndex = 0;
let lbTouchStartX = 0;
let lbTouchStartY = 0;

function openAppLightbox(photos, index) {
  if (Array.isArray(photos)) { lbPhotos = photos; lbIndex = Math.max(0, Math.min(index || 0, photos.length - 1)); }
  else { lbPhotos = [photos]; lbIndex = 0; }
  if (!lbPhotos.length) return;
  const img = document.getElementById('lightboxImg');
  const lb = document.getElementById('lightbox');
  const counter = document.getElementById('lightboxCounter');
  const hint = document.getElementById('lightboxHint');
  if (!img || !lb) return;
  img.src = lbPhotos[lbIndex];
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
  const multi = lbPhotos.length > 1;
  if (counter) counter.textContent = multi ? `${lbIndex + 1} / ${lbPhotos.length}` : '';
  if (hint) {
    hint.textContent = multi ? (AppT.lightbox_swipe_hint?.[currentLang] || 'Rrëshqitni për të naviguar') : '';
    hint.style.display = multi ? 'block' : 'none';
  }
}

function changeAppLightbox(dir) {
  if (lbPhotos.length <= 1) return;
  lbIndex = (lbIndex + dir + lbPhotos.length) % lbPhotos.length;
  const img = document.getElementById('lightboxImg');
  const counter = document.getElementById('lightboxCounter');
  if (img) img.src = lbPhotos[lbIndex];
  if (counter) counter.textContent = `${lbIndex + 1} / ${lbPhotos.length}`;
}

function closeAppLightbox() {
  const lb = document.getElementById('lightbox');
  if (lb) lb.classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('click', function(e) {
  const lb = document.getElementById('lightbox');
  if (lb && lb.classList.contains('open') && e.target === lb) closeAppLightbox();
});

document.addEventListener('keydown', function(e) {
  const lb = document.getElementById('lightbox');
  if (!lb || !lb.classList.contains('open')) return;
  if (e.key === 'Escape') closeAppLightbox();
  if (e.key === 'ArrowRight') changeAppLightbox(1);
  if (e.key === 'ArrowLeft') changeAppLightbox(-1);
});

/* Touch swipe for lightbox */
(function () {
  const lb = document.getElementById('lightbox');
  if (!lb) return;
  lb.addEventListener('touchstart', function (e) {
    if (!lb.classList.contains('open') || e.touches.length !== 1) return;
    lbTouchStartX = e.touches[0].clientX;
    lbTouchStartY = e.touches[0].clientY;
  }, { passive: true });
  lb.addEventListener('touchend', function (e) {
    if (!lb.classList.contains('open') || e.changedTouches.length !== 1) return;
    const dx = e.changedTouches[0].clientX - lbTouchStartX;
    const dy = e.changedTouches[0].clientY - lbTouchStartY;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
      changeAppLightbox(dx < 0 ? 1 : -1);
    }
  }, { passive: true });
})();

/* Prevent long-press saving on images */
document.addEventListener('contextmenu', function(e) {
  if (e.target.tagName === 'IMG') {
    e.preventDefault(); 
  }
});

document.addEventListener('dragstart', function(e) {
  if (e.target.tagName === 'IMG') {
    e.preventDefault();
  }
});


window.openAppLightbox = openAppLightbox;
window.closeAppLightbox = closeAppLightbox;
window.changeAppLightbox = changeAppLightbox;
