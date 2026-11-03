// ============================================
// Kisha "Profeti Ilia" — interactions & translations
// ============================================
(function () {
  "use strict";

  // ---------- Hero slideshow ----------
  var images = [
    "/Assets/kisha_main1.jpg",
    "/Assets/kisha_main2.jpg",
    "/Assets/profeti.jpg",
    "/Assets/kisha_main3.jpg",
    "/Assets/kisha_main4.jpg",
    "/Assets/kisha_main5.jpg"
  ];

  var slidesEl = document.getElementById("heroSlides");
  var reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (slidesEl) {
    images.forEach(function (src, index) {
      var slide = document.createElement("div");
      slide.className = "hero-slide" + (index === 0 ? " active" : "");
      // Only the first image loads immediately; the rest load when the page is idle.
      if (index === 0) slide.style.backgroundImage = 'url("' + src + '")';
      else slide.dataset.src = src;
      slidesEl.appendChild(slide);
    });

    var allSlides = slidesEl.querySelectorAll(".hero-slide");
    var currentSlide = 0;
    var timer = null;

    var loadSlide = function (slide) {
      if (slide && slide.dataset.src) {
        slide.style.backgroundImage = 'url("' + slide.dataset.src + '")';
        delete slide.dataset.src;
      }
    };

    var showNext = function () {
      allSlides[currentSlide].classList.remove("active");
      currentSlide = (currentSlide + 1) % allSlides.length;
      loadSlide(allSlides[currentSlide]);
      loadSlide(allSlides[(currentSlide + 1) % allSlides.length]);
      allSlides[currentSlide].classList.add("active");
    };

    var start = function () {
      if (!timer && allSlides.length > 1 && !reducedMotion) timer = window.setInterval(showNext, 5500);
    };
    var stop = function () {
      if (timer) { window.clearInterval(timer); timer = null; }
    };

    var warm = function () { loadSlide(allSlides[1]); };
    if ("requestIdleCallback" in window) window.requestIdleCallback(warm, { timeout: 2500 });
    else window.setTimeout(warm, 1500);

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) stop(); else start();
    });
    start();
  }

  // ---------- Translations ----------
  var translations = {
    sq: {
      church: 'Kisha "Profeti Ilia" Korçë',
      metropolis: "Mitropolia e Shenjtë Korçë",
      home: "Kryefaqja",
      about: "Rreth Nesh",
      services: "Shërbesat",
      contact: "Kontakt",
      appButton: "Aplikacioni",
      langLabel: "Gjuha",
      footerAppText: "Instaloni aplikacionin e kishës.",
      footerHoursTitle: "Orari i Kishës",
      footerHours1: "Hapur për lutje (paradite) – 07:30–10:00",
      footerHours2: "Hapur për lutje (pasdite) – 17:00–19:00",
      appBannerText: "Instaloni aplikacionin e kishës.",
      appBannerAction: "Hap",
      eyebrow: "KISHA ORTHODHOKSE",
      welcome: "Mirë se vini në",
      prophet: 'Kishën "Profeti Ilia"',
      quote: "Engjëlli me trup, stoli e profetëve, pararendës i ardhjes së dytë të Krishtit; Ilia i lavdëruar, që nga lartësitë dërgon hirin e Eliseut; dëbon sëmundjet dhe pastron lebrozët, dhe të gjithë atyre që e besojnë u dhuron shërime.",
      aboutEyebrow: "RRETH KISHËS",
      aboutTitle: "Një histori besimi dhe tradite",
      aboutIntro: "Njihuni me historinë, misionin dhe jetën shpirtërore të kishës sonë.",
      historyEyebrow: "HISTORIA",
      historyTitle: 'Kisha "Profeti Ilia"',
      historyText: 'Kisha "Profeti Ilia" është një nga kishat historike të qytetit të Korçës. Ajo përfaqëson besimin dhe traditën e komunitetit orthodhoks.',
      historyExtra: "Më 20 korrik 2024, kisha u shenjtërua nga Mitropoliti i atëhershëm, Imzot Joan Pelushi.",
      historyLink: "ZBULO MË SHUMË →",
      servicesEyebrow: "JETË SHPIRTËRORE",
      servicesTitle: "Shërbesat dhe orari",
      servicesIntro: "Dyert e kishës janë të hapura për lutje dhe pjesëmarrje në jetën liturgjike.",
      svc_liturgy_title: "Liturgjia Hyjnore",
      svc_liturgy_desc: "Falenderimi i përbashkët dhe Kungimi i Shenjtë.",
      svc_baptism_title: "Pagëzimi",
      svc_baptism_desc: "Hyrja në Kishë dhe lindja e re shpirtërore.",
      svc_marriage_title: "Kurorëzimi",
      svc_marriage_desc: "Misteri i martesës dhe bekimi i familjes.",
      svc_holy_water_title: "Uji i Bekuar",
      svc_holy_water_desc: "Shenjtërimi i ujit për bekim dhe shërim.",
      svc_forty_title: "Të Dyzetat",
      svc_forty_desc: "Bekimi i nënës dhe foshnjës pas dyzet ditësh.",
      svc_efqelia_title: "Efqelia",
      svc_efqelia_desc: "Shenjtërimi i shtëpisë dhe i familjes.",
      serviceMoreNote: "Këto janë vetëm disa nga shërbesat që ofron kisha. Për më shumë informacion, ju lutemi na kontaktoni.",
      servicesCtaEyebrow: "NA KONTAKTONI",
      servicesCtaTitle: "Dëshironi të rezervoni një shërbesë?",
      servicesCtaText: "Jemi të lumtur t'ju ndihmojmë të organizoni çdo shërbesë sipas traditës orthodhokse.",
      servicesCtaBtn: "NA KONTAKTONI",
      morningTitle: "Lutja e mëngjesit",
      morningText: "07:30 – 10:00",
      eveningTitle: "Lutja e pasdites",
      eveningText: "17:00 – 19:00",
      scheduleNote: "Për orarin e Liturgjive Hyjnore dhe festave, ju lutemi kontaktoni kishën.",
      appEyebrow: "KISHA NË TELEFONIN TUAJ",
      appTitle: "Qëndroni të lidhur me kishën",
      appText: "Zbuloni historinë e kishës, mësoni rreth besimit orthodhoks dhe qëndroni të informuar për aktivitetet dhe njoftimet.",
      feature1: "Katekizëm",
      feature2: "Galeria",
      feature3: "Njoftimet",
      feature4: "Kalendari",
      openApp: "HAP APLIKACIONIN",
      appEyebrow: "KISHA NË TELEFONIN TUAJ",
      appTitle: "Qëndroni të lidhur me kishën",
      appText: "Zbuloni historinë e kishës, mësoni rreth besimit orthodhoks dhe qëndroni të informuar për aktivitetet dhe njoftimet.",
      openApp: "HAP APLIKACIONIN",
      appTutorial: "Si të instaloj aplikacionin? →",
      contactEyebrow: "NA VIZITONI",
      contactTitle: "Ju mirëpresim në kishën tonë",
      contactIntro: "Na gjeni në zemër të qytetit të Korçës.",
      addressLabel: "ADRESA",
      emailLabel: "EMAIL",
      address: "Rruga Lola Gjoka, Korçë, Shqipëri",
      directions: "SHIKO NË HARTË",
      quickLinks: "Lidhje të Shpejta"
    },

    en: {
      church: '"Prophet Elijah" Church Korçë',
      metropolis: "Holy Metropolis of Korçë",
      home: "Home",
      about: "About Us",
      services: "Services",
      contact: "Contact",
      appButton: "Church App",
      langLabel: "Language",
      footerAppText: "Install the church app.",
      footerHoursTitle: "Church Hours",
      footerHours1: "Open for prayer (morning) – 07:30–10:00",
      footerHours2: "Open for prayer (afternoon) – 17:00–19:00",
      appBannerText: "Install the church app.",
      appBannerAction: "Open",
      eyebrow: "ORTHODOX CHURCH",
      welcome: "Welcome to",
      prophet: "Prophet Elijah Church",
      quote: "The angel in the flesh, the adornment of the prophets and forerunner of the Second Coming of Christ; the glorious Elijah, who from on high sends the grace of Elisha; he drives away diseases and cleanses lepers, and grants healing to all who believe in him.",
      aboutEyebrow: "ABOUT OUR CHURCH",
      aboutTitle: "A history of faith and tradition",
      aboutIntro: "Discover the history, mission and spiritual life of our church.",
      historyEyebrow: "OUR HISTORY",
      historyTitle: "Prophet Elijah Church",
      historyText: "Prophet Elijah Church is one of the historic churches of Korçë, representing the faith and traditions of the Orthodox community.",
      historyExtra: "On July 20, 2024, the church was consecrated by the then Metropolitan, His Grace Joan Pelushi.",
      historyLink: "DISCOVER MORE →",
      servicesEyebrow: "SPIRITUAL LIFE",
      servicesTitle: "Services and schedule",
      servicesIntro: "The doors of our church are open for prayer and participation in liturgical life.",
      svc_liturgy_title: "Divine Liturgy",
      svc_liturgy_desc: "The shared thanksgiving and Holy Communion.",
      svc_baptism_title: "Baptism",
      svc_baptism_desc: "Entry into the Church and new spiritual birth.",
      svc_marriage_title: "Marriage",
      svc_marriage_desc: "The mystery of marriage and blessing of the family.",
      svc_holy_water_title: "Holy Water",
      svc_holy_water_desc: "The blessing of water for grace and healing.",
      svc_forty_title: "Forty-Day Blessing",
      svc_forty_desc: "The blessing of mother and child after forty days.",
      svc_efqelia_title: "Home Blessing",
      svc_efqelia_desc: "The consecration of the home and the family.",
      serviceMoreNote: "These are only a few of the services the church offers. For more information, please contact us.",
      appEyebrow: "YOUR CHURCH ON YOUR PHONE",
      appTitle: "Stay connected with your church",
      appText: "Discover church history, learn about the Orthodox faith and stay informed about activities and announcements.",
      openApp: "OPEN THE APP",
      appTutorial: "How to install the app? →",
      servicesCtaEyebrow: "CONTACT US",
      servicesCtaTitle: "Would you like to book a service?",
      servicesCtaText: "We are happy to help you arrange any service according to Orthodox tradition.",
      servicesCtaBtn: "CONTACT US",
      morningTitle: "Morning prayer",
      morningText: "07:30 – 10:00",
      eveningTitle: "Afternoon prayer",
      eveningText: "17:00 – 19:00",
      scheduleNote: "For the Divine Liturgy and feast day schedule, please contact the church.",
      appEyebrow: "YOUR CHURCH ON YOUR PHONE",
      appTitle: "Stay connected with your church",
      appText: "Discover church history, learn about the Orthodox faith and stay informed about activities and announcements.",
      feature1: "Catechism",
      feature2: "Gallery",
      feature3: "Notifications",
      feature4: "Calendar",
      openApp: "OPEN THE APP",
      contactEyebrow: "VISIT US",
      contactTitle: "You are welcome at our church",
      contactIntro: "Find us in the heart of Korçë.",
      addressLabel: "ADDRESS",
      emailLabel: "EMAIL",
      address: "Lola Gjoka Street, Korçë, Albania",
      directions: "VIEW ON MAP",
      quickLinks: "Quick Links"
    },

    el: {
      church: "Εκκλησία «Προφήτης Ηλίας» Κορυτσά",
      metropolis: "Ιερά Μητρόπολη Κορυτσάς",
      home: "Αρχική",
      about: "Σχετικά με εμάς",
      services: "Ακολουθίες",
      contact: "Επικοινωνία",
      appButton: "Εφαρμογή",
      langLabel: "Γλώσσα",
      footerAppText: "Εγκαταστήστε την εφαρμογή της εκκλησίας.",
      footerHoursTitle: "Ώρες Λειτουργίας",
      footerHours1: "Ανοιχτό για προσευχή (πρωί) – 07:30–10:00",
      footerHours2: "Ανοιχτό για προσευχή (απόγευμα) – 17:00–19:00",
      appBannerText: "Εγκαταστήστε την εφαρμογή της εκκλησίας.",
      appBannerAction: "Άνοιγμα",
      eyebrow: "ΟΡΘΟΔΟΞΗ ΕΚΚΛΗΣΙΑ",
      welcome: "Καλώς ήρθατε στον",
      prophet: "Ναό του Προφήτη Ηλία",
      quote: "Άγγελος εν σώματι, των Προφητών το κόσμημα και της Δευτέρας Παρουσίας του Χριστού πρόδρομος· ο ένδοξος Ηλίας, ο εξ ύψους καταπέμπων την χάριν του Ελισσαίου· νόσους απελαύνει και λεπρούς καθαρίζει, και τοις πιστοίς ιάματα πλουσίως χαρίζεται.",
      aboutEyebrow: "ΓΙΑ ΤΟΝ ΝΑΟ",
      aboutTitle: "Ιστορία πίστης και παράδοσης",
      aboutIntro: "Γνωρίστε την ιστορία, την αποστολή και την πνευματική ζωή του ναού μας.",
      historyEyebrow: "Η ΙΣΤΟΡΙΑ ΜΑΣ",
      historyTitle: "Ναός Προφήτη Ηλία",
      historyText: "Ο Ναός του Προφήτη Ηλία είναι ένας από τους ιστορικούς ναούς της Κορυτσάς και αντιπροσωπεύει την πίστη και την παράδοση της Ορθόδοξης κοινότητας.",
      historyExtra: "Στις 20 Ιουλίου 2024, ο ναός καθαγιάστηκε από τον τότε Μητροπολίτη Ιωάννη Πελούση.",
      historyLink: "ΑΝΑΚΑΛΥΨΤΕ ΠΕΡΙΣΣΟΤΕΡΑ →",
      servicesEyebrow: "ΠΝΕΥΜΑΤΙΚΗ ΖΩΗ",
      servicesTitle: "Ακολουθίες και ωράριο",
      servicesIntro: "Οι πόρτες του ναού μας είναι ανοιχτές για προσευχή.",
      svc_liturgy_title: "Θεία Λειτουργία",
      svc_liturgy_desc: "Η κοινή ευχαριστία και η Θεία Κοινωνία.",
      svc_baptism_title: "Βάπτιση",
      svc_baptism_desc: "Η είσοδος στην Εκκλησία και η νέα πνευματική γέννηση.",
      svc_marriage_title: "Γάμος",
      svc_marriage_desc: "Το μυστήριο του γάμου και η ευλογία της οικογένειας.",
      svc_holy_water_title: "Αγιασμός",
      svc_holy_water_desc: "Ο αγιασμός του ύδατος για χάρη και θεραπεία.",
      svc_forty_title: "Σαρανταήμερο",
      svc_forty_desc: "Η ευλογία της μητέρας και του βρέφους μετά από σαράντα ημέρες.",
      svc_efqelia_title: "Ευλογία Οίκου",
      svc_efqelia_desc: "Ο αγιασμός του σπιτιού και της οικογένειας.",
      serviceMoreNote: "Αυτές είναι μόνο μερικές από τις ακολουθίες που προσφέρει η εκκλησία. Για περισσότερες πληροφορίες, επικοινωνήστε μαζί μας.",
      servicesCtaEyebrow: "ΕΠΙΚΟΙΝΩΝΗΣΤΕ ΜΑΖΙ ΜΑΣ",
      servicesCtaTitle: "Θα θέλατε να κλείσετε μια ακολουθία;",
      servicesCtaText: "Είμαστε στην ευχάριστη θέση να σας βοηθήσουμε να οργανώσετε κάθε ακολουθία σύμφωνα με την Ορθόδοξη παράδοση.",
      appEyebrow: "Η ΕΚΚΛΗΣΙΑ ΣΤΟ ΚΙΝΗΤΟ ΣΑΣ",
      appTitle: "Μείνετε συνδεδεμένοι με την εκκλησία σας",
      appText: "Ανακαλύψτε την ιστορία του ναού, μάθετε για την Ορθόδοξη πίστη και ενημερωθείτε για τις δραστηριότητες.",
      openApp: "ΑΝΟΙΞΤΕ ΤΗΝ ΕΦΑΡΜΟΓΗ",
      appTutorial: "Πώς να εγκαταστήσω την εφαρμογή; →",
      servicesCtaBtn: "ΕΠΙΚΟΙΝΩΝΗΣΤΕ",
      morningTitle: "Πρωινή προσευχή",
      morningText: "07:30 – 10:00",
      eveningTitle: "Απογευματινή προσευχή",
      eveningText: "17:00 – 19:00",
      scheduleNote: "Για το πρόγραμμα της Θείας Λειτουργίας και των εορτών, επικοινωνήστε με τον ναό.",
      appEyebrow: "Η ΕΚΚΛΗΣΙΑ ΣΤΟ ΚΙΝΗΤΟ ΣΑΣ",
      appTitle: "Μείνετε συνδεδεμένοι με την εκκλησία σας",
      appText: "Ανακαλύψτε την ιστορία του ναού, μάθετε για την Ορθόδοξη πίστη και ενημερωθείτε για τις δραστηριότητες.",
      feature1: "Κατήχηση",
      feature2: "Γκαλερί",
      feature3: "Ειδοποιήσεις",
      feature4: "Ημερολόγιο",
      openApp: "ΑΝΟΙΞΤΕ ΤΗΝ ΕΦΑΡΜΟΓΗ",
      contactEyebrow: "ΕΠΙΣΚΕΦΘΕΙΤΕ ΜΑΣ",
      contactTitle: "Σας καλωσορίζουμε στον ναό μας",
      contactIntro: "Θα μας βρείτε στην καρδιά της Κορυτσάς.",
      addressLabel: "ΔΙΕΥΘΥΝΣΗ",
      emailLabel: "EMAIL",
      address: "Οδός Lola Gjoka, Κορυτσά, Αλβανία",
      directions: "ΔΕΙΤΕ ΣΤΟΝ ΧΑΡΤΗ",
      quickLinks: "Γρήγοροι Σύνδεσμοι"
    }
  };

  var supportedLanguages = ["sq", "en", "el"];

  function setLang(lang) {
    var selected = supportedLanguages.indexOf(lang) !== -1 ? lang : "sq";
    var dictionary = translations[selected];

    document.documentElement.lang = selected;

    document.querySelectorAll("[data-t]").forEach(function (element) {
      var value = dictionary[element.dataset.t];
      if (typeof value === "string") element.textContent = value;
    });

    document.querySelectorAll(".languages button[data-lang]").forEach(function (button) {
      var active = button.dataset.lang === selected;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });

    try { localStorage.setItem("church-language", selected); } catch (e) { /* storage unavailable */ }
  }

  document.querySelectorAll(".languages button[data-lang]").forEach(function (button) {
    button.addEventListener("click", function () { setLang(button.dataset.lang); });
  });

  // ---------- Active section in navigation ----------
  var navAnchors = Array.prototype.slice.call(document.querySelectorAll(".nav-links a[href^='#']"));
  var observedSections = Array.prototype.slice.call(document.querySelectorAll("main section[id]"));

  function setActiveNav(id) {
    navAnchors.forEach(function (link) {
      var active = link.getAttribute("href") === "#" + id;
      link.classList.toggle("active", active);
      if (active) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
      // Keep the active link visible when the nav scrolls horizontally on phones.
      if (active && link.scrollIntoView && link.parentElement.scrollWidth > link.parentElement.clientWidth) {
        var nav = link.closest("nav");
        if (nav) nav.scrollLeft = link.offsetLeft - (nav.clientWidth - link.offsetWidth) / 2;
      }
    });
  }

  if ("IntersectionObserver" in window && observedSections.length) {
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) setActiveNav(entry.target.id);
      });
    }, { rootMargin: "-42% 0px -48% 0px" });
    observedSections.forEach(function (section) { sectionObserver.observe(section); });
  }

  // ---------- Scroll reveal for service cards & CTA ----------
  var revealTargets = document.querySelectorAll(".reveal, #servicesCta");
  if (revealTargets.length) {
    document.querySelectorAll(".reveal[data-delay]").forEach(function (el) {
      el.style.setProperty("--reveal-delay", el.dataset.delay + "ms");
    });

    if ("IntersectionObserver" in window && !reducedMotion) {
      var revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });

      revealTargets.forEach(function (el) { revealObserver.observe(el); });
    } else {
      revealTargets.forEach(function (el) { el.classList.add("revealed"); });
    }
  }

  // ---------- Back to top ----------
  var backToTop = document.getElementById("backToTop");
  if (backToTop) {
    var ticking = false;
    window.addEventListener("scroll", function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () {
        backToTop.classList.toggle("show", window.scrollY > 400);
        ticking = false;
      });
    }, { passive: true });

    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
    });
  }

  // ---------- Floating app banner (mobile only; CSS hides it on desktop) ----------
  var appBanner = document.getElementById("appFloatingBanner");
  var appBannerClose = document.getElementById("appBannerClose");

  function hideBanner() {
    if (appBanner) appBanner.classList.add("is-hidden");
    if (backToTop) backToTop.classList.add("banner-closed");
  }

  if (appBanner && appBannerClose) {
    appBannerClose.addEventListener("click", function () {
      hideBanner();
      try { sessionStorage.setItem("church-app-banner-dismissed", "1"); } catch (e) { /* ignore */ }
    });

    try {
      if (sessionStorage.getItem("church-app-banner-dismissed") === "1") hideBanner();
    } catch (e) { /* ignore */ }
  }

  // On desktop the banner is not rendered, so the back-to-top button must not reserve room for it.
  if (document.documentElement.getAttribute("data-device") !== "mobile" && backToTop) {
    backToTop.classList.add("banner-closed");
  }

  // ---------- Restore saved language ----------
  var savedLanguage = "sq";
  try { savedLanguage = localStorage.getItem("church-language") || "sq"; } catch (e) { /* ignore */ }
  setLang(savedLanguage);
})();
