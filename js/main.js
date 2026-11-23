/* All editable content is in ../content.js. This file is behaviour only. */
const S = window.SITE, C = S.config;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const T0 = Date.now();                       // page load time (bot check)

const DEFAULT_LANG = "hi";   // site opens in Hindi; visitors can switch with the हिं / EN button
let lang = DEFAULT_LANG;
try { lang = localStorage.getItem("lang") || DEFAULT_LANG; } catch (e) {}
const T = k => (I18N[lang] && I18N[lang][k]) || I18N.en[k] || k;
const L = o => (o && typeof o === "object") ? (o[lang] || o.en || "") : (o || "");
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/* ---------- hidden contact details ----------
   Phone/email are stored reversed + base64 and decoded ONLY on a real human tap,
   so they never appear in the page source, links or search-engine data. */
const dec = s => { try { return atob(s).split("").reverse().join(""); } catch (e) { return ""; } };
const getPhone = () => dec(C.phoneEnc);
const getEmail = () => dec(C.emailEnc);
const humanClick = e => e && e.isTrusted;

function waUrl(text) { return `https://wa.me/${getPhone()}?text=${encodeURIComponent(text)}`; }
const DEFAULT_MSG = "Hello! I want to enquire about blouse/petticoat stitching.";

document.addEventListener("click", e => {
  const wa = e.target.closest("[data-wa]"), tel = e.target.closest("[data-tel]");
  if (!wa && !tel) return;
  e.preventDefault();
  if (!humanClick(e)) return;
  if (wa) window.open(waUrl(DEFAULT_MSG), "_blank", "noopener");
  else location.href = "tel:+" + getPhone();
});
$("#revealBtn").addEventListener("click", e => {
  if (!humanClick(e)) return;
  const box = $("#revealed"), p = getPhone(), m = getEmail();
  box.innerHTML = `<a href="tel:+${esc(p)}">+${esc(p.slice(0, 2))} ${esc(p.slice(2))}</a>` + (m ? ` &nbsp;·&nbsp; <a href="mailto:${esc(m)}">${esc(m)}</a>` : "");
  box.hidden = false; e.currentTarget.parentElement.hidden = true;
});

/* ---------- basic wiring ---------- */
function applyConfig() {
  $$("[data-config=name]").forEach(e => e.textContent = L(C.name));
  $$("[data-config=address]").forEach(e => e.textContent = C.address);
  $("#phoneMask").textContent = C.phoneMask;
  const q = encodeURIComponent(C.mapQuery);
  $("#mapFrame").src = `https://www.google.com/maps?q=${q}&output=embed`;
  $$("[data-config-dir]").forEach(e => e.href = `https://www.google.com/maps/dir/?api=1&destination=${q}`);
  $("#year").textContent = new Date().getFullYear();
  $("#date").min = new Date().toISOString().split("T")[0];
}

/* ---------- reveal on scroll ---------- */
const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } }), { threshold: .12 });
const observe = () => $$(".reveal:not(.in)").forEach(el => io.observe(el));

/* ---------- announcement bar ---------- */
let annIdx = 0, annTimer;
function showAnnounce() {
  const el = $("#announceText"), list = S.announce || [];
  if (!list.length) { $("#announce").hidden = true; return; }
  el.classList.remove("show");
  setTimeout(() => { el.textContent = L(list[annIdx % list.length]); el.classList.add("show"); }, 200);
}
function startAnnounce() {
  clearInterval(annTimer); showAnnounce();
  if ((S.announce || []).length > 1 && !matchMedia("(prefers-reduced-motion: reduce)").matches)
    annTimer = setInterval(() => { annIdx++; showAnnounce(); }, 3800);
}

/* ---------- content renderers ---------- */
function renderPromises() {
  $("#promiseGrid").innerHTML = (S.promises || []).map(p => `<div class="promise reveal"><span class="p-ico">${esc(p.icon)}</span><div><h3>${esc(L(p.title))}</h3><p>${esc(L(p.text))}</p></div></div>`).join("");
}
function renderPickup() {
  const p = S.pickup || { steps: [] };
  $("#pickupSteps").innerHTML = p.steps.map(s => `<div class="step reveal"><span class="step-ico">${esc(s.icon)}</span><h3>${esc(L(s.title))}</h3><p>${esc(L(s.text))}</p></div>`).join("");
  $("#pickupNote").textContent = L(p.note);
}
function renderServices() {
  $("#servicesGrid").innerHTML = (S.services || []).map(s => `<article class="card reveal"><div class="card-ico">${esc(s.icon)}</div><h3>${esc(L(s.title))}</h3><p>${esc(L(s.text))}</p><span class="price">${esc(L(s.price))}</span></article>`).join("");
}
function stars(n) { n = Math.max(1, Math.min(5, Math.round(+n) || 5)); return "★".repeat(n) + "☆".repeat(5 - n); }

/* Reviews are read from data/reviews.json (edit it with admin.html). If the file cannot be loaded
   (for example index.html opened straight from a folder) content.js is the fallback. */
let reviewsData = { reviews: S.reviews || [], samples: !!S.reviewsAreSamples };
async function loadReviews() {
  try {
    const r = await fetch("data/reviews.json", { cache: "no-store" });
    if (!r.ok) throw new Error("http " + r.status);
    const j = await r.json();
    reviewsData = { reviews: Array.isArray(j.reviews) ? j.reviews : [], samples: !!j.reviewsAreSamples };
  } catch (e) { /* keep fallback */ }
  renderReviews();
}
function renderReviews() {
  const list = reviewsData.reviews.filter(r => r && r.approved !== false);
  const sum = $("#ratingSummary");
  if (list.length) {
    const avg = list.reduce((t, r) => t + (+r.rating || 0), 0) / list.length;
    const cnt = list.length === 1 ? T("rv_one") : T("rv_count").replace("{n}", list.length);
    sum.innerHTML = `<span class="avg">${avg.toFixed(1)}</span><span class="avg-stars" aria-hidden="true">${stars(avg)}</span><span class="avg-n">${esc(cnt)}</span>`;
  } else sum.innerHTML = `<span class="avg-n">${esc(T("rv_none"))}</span>`;
  $("#reviewsGrid").innerHTML = list.map(r => {
    const txt = typeof r.text === "string" ? r.text : L(r.text);
    return `<blockquote class="card quote reveal"><div class="stars" role="img" aria-label="${esc(r.rating)} / 5">${stars(r.rating)}</div><p>“${esc(txt)}”</p><cite>— ${esc(r.name)}</cite></blockquote>`;
  }).join("");
  $("#sampleNote").hidden = !reviewsData.samples;
  observe();
}
function renderFaq() {
  $("#faqList").innerHTML = (S.faqs || []).map(f => `<details class="faq reveal"><summary>${esc(L(f.q))}</summary><p>${esc(L(f.a))}</p></details>`).join("");
  $("#areas").innerHTML = (S.areas || []).map(a => `<span class="area">${esc(a)}</span>`).join("");
}

/* ---------- gallery ---------- */
function art(d) {
  if (d.image) return `<img src="${esc(d.image)}" alt="${esc(L(d.name))} – ${lang === "hi" ? "वैष्णवी सिलाई सेंटर" : "Vaishnavi Silai Centre"}" loading="lazy">`;
  const [a, b] = d.c, g = "g" + d.id;
  const body = { pet: `<path d="M110 70 H210 L250 270 Q160 295 70 270 Z" fill="url(#${g})"/><path d="M110 70 H210" stroke="#c9a24a" stroke-width="6"/>`,
    fish: `<path d="M115 70 H205 L215 190 Q250 240 235 275 Q160 295 85 275 Q70 240 105 190 Z" fill="url(#${g})"/><path d="M115 70 H205" stroke="#c9a24a" stroke-width="6"/>`,
    lace: `<path d="M110 70 H210 L250 270 Q160 295 70 270 Z" fill="url(#${g})"/><path d="M80 262 Q95 280 110 266 Q125 284 140 270 Q155 288 170 272 Q185 286 200 268 Q215 282 230 264 L250 270" fill="none" stroke="#fff" stroke-width="5" stroke-dasharray="4 4"/>` }[d.neck];
  const neckPath = { v: "M125 70 L160 130 L195 70", boat: "M105 72 Q160 100 215 72", back: "M125 70 Q160 190 195 70", round: "M125 70 Q160 140 195 70", collar: "M125 70 L160 110 L195 70 L180 62 L160 90 L140 62 Z", bridal: "M125 70 Q160 150 195 70" }[d.neck];
  const blouse = `<path d="M105 70 L60 120 L90 160 L108 148 L108 250 Q160 270 212 250 L212 148 L230 160 L260 120 L215 70 Q160 100 105 70 Z" fill="url(#${g})"/>
    <path d="${neckPath}" fill="${d.neck === "back" ? "#fff" : "none"}" fill-opacity=".35" stroke="#c9a24a" stroke-width="4"/>
    ${d.neck === "bridal" ? `<g fill="#c9a24a"><circle cx="150" cy="170" r="5"/><circle cx="170" cy="190" r="5"/><circle cx="145" cy="210" r="5"/><circle cx="175" cy="225" r="5"/><circle cx="160" cy="150" r="5"/></g>` : ""}
    ${d.neck === "back" ? `<g fill="#c9a24a"><circle cx="160" cy="140" r="4"/><circle cx="160" cy="165" r="4"/><circle cx="160" cy="190" r="4"/></g>` : ""}`;
  return `<svg viewBox="0 0 320 320" role="img" aria-label="${esc(L(d.name))}"><defs><linearGradient id="${g}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs>
    <rect width="320" height="320" fill="${b}" opacity=".22"/>${body || blouse}</svg>`;
}
let filter = "all";
function renderGallery() {
  const g = $("#gallery");
  g.innerHTML = (S.designs || []).map(d => `<button class="tile reveal${filter !== "all" && d.cat !== filter ? " hide" : ""}" data-cat="${esc(d.cat)}" data-id="${esc(d.id)}"><div class="art">${art(d)}</div><span class="cap">${esc(L(d.name))}</span></button>`).join("");
  $$(".tile", g).forEach(t => t.addEventListener("click", () => openLb(t)));
}
$$(".chip").forEach(ch => ch.addEventListener("click", () => {
  filter = ch.dataset.filter;
  $$(".chip").forEach(c => c.classList.toggle("active", c === ch));
  $$("#gallery .tile").forEach(t => t.classList.toggle("hide", filter !== "all" && t.dataset.cat !== filter));
}));

/* ---------- lightbox ---------- */
const lb = $("#lightbox");
function openLb(t) {
  const d = S.designs.find(x => x.id === t.dataset.id);
  $("#lbBody").innerHTML = $(".art", t).innerHTML;
  $("#lbCap").textContent = L(d.name);
  $("#design").value = L(d.name);
  lb.classList.add("open"); lb.setAttribute("aria-hidden", "false");
}
function closeLb() { lb.classList.remove("open"); lb.setAttribute("aria-hidden", "true"); }
$(".lb-close").addEventListener("click", closeLb);
$("#lbCta").addEventListener("click", closeLb);
lb.addEventListener("click", e => { if (e.target === lb) closeLb(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") closeLb(); });

/* ---------- typed effect ---------- */
let typedTimer;
function restartTyped() {
  clearTimeout(typedTimer);
  const el = $("#typed"), words = I18N[lang].typed;
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) { el.textContent = words[0]; return; }
  let w = 0, c = 0, del = false;
  (function tick() {
    const word = words[w];
    el.textContent = word.slice(0, c);
    if (!del && c === word.length) { del = true; typedTimer = setTimeout(tick, 1400); return; }
    if (del && c === 0) { del = false; w = (w + 1) % words.length; }
    c += del ? -1 : 1;
    typedTimer = setTimeout(tick, del ? 45 : 95);
  })();
}

/* ---------- language ---------- */
function renderAll() {
  document.documentElement.lang = lang;
  $$("[data-i18n]").forEach(e => { const v = T(e.dataset.i18n); if (v) e.textContent = v; });
  document.title = T("title");
  applyConfig(); renderPromises(); renderPickup(); renderServices(); renderReviews(); renderFaq(); renderGallery();
  restartTyped(); startAnnounce(); observe();
}
$("#langToggle").addEventListener("click", () => {
  lang = lang === "en" ? "hi" : "en";
  try { localStorage.setItem("lang", lang); } catch (e) {}
  renderAll();
});

/* ---------- menu ---------- */
$("#burger").addEventListener("click", e => {
  const open = $("#menu").classList.toggle("open");
  e.currentTarget.setAttribute("aria-expanded", open);
});
const syncPickup = () => { $("#pkNotice").hidden = !$("#pickup").value.startsWith("Pickup"); };
$("#pickup").addEventListener("change", syncPickup);
$$("[data-pickup-cta]").forEach(a => a.addEventListener("click", () => { $("#pickup").value = "Pickup & drop at home"; syncPickup(); }));
$$("#menu a").forEach(a => a.addEventListener("click", () => $("#menu").classList.remove("open")));

/* ---------- geolocation ---------- */
let mapLink = "";
$("#geoBtn").addEventListener("click", () => {
  const st = $("#geoStatus");
  if (!navigator.geolocation) { st.textContent = T("geo_unsupported"); return; }
  st.textContent = T("geo_wait");
  navigator.geolocation.getCurrentPosition(p => {
    const { latitude: la, longitude: lo } = p.coords;
    mapLink = `https://www.google.com/maps?q=${la.toFixed(6)},${lo.toFixed(6)}`;
    st.textContent = T("geo_ok") + " " + mapLink;
  }, () => { st.textContent = T("geo_fail"); }, { enableHighAccuracy: true, timeout: 12000 });
});

/* ---------- forms ---------- */
const form = $("#enquiry");
const formData = f => Object.fromEntries(new FormData(f).entries());
const looksBot = f => !!f.website.value || Date.now() - T0 < 3000;   // honeypot filled or submitted too fast
function setErr(f, id, msg) { const fld = $("#" + id, f).closest(".field"); $(".err", fld).textContent = msg || ""; fld.classList.toggle("bad", !!msg); return !msg; }
function validate() {
  const a = setErr(form, "name", form.name.value.trim().length < 2 ? T("err_name") : "");
  const b = setErr(form, "phone", /^[6-9]\d{9}$/.test(form.phone.value.trim()) ? "" : T("err_phone"));
  const needAddr = form.pickup.value.startsWith("Pickup") && !form.address.value.trim() && !mapLink;
  const c = setErr(form, "address", needAddr ? T("err_addr") : "");
  return a && b && c;
}
function summary(d) {
  return [`Hello ${L(C.name)}!`, `Name: ${d.name}`, `Mobile: ${d.phone}`, `Need: ${d.service}`, `Service: ${d.pickup}${d.pickup.startsWith('Pickup') ? ' (extra charge - payment first)' : ''}`,
    d.design && `Design: ${d.design}`, d.date && `Date: ${d.date}`, d.address && `Address: ${d.address}`,
    mapLink && `Location: ${mapLink}`, d.message && `Message: ${d.message}`].filter(Boolean).join("\n");
}
$("#sendWa").addEventListener("click", e => {
  if (!humanClick(e) || !validate()) return;
  window.open(waUrl(summary(formData(form))), "_blank", "noopener");
});
async function postForm(payload) {
  const r = await fetch(C.formspree, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(payload) });
  if (!r.ok) throw new Error("http " + r.status);
}
form.addEventListener("submit", async e => {
  e.preventDefault();
  if (!validate()) return;
  const st = $("#formStatus"); st.className = "status";
  if (looksBot(form)) return;
  if (!C.formspree) { st.textContent = T("mail_unset"); st.classList.add("bad"); return; }
  st.textContent = T("sending");
  try {
    const d = formData(form); delete d.website; d.location_link = mapLink;
    await postForm(d);
    st.textContent = T("sent_ok"); st.classList.add("ok"); form.reset(); mapLink = ""; $("#geoStatus").textContent = "";
  } catch (err) { st.textContent = T("sent_fail"); st.classList.add("bad"); }
});

/* Review form: sent to the owner (Formspree, or WhatsApp if not set up). Not shown on the site
   until the owner copies it into content.js -> that is the "approval". */
const rf = $("#reviewForm");
rf.addEventListener("submit", async e => {
  e.preventDefault();
  const st = $("#rvStatus"); st.className = "status full";
  const okN = setErr(rf, "rvName", rf.name.value.trim().length < 2 ? T("err_name") : "");
  const okT = setErr(rf, "rvText", rf.text.value.trim().length < 5 ? T("err_rv") : "");
  if (!okN || !okT || looksBot(rf)) return;
  const d = { _subject: "New website review", name: rf.name.value.trim(), rating: rf.rating.value, review: rf.text.value.trim() };
  // The review is sent to the owner (email via Formspree, or WhatsApp). The owner adds it to
  // data/reviews.json with admin.html; only then does it appear on the site.
  const json = JSON.stringify({ name: d.name, rating: +d.rating, text: d.review });
  if (C.formspree) {
    d.review_json = json;
    try { await postForm(d); st.textContent = T("rv_ok"); st.classList.add("ok"); rf.reset(); }
    catch (err) { st.textContent = T("rv_fail"); st.classList.add("bad"); }
  } else if (humanClick(e) || e.submitter) {
    window.open(waUrl(`New review\nName: ${d.name}\nRating: ${d.rating}/5\n${d.review}\n\n${json}`), "_blank", "noopener");
    st.textContent = T("rv_ok"); st.classList.add("ok"); rf.reset();
  }
});

renderAll();
loadReviews();
