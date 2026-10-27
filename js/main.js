// Contact details. Leave whatsapp empty to hide the WhatsApp button.
// whatsapp is the number in international format, digits only.
const CONTACT = {
  email: "najeeb@himalayanholidays.com.pk",
  phone: "+92 51 2202886",
  mobile: "+92 300 8509816",
  whatsapp: "923008509816",
  address: "203, Musawat Building, Zero Point, Islamabad",
  website: "https://www.himalayanholidays.com.pk/",
};

// Hero slider: one slide per region
const SLIDES = [
  { name: "Karakoram", tag: "8000m expeditions", img: "photo-38", link: "#expertise",
    text: "Home of K2 and the great Baltoro glacier, where we have led climbers to the world's highest peaks for over thirty years." },
  { name: "Himalaya", tag: "Nanga Parbat", img: "photo-47", link: "#destinations",
    text: "The western end of the Himalaya, crowned by Nanga Parbat. Treks through Astore and Kaghan, and climbs on the mountain itself." },
  { name: "Hindukush", tag: "Chitral · Wakhan", img: "photo-37", link: "#destinations",
    text: "Chitral, the Kalash Valleys and the remote Wakhan Corridor, with high passes, ancient cultures and very few other travellers." },
  { name: "Wildlife", tag: "Snow leopard · Markhor", img: "photo-31", link: "#responsible",
    text: "Snow leopard watches, Astore markhor, the Deosai plateau and Cholistan desert safaris, all run with conservation at heart." },
  { name: "Heritage", tag: "Indus · Gandhara", img: "photo-50", link: "#destinations",
    text: "Five thousand years of history: the Indus Valley, Harappan and Gandhara civilizations, and rock art along the old trade routes." },
];

const GALLERY = [
  ["photo-38", "mountains", "Karakoram giants at first light"],
  ["photo-45", "mountains", "Roped team on the glacier"],
  ["photo-01", "mountains", "Winter light over a frozen valley"],
  ["photo-15", "treks", "Trekking group at camp below snow peaks"],
  ["photo-31", "wildlife", "Markhor on the ridge"],
  ["photo-03", "culture", "Kalash women in traditional dress"],
  ["photo-41", "mountains", "Crossing a high plateau"],
  ["photo-34", "events", "World Responsible Tourism Award, WTM London 2011"],
  ["photo-47", "mountains", "Alpenglow over the high peaks"],
  ["photo-19", "treks", "Base camp tents in the valley"],
  ["photo-08", "wildlife", "Markhor up close"],
  ["photo-42", "mountains", "Glacier valley in the Karakoram"],
  ["photo-11", "culture", "Local guides and porters"],
  ["photo-48", "mountains", "Resting above the valley"],
  ["photo-14", "mountains", "River valley from above"],
  ["photo-35", "wildlife", "Scanning the slopes for wildlife"],
  ["photo-50", "culture", "Ancient rock carvings"],
  ["photo-46", "mountains", "Summit team on the snowfield"],
  ["photo-27", "treks", "Lakeside camp"],
  ["photo-02", "events", "Speaking on responsible tourism"],
  ["photo-05", "mountains", "Najeeb in the Karakoram"],
  ["photo-37", "mountains", "Glacial lake from above"],
  ["photo-43", "treks", "Forest camp by the river"],
  ["photo-36", "mountains", "Snow peaks above the valley"],
  ["photo-10", "treks", "Expedition team at the snowline"],
  ["photo-16", "treks", "Climbers on a glacier ridge"],
  ["photo-23", "events", "Adventure Travel Trade Association"],
  ["photo-44", "treks", "Break on the hillside"],
  ["photo-28", "treks", "Camp at sunrise"],
  ["photo-09", "treks", "Mountain trail through wildflowers"],
  ["photo-12", "culture", "From the early expedition years"],
  ["photo-17", "treks", "Meadow walk below the peaks"],
  ["photo-18", "treks", "With guests at camp"],
  ["photo-13", "treks", "Jeep safari at sunset"],
  ["photo-32", "mountains", "Above the river valley"],
  ["photo-21", "treks", "Spring flowers on the trail"],
  ["photo-24", "events", "International travel trade show"],
  ["photo-06", "mountains", "On the trail"],
  ["photo-20", "treks", "Camp on the green"],
  ["photo-26", "treks", "Rainbow over the valley"],
  ["photo-22", "treks", "Meal in the mess tent"],
  ["photo-29", "treks", "Hiking through pine forest"],
  ["photo-39", "treks", "Jeep on a mountain plateau"],
  ["photo-40", "treks", "With a guest before the drive"],
  ["photo-07", "mountains", "With a fellow guide below the peaks"],
  ["photo-04", "mountains", "On the ridge"],
  ["photo-30", "mountains", "Mountain path in the mist"],
  ["photo-49", "treks", "Rest stop in the high meadows"],
  ["photo-25", "culture", "Painted truck at night"],
  ["photo-33", "mountains", "Najeeb Ahmed Khan"],
];

const CATEGORY_LABELS = {
  mountains: "Mountains", treks: "Treks & Camps", wildlife: "Wildlife & Nature",
  culture: "Culture & People", events: "Events",
};

const pad = n => String(n).padStart(2, "0");

// Nav: background on scroll, mobile toggle
const nav = document.getElementById("nav");
const toggle = nav.querySelector(".nav-toggle");
const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 40);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();
toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
  document.body.style.overflow = open ? "hidden" : "";
});
nav.querySelectorAll(".nav-links a").forEach(a => a.addEventListener("click", () => {
  nav.classList.remove("open");
  toggle.setAttribute("aria-expanded", false);
  document.body.style.overflow = "";
}));

// Hero slider (no autoplay for visitors who prefer reduced motion)
const SLIDE_MS = 7000;
const AUTOPLAY = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const slider = document.querySelector(".slider");
const bgs = document.getElementById("slider-bgs");
const dots = document.getElementById("slider-dots");
const cards = document.getElementById("slider-cards");
const progress = document.getElementById("slider-progress");
const els = ["title", "text", "link"].reduce((o, k) => (o[k] = document.getElementById(`slider-${k}`), o), {});
const ghostPrev = document.getElementById("ghost-prev");
const ghostNext = document.getElementById("ghost-next");
let current = 0, timer = null;

bgs.innerHTML = SLIDES.map(s => `<div class="slider-bg" style="background-image:url('images/${s.img}.jpg')"></div>`).join("");
dots.innerHTML = SLIDES.map((s, i) => `<button aria-label="Show ${s.name}" data-i="${i}"></button>`).join("");
document.getElementById("slider-total").textContent = pad(SLIDES.length);

const goTo = i => {
  current = (i + SLIDES.length) % SLIDES.length;
  const s = SLIDES[current];
  bgs.querySelectorAll(".slider-bg").forEach((bg, j) => bg.classList.toggle("active", j === current));
  dots.querySelectorAll("button").forEach((d, j) => d.classList.toggle("active", j === current));

  els.title.textContent = s.name;
  els.text.textContent = s.text;
  els.link.href = s.link;
  ghostPrev.textContent = SLIDES[(current - 1 + SLIDES.length) % SLIDES.length].name;
  ghostNext.textContent = SLIDES[(current + 1) % SLIDES.length].name;
  [ghostPrev, els.title, els.text, els.link, ghostNext].forEach((el, k) => {
    el.classList.remove("anim");
    void el.offsetWidth; // restart the animation
    el.style.animationDelay = `${k * 0.07}s`;
    el.classList.add("anim");
  });

  // Upcoming regions as preview cards
  cards.innerHTML = [1, 2, 3].map(step => {
    const j = (current + step) % SLIDES.length, n = SLIDES[j];
    return `<button class="card" data-i="${j}" aria-label="Show ${n.name}">
      <div class="card-label">${n.name}</div>
      <div class="card-sub">${n.tag}</div>
      <div class="card-img"><img src="images/thumbs/${n.img}.jpg" alt=""><span class="card-num">${pad(j + 1)}</span></div>
    </button>`;
  }).join("");

  document.getElementById("slider-current").textContent = pad(current + 1);
  restartTimer();
};

const restartTimer = () => {
  clearTimeout(timer);
  progress.classList.remove("run");
  if (!AUTOPLAY) return;
  void progress.offsetWidth;
  progress.style.animationDuration = `${SLIDE_MS}ms`;
  progress.classList.add("run");
  timer = setTimeout(() => goTo(current + 1), SLIDE_MS);
};

document.getElementById("slider-prev").addEventListener("click", () => goTo(current - 1));
document.getElementById("slider-next").addEventListener("click", () => goTo(current + 1));
dots.addEventListener("click", e => { const b = e.target.closest("button"); if (b) goTo(+b.dataset.i); });
cards.addEventListener("click", e => { const c = e.target.closest(".card"); if (c) goTo(+c.dataset.i); });
// Pause while hovered, so visitors can read a slide
slider.addEventListener("mouseenter", () => { clearTimeout(timer); progress.classList.remove("run"); });
slider.addEventListener("mouseleave", restartTimer);
let sliderTouchX = null;
slider.addEventListener("touchstart", e => { sliderTouchX = e.touches[0].clientX; }, { passive: true });
slider.addEventListener("touchend", e => {
  if (sliderTouchX === null) return;
  const dx = e.changedTouches[0].clientX - sliderTouchX;
  if (Math.abs(dx) > 50) goTo(current + (dx < 0 ? 1 : -1));
  sliderTouchX = null;
});
goTo(0);

// Gallery: small thumbnails in the grid, first few only until "Show all"
const GALLERY_PREVIEW = 12;
const masonry = document.getElementById("masonry");
const moreBtn = document.getElementById("gallery-more");
let galleryExpanded = false;
masonry.innerHTML = GALLERY.map(([file, cat, caption], i) =>
  `<figure data-cat="${cat}" data-index="${i}">
     <img src="images/thumbs/${file}.jpg" alt="${caption}" loading="lazy">
     <figcaption><span>${CATEGORY_LABELS[cat]}</span>${caption}</figcaption>
   </figure>`).join("");

const applyFilter = f => {
  masonry.querySelectorAll("figure").forEach(fig => {
    const inCat = f === "all" || fig.dataset.cat === f;
    const beyondPreview = f === "all" && !galleryExpanded && +fig.dataset.index >= GALLERY_PREVIEW;
    fig.classList.toggle("hidden", !inCat || beyondPreview);
  });
  moreBtn.parentElement.hidden = f !== "all" || galleryExpanded;
};
document.querySelectorAll(".filter").forEach(btn => {
  const n = btn.dataset.filter === "all" ? GALLERY.length : GALLERY.filter(g => g[1] === btn.dataset.filter).length;
  btn.insertAdjacentHTML("beforeend", ` <span class="filter-count">${n}</span>`);
  btn.addEventListener("click", () => {
    document.querySelector(".filter.active").classList.remove("active");
    btn.classList.add("active");
    applyFilter(btn.dataset.filter);
  });
});
moreBtn.textContent = `Show all ${GALLERY.length} photos`;
moreBtn.addEventListener("click", () => { galleryExpanded = true; applyFilter("all"); });
applyFilter("all");

// Lightbox
const lb = document.getElementById("lightbox");
const lbImg = lb.querySelector("img");
const lbCap = lb.querySelector(".lb-caption");
const lbCount = lb.querySelector(".lb-count");
let visible = [], pos = 0, lastFocus = null;

const show = () => {
  const [file, , caption] = GALLERY[visible[pos]];
  lbImg.src = `images/${file}.jpg`;
  lbImg.alt = caption;
  lbCap.textContent = caption;
  lbCount.textContent = `${pos + 1} / ${visible.length}`;
};
const openLb = index => {
  visible = [...masonry.querySelectorAll("figure:not(.hidden)")].map(f => +f.dataset.index);
  pos = visible.indexOf(index);
  show();
  lastFocus = document.activeElement;
  lb.classList.add("open");
  lb.setAttribute("aria-hidden", false);
  document.body.style.overflow = "hidden";
  document.body.classList.add("lb-open");
  lb.querySelector(".lb-close").focus();
};
const closeLb = () => {
  lb.classList.remove("open");
  lb.setAttribute("aria-hidden", true);
  document.body.style.overflow = "";
  document.body.classList.remove("lb-open");
  if (lastFocus) lastFocus.focus();
};
const step = d => { pos = (pos + d + visible.length) % visible.length; show(); };

masonry.querySelectorAll("figure").forEach(fig => {
  fig.tabIndex = 0;
  fig.setAttribute("role", "button");
  fig.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openLb(+fig.dataset.index); } });
});
masonry.addEventListener("click", e => {
  const fig = e.target.closest("figure");
  if (fig) openLb(+fig.dataset.index);
});
lb.querySelector(".lb-close").addEventListener("click", closeLb);
lb.querySelector(".lb-prev").addEventListener("click", () => step(-1));
lb.querySelector(".lb-next").addEventListener("click", () => step(1));
lb.addEventListener("click", e => { if (e.target === lb) closeLb(); });
document.addEventListener("keydown", e => {
  if (!lb.classList.contains("open")) return;
  if (e.key === "Escape") closeLb();
  if (e.key === "ArrowLeft") step(-1);
  if (e.key === "ArrowRight") step(1);
});
let touchX = null;
lb.addEventListener("touchstart", e => { touchX = e.touches[0].clientX; }, { passive: true });
lb.addEventListener("touchend", e => {
  if (touchX === null) return;
  const dx = e.changedTouches[0].clientX - touchX;
  if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
  touchX = null;
});

// Scroll reveal + stat counters
const io = new IntersectionObserver(entries => entries.forEach(entry => {
  if (!entry.isIntersecting) return;
  entry.target.classList.add("visible");
  io.unobserve(entry.target);
}), { threshold: 0, rootMargin: "0px 0px -8% 0px" });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));

const counterIo = new IntersectionObserver(entries => entries.forEach(entry => {
  if (!entry.isIntersecting) return;
  const el = entry.target, target = +el.dataset.count, start = performance.now();
  const tick = now => {
    const t = Math.min((now - start) / 1600, 1);
    el.textContent = Math.round(target * (1 - Math.pow(1 - t, 3)));
    if (t < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
  counterIo.unobserve(el);
}), { threshold: 0.5 });
document.querySelectorAll("[data-count]").forEach(el => counterIo.observe(el));

// Contact rows with copy buttons, and the optional WhatsApp button
const tel = n => `tel:${n.replace(/\s/g, "")}`;
const rows = [
  ["Email", CONTACT.email, `mailto:${CONTACT.email}`],
  ["Mobile / WhatsApp", CONTACT.mobile, tel(CONTACT.mobile)],
  ["Office", CONTACT.phone, tel(CONTACT.phone)],
  ["Address", CONTACT.address, null],
  ["Website", CONTACT.website.replace(/^https?:\/\/(www\.)?|\/$/g, ""), CONTACT.website],
].filter(([, value]) => value);
document.getElementById("contact-list").innerHTML = rows.map(([label, value, href]) => {
  const external = href && href.startsWith("http") ? ' target="_blank" rel="noopener"' : "";
  return `<li><div><span>${label}</span>${href ? `<a href="${href}"${external}>${value}</a>` : value}</div>
   <button class="copy-btn" data-copy="${value}">Copy</button></li>`;
}).join("");
document.getElementById("contact-list").addEventListener("click", async e => {
  const btn = e.target.closest(".copy-btn");
  if (!btn) return;
  try {
    await navigator.clipboard.writeText(btn.dataset.copy);
    btn.textContent = "Copied";
  } catch {
    btn.textContent = "Copy failed";
  }
  setTimeout(() => { btn.textContent = "Copy"; }, 1600);
});
if (CONTACT.whatsapp) {
  ["whatsapp-btn", "float-wa"].forEach(id => {
    const wa = document.getElementById(id);
    wa.href = `https://wa.me/${CONTACT.whatsapp}`;
    wa.hidden = false;
  });
}

// Floating WhatsApp / back-to-top buttons appear once past the hero
const floaters = document.getElementById("floaters");
new IntersectionObserver(([entry]) => floaters.classList.toggle("show", !entry.isIntersecting))
  .observe(slider);

// Highlight the nav link for the section in view
const navLinks = [...nav.querySelectorAll(".nav-links a[href^='#']")];
const spy = new IntersectionObserver(entries => entries.forEach(entry => {
  if (!entry.isIntersecting) return;
  navLinks.forEach(a => a.classList.toggle("active", a.getAttribute("href") === `#${entry.target.id}`));
}), { rootMargin: "-45% 0px -50% 0px" });
navLinks.forEach(a => { const s = document.querySelector(a.getAttribute("href")); if (s) spy.observe(s); });

// Contact form: opens the visitor's mail app with the enquiry filled in
document.getElementById("contact-form").addEventListener("submit", e => {
  e.preventDefault();
  const d = new FormData(e.target);
  const subject = `Enquiry: ${d.get("interest")}, from ${d.get("name")}`;
  const body = `${d.get("message")}\n\n${d.get("name")}\n${d.get("email")}`;
  window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

document.getElementById("year").textContent = new Date().getFullYear();
