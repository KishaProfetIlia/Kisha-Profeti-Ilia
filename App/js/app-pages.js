function getPageHTML(page) {
  switch (page) {
    case 'home': return getHomePage();
    case 'history': return getHistoryPage();
    case 'events': return getEventsPage();
    case 'gallery': return getGalleryPage();
    case 'catechism': return getCatechismPage();
    case 'prayer': return getPrayerPage();
    case 'books': return getBooksPage();
    case 'more': return getMorePage();
    case 'settings': return getSettingsPage();
    default: return getHomePage();
  }
}

function t(key, lang) {
  const e = AppT[key];
  if (!e) return '';
  return e[lang || currentLang] || e.sq || '';
}

const Icons = {
  mail: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="3"/><path d="M2 7L12 13L22 7"/></svg>`,
  instagram: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5.5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none"/></svg>`,
  facebook: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5.5"/><path d="M13 21V13h2.5l.5-3H13V8.5c0-.8.4-1.5 1.5-1.5H16V4.5S15 4 13.5 4C11 4 10 5.5 10 7.5V10H7.5v3H10v8"/></svg>`,
  youtube: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5.5"/><path d="M17.5 11.2L9.5 6.5c-.3-.2-.7-.1-.9.2-.1.1-.1.3-.1.5v9.6c0 .4.3.7.7.7.1 0 .3 0 .4-.1l8-4.7c.2-.1.3-.3.3-.5s0-.3-.1-.4c-.1-.3-.2-.5-.3-.6z" fill="none"/></svg>`,
  location: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2C8.7 2 6 4.7 6 8c0 5 6 14 6 14s6-9 6-14c0-3.3-2.7-6-6-6z"/><circle cx="12" cy="8" r="2.5"/></svg>`,
  church: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v4M9 4h6M5 21V11l7-5 7 5v10"/><path d="M10 21v-5h4v5"/></svg>`,
  book: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4v16a2 2 0 0 0 2 2h14V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2z"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>`,
  bookStack: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4z"/><path d="M4 5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2"/><path d="M8 9h6M8 13h6M8 17h4"/></svg>`,
  download: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`,
  globe: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18z"/></svg>`,
  trash: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>`,
  sun: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>`,
  moon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>`,
  monitor: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>`,
  text: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7V5h16v2M9 5v14M15 5v14"/></svg>`,
  motion: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12h4l2-7 4 14 2-7h6"/></svg>`,
  chevronRight: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>`,
  chevronLeft: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>`,
  settings: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>`,
  send: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4z"/></svg>`,
  play: `<svg viewBox="0 0 12 12" fill="currentColor"><path d="M2 1.5L10 6L2 10.5V1.5Z"/></svg>`,
  clock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>`,
  calendar: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M8 2v4M16 2v4M3 10h18"/></svg>`,
  pray: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v6"/><path d="M9 5h6"/><path d="M7 9l-2 5a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3l-2-5"/><path d="M9 9v8M15 9v8"/><path d="M8 21h8"/></svg>`,
  baptism: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.5v8M9.2 5.4h5.6"/><path d="M3 15.2c2.1-1.7 4.2-1.7 6.3 0s4.2 1.7 6.3 0 4.2-1.7 5.4-.7"/><path d="M3 19c2.1-1.7 4.2-1.7 6.3 0s4.2 1.7 6.3 0 4.2-1.7 5.4-.7"/></svg>`,
  marriage: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="13" r="6.2"/><circle cx="15" cy="13" r="6.2"/><path d="M12 2v4M10 4h4"/></svg>`,
  holyWater: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2C8 6 6 10 6 14a6 6 0 0012 0c0-4-2-8-6-12z"/></svg>`,
  liturgy: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M8.5 5.5h7M5 10h14M7 16l10 3"/></svg>`,
  fortyDay: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="7" r="3"/><path d="M5 21v-2.2a7 7 0 0 1 14 0V21M3 21h18"/><path d="M9 14.5c1.8 1.2 4.2 1.2 6 0"/></svg>`,
  efqelia: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.5c-2.8 3.6-5.2 6.4-5.2 10.1a5.2 5.2 0 0 0 10.4 0c0-3.7-2.4-6.5-5.2-10.1z"/><path d="M9.4 14.2c.3 1.4 1.2 2.2 2.6 2.5"/></svg>`
};

function getHomePage() {
  return `
    <section class="hero-modern">
      <div class="hero-slide active" style="background-image: url('../Assets/profeti.jpg');"></div>
      <div class="hero-slide" data-src="../Assets/kisha_main1.jpg"></div>
      <div class="hero-slide" data-src="../Assets/kisha_main2.jpg"></div>
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <span class="hero-badge" data-t="hero_eyebrow">Kisha Orthodhokse</span>
        <h2><span data-t="hero_title">Profeti Ilia</span></h2>
        <p data-t="hero_quote"></p>
      </div>
    </section>
    <div class="quick-actions-modern">
      <a href="#events" onclick="navigateTo('events'); return false;"><div class="icon-wrap"><svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M8 2v4M16 2v4M3 10h18" stroke-linecap="round"/></svg></div><span data-t="quick_events">Shërbesat</span></a>
      <a href="#catechism" onclick="navigateTo('catechism'); return false;"><div class="icon-wrap"><svg viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h10" stroke-linecap="round"/></svg></div><span data-t="quick_catechism">Katekizëm</span></a>
      <a href="#gallery" onclick="navigateTo('gallery'); return false;"><div class="icon-wrap"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg></div><span data-t="quick_gallery">Galeria</span></a>
      <a href="#more" onclick="navigateTo('more'); return false;"><div class="icon-wrap"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="5" cy="12" r="1.6" fill="currentColor"/><circle cx="12" cy="12" r="1.6" fill="currentColor"/><circle cx="19" cy="12" r="1.6" fill="currentColor"/></svg></div><span data-t="quick_more">Më Shumë</span></a>
    </div>
    <div class="section-card dark">
      <span class="card-badge" data-t="prophet_eyebrow">Profeti i Madh</span>
      <h3 data-t="prophet_heading">Profeti Ilia</h3>
      <p data-t="prophet_p1"></p><p data-t="prophet_p2"></p><p data-t="prophet_p3"></p>
      <div class="card-image" onclick="openAppLightbox(['../Assets/profeti.jpg'], 0)"><img src="../Assets/profeti.jpg" alt="Profeti Ilia" loading="lazy"></div>
    </div>
    <div class="section-card dark">
      <span class="card-badge" data-t="history_eyebrow">Historia e Kishës</span>
      <h3 data-t="history_heading">Mbi 100 vjet besimi</h3>
      <p data-t="history_p1"></p><p data-t="history_p2"></p>
      <div class="card-image" onclick="openAppLightbox(['../Assets/kisha_main2.jpg'], 0)"><img src="../Assets/kisha_main2.jpg" alt="Kisha Profeti Ilia" loading="lazy"></div>
      <a href="https://maps.app.goo.gl/imSxKzHyRxWEduUb6" target="_blank" class="address-card">
        <div class="addr-icon"><svg viewBox="0 0 24 24" fill="none"><path d="M12 2C8.7 2 6 4.7 6 8c0 5 6 14 6 14s6-9 6-14c0-3.3-2.7-6-6-6z" fill="#1A1F3C"/><circle cx="12" cy="8" r="2.6" fill="#E8C97A"/></svg></div>
        <div class="addr-info"><h4 data-t="church_addr_title">Kisha "Profeti Ilia"</h4><p data-t="church_addr_line">Rruga Lola Gjoka, Korçë</p></div>
      </a>
    </div>
  `;
}

function getHistoryPage() {
  const chapters = [
    { date: 'ch1_date', title: 'ch1_title', ps: ['ch1_p1','ch1_p2'], listen: true },
    { date: 'ch2_date', title: 'ch2_title', ps: ['ch2_p1','ch2_p2','ch2_p3'] },
    { date: 'ch3_date', title: 'ch3_title', ps: ['ch3_p1','ch3_p2'] },
    { date: 'ch4_date', title: 'ch4_title', ps: ['ch4_p1','ch4_p2','ch4_p3'] },
    { date: 'ch5_date', title: 'ch5_title', ps: ['ch5_p1','ch5_p2'] },
    { date: 'ch6_date', title: 'ch6_title', ps: ['ch6_p1','ch6_p2', 'ch6_p3'] }
  ];
  
  let chaptersHTML = '';
  chapters.forEach((c, i) => {
    const headInner = `
      <div class="chapter-head-text">
        <span class="chapter-date" data-t="${c.date}"></span>
        <h4 class="chapter-title" data-t="${c.title}" style="margin-bottom:0;"></h4>
      </div>
      ${c.listen ? `<button class="listen-btn" onclick="toggleListenModal()" aria-label="${t('listen_label')}"><span class="listen-circle">${Icons.play}</span><span class="listen-label" data-t="listen_label">${t('listen_label')}</span></button>` : ''}
    `;
    const body = c.ps.map(p => `<p data-t="${p}"></p>`).join('') + (i === 3 ? `<div class="quote-box" data-t="quote1"></div>` : '');
    chaptersHTML += i === 0
      ? `<div class="chapter-head-row">${headInner}</div>${body}`
      : `<div class="chapter-sub"><div class="chapter-head-row">${headInner}</div>${body}</div>`;
  });

  const historyPhotos = [
    '../Gallery/history/1906.jpg','../Gallery/history/1942.jpg','../Gallery/history/1968.jpg',
    '../Gallery/history/1968_1.jpg','../Gallery/history/1991.jpg','../Gallery/history/2002.jpg',
    '../Gallery/history/rikonstruksioni.jpg','../Gallery/history/2003.jpg','../Gallery/history/2003_1.jpg',
    '../Gallery/history/katekizem.jpg','../Gallery/history/2026.jpg'
  ];

  return `
    <div class="section-card dark">
      <span class="card-badge" data-t="history_eyebrow">Historia e Kishës</span>
      <h3 data-t="history_heading">Mbi 100 vjet besimi</h3>
      <div class="card-image" onclick="openAppLightbox(['../Assets/kisha_main6.jpg'], 0)"><img src="../Assets/kisha_main6.jpg" alt="Kisha" loading="lazy"></div>
    </div>
    
    <div class="chapter-block">${chaptersHTML}</div>
    
    <div class="section-card dark">
      <h3 data-t="photos_heading_history">Foto Historike</h3>
      <div class="gallery-grid">
        ${historyPhotos.map((src, i) => `
          <div class="gallery-item" onclick="openAppLightbox(${JSON.stringify(historyPhotos).replace(/"/g, '&quot;')}, ${i})">
            <img src="${src}" alt="Foto historike" loading="lazy">
          </div>`).join('')}
      </div>
    </div>
  `;
}

const appServices = [
  { id: 'liturgy', icon: Icons.liturgy, titleKey: 'event_liturgy', descKey: 'event_liturgy_desc',
    textKey: 'svc_liturgy_text', image: '../Gallery/services/services-html/liturgjia.jpg' },
  { id: 'baptism', icon: Icons.baptism, titleKey: 'event_baptism', descKey: 'event_baptism_desc',
    introKey: 'svc_baptism_intro',
    fullTextKey: 'svc_baptism_rules',
    condition: { sq: 'Kumbari duhet të jetë i pagëzuar në Kishën Orthodhokse.', en: 'The godparent must be baptized in the Orthodox Church.', el: 'Ο ανάδοχος πρέπει να είναι βαπτισμένος στην Ορθόδοξη Εκκλησία.' },
    items: { sq: ['Peshqir i vogël dhe i madh','Sapun','Një shishe me vaj ulliri','Kryqi (varëse)','Lambadhe (qiri)','Shapka, rroba banje, niktiko'], en: ['Small and large towel','Soap','A bottle of olive oil','Cross pendant','Candle','Hat, swimsuit and baptismal garment'], el: ['Μικρή και μεγάλη πετσέτα','Σαπούνι','Ένα μπουκάλι ελαιόλαδο','Σταυρός','Λαμπάδα','Καπέλο, μαγιό και βαπτιστικό ένδυμα'] },
    image: '../Gallery/services/services-html/pagezimi.jpg' },
  { id: 'forty_day', icon: Icons.fortyDay, titleKey: 'event_forty_day', descKey: 'event_forty_day_desc',
    textKey: 'svc_forty_day_summary', fullTextKey: 'svc_forty_day_full' },
  { id: 'efqelia', icon: Icons.efqelia, titleKey: 'event_efqelia', descKey: 'event_efqelia_desc',
    textKey: 'svc_efqelia_text' },
  { id: 'holy_water', icon: Icons.holyWater, titleKey: 'event_holy_water', descKey: 'event_holy_water_desc',
    textKey: 'svc_holy_water_text', image: '../Gallery/services/services-html/uji-i-bekuar.jpg' },
  { id: 'marriage', icon: Icons.marriage, titleKey: 'event_marriage', descKey: 'event_marriage_desc',
    introKey: 'svc_marriage_intro',
    fullTextKey: 'svc_marriage_rules',
    condition: { sq: 'Kumbara duhet të jetë e kurorëzuar në Kishën Orthodhokse.', en: 'The sponsor must be married in the Orthodox Church.', el: 'Ο κουμπάρος πρέπει να έχει τελέσει γάμο στην Ορθόδοξη Εκκλησία.' },
    items: { sq: ['Kurorat','Unazat','Buka me qiqër','Një shishe me verë','Dy lambadha'], en: ['Wedding crowns','Wedding rings','Bread with chickpeas','A bottle of wine','Two candles'], el: ['Στέφανα','Βέρες','Ψωμί με ρεβίθια','Ένα μπουκάλι κρασί','Δύο λαμπάδες'] },
    image: '../Gallery/services/services-html/kurorezimi.jpg' }
];

function renderServiceText(key) {
  const content = t(key);
  if (!content) return '';
  return content.split(/\n\s*\n/).map(paragraph => `<p>${paragraph}</p>`).join('');
}

function renderServiceAccordion(svc) {
  let detailsHTML = '';
  
  // 1. Intro Text (Top)
  if (svc.introKey) {
    detailsHTML += `<div class="svc-detail svc-intro" style="background: transparent; padding: 0 0 12px 0; border-bottom: 1px solid rgba(201,168,76,0.2); margin-bottom: 16px;"><p style="font-size: 0.95rem; line-height: 1.7;">${t(svc.introKey)}</p></div>`;
  }

  // 2. Standard text (if any)
  if (svc.textKey) {
    detailsHTML += `<div class="svc-detail svc-description">${renderServiceText(svc.textKey)}</div>`;
  }

  // 3. Build the Rules (Condition & Items)
  let rulesHTML = '';
  if (svc.condition) rulesHTML += `<div class="svc-detail"><div class="svc-detail-title">${t('svc_condition')}</div><p>${svc.condition[currentLang] || svc.condition.sq}</p></div>`;
  if (svc.items && svc.items[currentLang]) rulesHTML += `<div class="svc-detail"><div class="svc-detail-title">${t('svc_items')}</div><ul class="svc-list">${svc.items[currentLang].map(item => `<li>${item}</li>`).join('')}</ul></div>`;
  if (svc.condition || svc.items) rulesHTML += `<div class="rule-note">${t('svc_note')}</div>`;

  // 4. If there are rules, OR if it's the 40-day blessing, wrap in the "Read More" dropdown
  if (rulesHTML.length > 0 || svc.fullTextKey) {
    detailsHTML += `
      <details class="svc-read-more" style="margin-top: 0; border-top: none; padding-top: 0;">
        <summary>${t('svc_read_more')}</summary>
        <div class="svc-full-text">
           ${rulesHTML}
           ${svc.fullTextKey ? renderServiceText(svc.fullTextKey) : ''}
        </div>
      </details>
    `;
  }

  // 5. Photo (Bottom)
  if (svc.image) {
    detailsHTML += `<div class="svc-small-image" style="margin-top: 16px; max-width: 100%;" onclick="openAppLightbox(['${svc.image}'], 0)"><img src="${svc.image}" alt="${t(svc.titleKey)}" loading="lazy"></div>`;
  }
  
  const hasDetails = detailsHTML.length > 0;
  
  return `
    <div class="accordion-item" data-svc="${svc.id}">
      <div class="accordion-header" onclick="toggleServiceAccordion('${svc.id}')">
        <div class="acc-left"><span class="acc-icon">${svc.icon}</span><div><h4>${t(svc.titleKey)}</h4><p>${t(svc.descKey)}</p></div></div>
        ${hasDetails ? `<span class="acc-chevron">›</span>` : ''}
      </div>
      ${hasDetails ? `<div class="accordion-content">${detailsHTML}</div>` : ''}
    </div>
  `;
}

function getEventsPage() {
  return `
    <div class="section-card dark">
      <span class="card-badge" data-t="events_title">Shërbesat në Kishë</span>
      <h3>${t('events_title')}</h3>
      <div class="accordion-list">${appServices.map(renderServiceAccordion).join('')}</div>
    </div>
    <div class="section-card dark">
      <h3 data-t="event_contact">Kontaktoni Priftin</h3>
      <p data-t="event_contact_text"></p>
      <a href="mailto:kishaprofetilia@gmail.com" class="btn-outline">${t('more_email_addr')}</a>
    </div>
  `;
}

function toggleServiceAccordion(id) {
  const item = document.querySelector(`.accordion-item[data-svc="${id}"]`);
  if (!item) return;
  const wasOpen = item.classList.contains('open');
  document.querySelectorAll('.accordion-item.open').forEach(el => el.classList.remove('open'));
  if (!wasOpen) item.classList.add('open');
}

const appFolders = {
  church: { nameKey: 'gallery_folder_church', cover: '../Gallery/church/album_cover.jpg',
    photos: ['../Gallery/church/album_cover.jpg','../Gallery/church/foto0.jpg','../Gallery/church/foto1.jpg','../Gallery/church/foto2.jpg','../Gallery/church/foto3.jpg','../Gallery/church/foto4.jpg','../Gallery/church/foto5.jpg','../Gallery/church/foto6.jpg','../Gallery/church/foto7.jpg','../Gallery/church/foto8.jpg','../Gallery/church/foto9.jpg','../Gallery/church/foto10.jpg','../Gallery/church/foto11.jpg','../Gallery/church/foto12.jpg','../Gallery/church/foto13.jpg','../Gallery/church/foto14.jpg','../Gallery/church/foto15.jpg','../Gallery/church/foto16.jpg','../Gallery/church/foto17.jpg','../Gallery/church/foto18.jpg','../Gallery/church/foto19.jpg','../Gallery/church/foto20.jpg','../Gallery/church/foto21.jpg','../Gallery/church/foto22.jpg'] },
  history: { nameKey: 'gallery_folder_history', cover: '../Gallery/history/1906.jpg',
    photos: ['../Gallery/history/1906.jpg','../Gallery/history/1942.jpg','../Gallery/history/1968.jpg','../Gallery/history/1968_1.jpg','../Gallery/history/1991.jpg','../Gallery/history/2002.jpg','../Gallery/history/rikonstruksioni.jpg','../Gallery/history/2003.jpg','../Gallery/history/2003_1.jpg','../Gallery/history/katekizem.jpg','../Gallery/history/2026.jpg'] },
  services: { nameKey: 'gallery_folder_services', cover: '../Gallery/services/services-gallery/services-cover.jpg',
    photos: ['../Gallery/services/services-gallery/services-cover.jpg','../Gallery/services/services-gallery/services1.jpg','../Gallery/services/services-gallery/services2.jpg','../Gallery/services/services-gallery/services3.jpg','../Gallery/services/services-gallery/services4.jpg','../Gallery/services/services-gallery/services5.jpg','../Gallery/services/services-gallery/services6.jpg','../Gallery/services/services-gallery/services7.jpg','../Gallery/services/services-gallery/services8.jpg','../Gallery/services/services-gallery/services9.jpg','../Gallery/services/services-gallery/services10.jpg','../Gallery/services/services-gallery/services11.jpg','../Gallery/services/services-gallery/services12.jpg','../Gallery/services/services-gallery/services13.jpg','../Gallery/services/services-gallery/services14.jpg','../Gallery/services/services-gallery/services15.jpg','../Gallery/services/services-gallery/services16.jpg'] }
};

function getGalleryPage() {
  const folderCards = Object.keys(appFolders).map((key, i) => {
    const f = appFolders[key];
    return `
      <div class="folder-card" onclick="openAppFolder('${key}')" style="animation-delay:${i * 80}ms;">
        <div class="folder-visual"><img src="${f.cover}" alt="${t(f.nameKey)}" loading="lazy"></div>
        <div class="folder-info"><h4>${t(f.nameKey)}</h4><span>${f.photos.length} ${t('gallery_photos_count')}</span></div>
      </div>`;
  }).join('');
  return `
    <div class="section-card dark">
      <span class="card-badge" data-t="gallery_title">Fotografitë e Kishës</span>
      <h3>${t('gallery_title')}</h3>
      <p>${t('gallery_tap_hint')}</p>
      <div class="folder-list">${folderCards}</div>
    </div>
  `;
}

function openAppFolder(key) {
  const f = appFolders[key];
  const container = document.getElementById('page-content');
  if (!container) return;
  container.classList.remove('page-inner');
  const photosJSON = JSON.stringify(f.photos).replace(/"/g, '&quot;');
  container.innerHTML = `
    <div class="gallery-folder-header">
      <button class="btn-back-circle" onclick="closeAppFolder()" aria-label="${t('gallery_back')}">${Icons.chevronLeft}</button>
      <h2>${t(f.nameKey)}</h2>
      <div class="gallery-count">${f.photos.length} ${t('gallery_photos_count')}</div>
    </div>
    <div class="section-card dark" style="margin-top:0;">
      <div class="gallery-grid">
        ${f.photos.map((src, i) => `<div class="gallery-item" onclick="openAppLightbox(${photosJSON}, ${i})"><img src="${src}" alt="Foto" loading="lazy"></div>`).join('')}
      </div>
    </div>`;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function closeAppFolder() { loadPage('gallery'); window.scrollTo({ top: 0, behavior: 'smooth' }); }

function getCatechismPage() {
  return `
    <div class="subpage-header">
      <button class="subpage-back" onclick="navigateBack()" aria-label="${t('back_label')}">${Icons.chevronLeft}</button>
      <h3 class="subpage-title">${t('hub_catechism')}</h3>
    </div>
    <div class="section-card dark">
      <p>${t('catechism_what_is')}</p>
      <p>${t('catechism_what_is_2')}</p>
      <div class="quote-box">${t('catechism_quote_1')}</div>
    </div>
    <div class="section-card dark">
      <h3>${t('catechism_content_title')}</h3>
      <p>${t('catechism_content_1')}</p>
      <p>${t('catechism_content_2')}</p>
      <p>${t('catechism_content_3')}</p>
    </div>
    <div class="section-card dark">
      <h3>${t('catechism_who_title')}</h3>
      <p>${t('catechism_who_1')}</p>
      <p>${t('catechism_who_2')}</p>
    </div>
    <div class="section-card dark">
      <h3>${t('catechism_howto')}</h3>
      <p>${t('catechism_howto_text')}</p>
      <p>${t('catechism_howto_text_2')}</p>
      <div class="verse-box">${t('catechism_verse')}</div>
    </div>
    <div class="section-card dark">
      <h3>${t('photos_heading')}</h3>
      <div class="gallery-grid">
        <div class="gallery-item" onclick="openAppLightbox(['../Gallery/catechism/katekizem1.jpg','../Gallery/catechism/katekizem2.jpg'], 0)"><img src="../Gallery/catechism/katekizem1.jpg" alt="Katekizmi" loading="lazy"></div>
        <div class="gallery-item" onclick="openAppLightbox(['../Gallery/catechism/katekizem1.jpg','../Gallery/catechism/katekizem2.jpg'], 1)"><img src="../Gallery/catechism/katekizem2.jpg" alt="Katekizmi" loading="lazy"></div>
      </div>
    </div>
  `;
}

function getPrayerPage() {
  return `
    <div class="subpage-header">
      <button class="subpage-back" onclick="navigateBack()" aria-label="${t('back_label')}">${Icons.chevronLeft}</button>
      <h3 class="subpage-title">${t('hub_prayer')}</h3>
    </div>
    <div class="section-card dark">
      <p>${t('prayer_intro')}</p>

      <div class="prayer-coming">
        <div class="prayer-coming-icon">${Icons.pray}</div>
        <h3>${t('prayer_soon_title')}</h3>
        <p>${t('prayer_soon_text')}</p>
        <span class="soon-pill">${t('soon_pill')}</span>
      </div>
    </div>
  `;
}

const appBooks = [
  { title_sq: 'Bibla - Dhjata e Vjetër', title_en: 'Holy Bible - Old Testament', title_el: 'Αγία Γραφή', pdf: '../Books/Bibla-Dhjata-e-Vjeter.pdf' },
  { title_sq: 'Bibla - Dhjata e Re', title_en: 'Holy Bible - New Testament', title_el: 'Καινή Διαθήκη', pdf: '../Books/Bibla-Dhjata-e-Re.pdf' },
  { title_sq: 'Besimi Ynë Orthodhoks', title_en: 'Orthodox Catechism', title_el: 'Ορθόδοξος Κατήχηση', pdf: '../Books/Besimi-Yne-Orthodhoks.pdf' },
  { title_sq: 'Jetë e Shenjtorëve', title_en: 'Lives of the Saints', title_el: 'Βίοι Αγίων', pdf: '../Books/Jete-Shenjtoresh.pdf' },
  { title_sq: 'Paraklisi i Vogël', title_en: 'Small Paraklesis', title_el: 'Μικρός Παρακλητικός', pdf: '../Books/Paraklisi-i-Vogel.pdf' },
  { title_sq: 'Pasdarka e Vogël', title_en: 'Small Apodeipnon', title_el: 'Μικρό Απόδειπνο', pdf: '../Books/Pasdarka-e-vogel.pdf' },
  { title_sq: 'Himni Akathist', title_en: 'Akathist Hymn', title_el: 'Ακάθιστος Ύμνος', pdf: '../Books/Himni-Akathist.pdf' },
  { title_sq: 'Himni i Dashurisë', title_en: 'Hymn of Love', title_el: 'Ύμνος της Αγάπης', pdf: '../Books/Himni-Dashurise.pdf' },
  { title_sq: 'Shërbesa e Vasilopitës', title_en: 'Vasilopita Service', title_el: 'Ακολουθία Βασιλόπιτας', pdf: '../Books/Sherbesa-e-Vasilopites.pdf' }
];

function getBooksPage() {
  const booksHTML = appBooks.map(b => `
    <a href="${b.pdf}" download class="book-row">
      <div class="book-icon">${Icons.book}</div>
      <div class="book-info"><div class="book-title">${b['title_' + currentLang] || b.title_sq}</div></div>
      <div class="book-dl">${Icons.download}</div>
    </a>`).join('');
  return `
    <div class="subpage-header">
      <button class="subpage-back" onclick="navigateBack()" aria-label="${t('back_label')}">${Icons.chevronLeft}</button>
      <h3 class="subpage-title">${t('hub_books')}</h3>
    </div>
    <div class="section-card dark">
      <p>${t('books_intro')}</p>
      <div class="books-list">${booksHTML}</div>
    </div>
  `;
}

function getMorePage() {
  const tile = ({ icon, labelKey, hintKey, page, href, soon }) => {
    const label = t(labelKey);
    const hint = t(hintKey);
    const badge = soon ? `<span class="soon-badge">${t('soon_pill')}</span>` : '';
    if (href && !soon) {
      return `<a class="more-tile" href="${href}" target="_blank">
        <span class="tile-icon">${icon}</span>
        <span class="tile-label">${label}</span>
        <span class="tile-hint">${hint}</span>
      </a>`;
    }
    const action = soon
      ? `onclick="toggleSoonModal('${label}', '${t('soon_tile_text')}')"`
      : `onclick="navigateTo('${page}'); return false;"`;
    return `<a class="more-tile ${soon ? 'soon' : ''}" ${action}>
      ${badge}
      <span class="tile-icon">${icon}</span>
      <span class="tile-label">${label}</span>
      <span class="tile-hint">${hint}</span>
    </a>`;
  };
  return `
    <div class="section-card dark">
      <h3 class="more-hub-title">${t('more_hub_title')}</h3>
      <p class="more-hub-subtitle">${t('more_hub_subtitle')}</p>
      <div class="more-grid">
        ${tile({ icon: Icons.book,      labelKey: 'hub_catechism', hintKey: 'hub_catechism_hint', page: 'catechism' })}
        ${tile({ icon: Icons.pray,      labelKey: 'hub_prayer',    hintKey: 'hub_prayer_hint',    soon: true })}
        ${tile({ icon: Icons.calendar,  labelKey: 'hub_calendar',  hintKey: 'hub_calendar_hint',  soon: true })}
        ${tile({ icon: Icons.bookStack, labelKey: 'hub_books',     hintKey: 'hub_books_hint',     page: 'books' })}
        ${tile({ icon: Icons.church,    labelKey: 'hub_community', hintKey: 'hub_community_hint', soon: true })}
        ${tile({ icon: Icons.settings,  labelKey: 'hub_settings',  hintKey: 'hub_settings_hint',  page: 'settings' })}
      </div>
      <div class="more-contact-row">
        <a href="mailto:kishaprofetilia@gmail.com" aria-label="Email">${Icons.mail}</a>
        <a href="https://www.instagram.com/kisha.profet.ilia_korce" target="_blank" aria-label="Instagram">${Icons.instagram}</a>
        <a href="https://www.facebook.com/KishaProfetiIliaKorce" target="_blank" aria-label="Facebook">${Icons.facebook}</a>
        <a href="https://www.youtube.com/@kishaprofetiliakorce" target="_blank" aria-label="YouTube">${Icons.youtube}</a>
      </div>
      <a href="https://maps.app.goo.gl/imSxKzHyRxWEduUb6" target="_blank" class="more-address-pill">
        <span class="addr-icon">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M12 2C8.7 2 6 4.7 6 8c0 5 6 14 6 14s6-9 6-14c0-3.3-2.7-6-6-6z" fill="#1A1F3C"/>
            <circle cx="12" cy="8" r="2.6" fill="#E8C97A"/>
          </svg>
        </span>
        <div class="addr-text">
          <h4>${t('hub_address')}</h4>
          <p>${t('more_address_line')}</p>
        </div>
        <span class="addr-chevron">${Icons.chevronRight}</span>
      </a>
    </div>
    <div class="section-card dark">
      <h3>${t('more_feedback_title')}</h3>
      <p>${t('more_feedback_intro')}</p>
      <form id="appFeedbackForm" class="feedback-form">
        <input type="hidden" name="access_key" value="8396ffb3-3372-4d81-844d-d02c654ee97c">
        <input type="hidden" name="subject" value="App feedback — Profeti Ilia">
        <input type="checkbox" name="botcheck" style="display:none" tabindex="-1" autocomplete="off">
        <div class="form-group"><input type="text" name="name" placeholder="${t('more_feedback_name')}" required></div>
        <div class="form-group"><input type="email" name="email" placeholder="${t('more_feedback_email')}"></div>
        <div class="form-group"><textarea name="message" placeholder="${t('more_feedback_message')}" required></textarea></div>
        <button type="submit" class="btn-primary btn-with-icon" id="appFbBtn">
          <span class="btn-icon">${Icons.send}</span><span>${t('more_feedback_submit')}</span>
        </button>
        <div class="feedback-status" id="appFbStatus"></div>
      </form>
    </div>
  `;
}

function getSettingsPage() {
  const theme = localStorage.getItem('app_theme') || 'auto';
  const fontSize = localStorage.getItem('app_font_size') || 'normal';
  const reducedMotion = localStorage.getItem('app_reduced_motion') === 'true';
  const themeBtn = (value, label, icon) => `<button class="seg-btn ${theme === value ? 'active' : ''}" onclick="setTheme('${value}')"><span class="seg-icon">${icon}</span><span class="seg-label">${label}</span></button>`;
  const fontBtn = (value, label) => `<button class="seg-btn ${fontSize === value ? 'active' : ''}" onclick="setFontSize('${value}')"><span class="seg-label">${label}</span></button>`;
  return `
    <div class="subpage-header">
      <button class="subpage-back" onclick="navigateBack()" aria-label="${t('back_label')}">${Icons.chevronLeft}</button>
      <h3 class="subpage-title">${t('settings_title')}</h3>
    </div>
    <div class="section-card dark">
      <div class="settings-block">
        <div class="settings-block-head"><span class="settings-icon">${Icons.globe}</span><div><div class="settings-block-title">${t('settings_language')}</div></div></div>
        <div class="segmented segmented-3">
          <button class="seg-btn ${currentLang === 'sq' ? 'active' : ''}" onclick="setAppLang('sq')"><span class="seg-label">Shqip</span></button>
          <button class="seg-btn ${currentLang === 'en' ? 'active' : ''}" onclick="setAppLang('en')"><span class="seg-label">English</span></button>
          <button class="seg-btn ${currentLang === 'el' ? 'active' : ''}" onclick="setAppLang('el')"><span class="seg-label">Ελληνικά</span></button>
        </div>
      </div>
      <div class="settings-block">
        <div class="settings-block-head"><span class="settings-icon">${Icons.moon}</span><div><div class="settings-block-title">${t('settings_theme')} <span class="beta-badge">${t('settings_beta')}</span></div><div class="settings-block-desc">${t('settings_theme_desc')}</div></div></div>
        <div class="segmented segmented-3">
          ${themeBtn('auto', t('settings_theme_auto'), Icons.monitor)}
          ${themeBtn('light', t('settings_theme_light'), Icons.sun)}
          ${themeBtn('dark', t('settings_theme_dark'), Icons.moon)}
        </div>
        <div class="settings-block-desc" style="font-style:italic;">${t('settings_theme_beta_note')}</div>
      </div>
      <div class="settings-block">
        <div class="settings-block-head"><span class="settings-icon">${Icons.text}</span><div><div class="settings-block-title">${t('settings_font')}</div><div class="settings-block-desc">${t('settings_font_desc')}</div></div></div>
        <div class="segmented segmented-3">
          ${fontBtn('small', t('settings_font_small'))}
          ${fontBtn('normal', t('settings_font_normal'))}
          ${fontBtn('large', t('settings_font_large'))}
        </div>
      </div>
      <div class="settings-block">
        <div class="settings-block-head"><span class="settings-icon">${Icons.motion}</span><div><div class="settings-block-title">${t('settings_motion')}</div><div class="settings-block-desc">${t('settings_motion_desc')}</div></div></div>
        <div class="segmented segmented-2">
          <button class="seg-btn ${!reducedMotion ? 'active' : ''}" onclick="setReducedMotion(false)">${t('settings_motion_on')}</button>
          <button class="seg-btn ${reducedMotion ? 'active' : ''}" onclick="setReducedMotion(true)">${t('settings_motion_off')}</button>
        </div>
      </div>
      <div class="settings-block">
        <div class="settings-block-head"><span class="settings-icon">${Icons.trash}</span><div><div class="settings-block-title">${t('settings_clear_cache')}</div><div class="settings-block-desc">${t('settings_clear_cache_desc')}</div></div></div>
        <button class="btn-small" onclick="clearAppCache()">${t('settings_clear')}</button>
      </div>
    </div>
    <div class="section-card dark settings-about">
      <p>${t('settings_about')}</p>
      <p class="version" style="margin-top: 6px;">${t('settings_about_version')}</p>
      <p class="version" style="margin-top: 2px; font-style: italic;">${t('settings_created_by')}</p>
    </div>
  `;
}

function clearAppCache() {
  if (!confirm('Clear cached data?')) return;
  if ('caches' in window) { caches.keys().then(keys => keys.forEach(k => caches.delete(k))); }
  alert('Done');
}

function initPageFeatures(page) {
  if (page === 'more') initFeedbackForm();
}

function initFeedbackForm() {
  const form = document.getElementById('appFeedbackForm');
  if (!form) return;
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    const btn = document.getElementById('appFbBtn');
    const status = document.getElementById('appFbStatus');
    if (!btn || !status) return;
    const labelEl = btn.querySelector('span:last-child');
    const originalLabel = labelEl ? labelEl.textContent : '';
    btn.disabled = true;
    if (labelEl) labelEl.textContent = t('more_feedback_sending');
    status.className = 'feedback-status';
    status.textContent = '';
    try {
      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', headers: { 'Accept': 'application/json' }, body: new FormData(form) });
      const result = await res.json();
      if (result.success) { status.textContent = t('more_feedback_success'); status.className = 'feedback-status ok'; form.reset(); }
      else { status.textContent = t('more_feedback_error'); status.className = 'feedback-status error'; }
    } catch (err) {
      status.textContent = t('more_feedback_error');
      status.className = 'feedback-status error';
    } finally {
      btn.disabled = false;
      if (labelEl) labelEl.textContent = t('more_feedback_submit') || originalLabel;
    }
  });
}

window.toggleServiceAccordion = toggleServiceAccordion;
window.openAppFolder = openAppFolder;
window.closeAppFolder = closeAppFolder;
window.clearAppCache = clearAppCache;
