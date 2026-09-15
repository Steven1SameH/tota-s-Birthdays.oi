/* ============================================================
   SCRIPT.JS  —  all logic lives here
   No user-facing text or colors should be edited in this file —
   everything editable is in config.js.
   ============================================================ */

/* ---------- 1. Inject CONFIG colors & fonts as CSS variables ---------- */
const rootStyle = document.documentElement.style;
rootStyle.setProperty("--bg-color", CONFIG.colors.background);
rootStyle.setProperty("--bg-light", CONFIG.colors.backgroundLight);
rootStyle.setProperty("--accent", CONFIG.colors.accentGold);
rootStyle.setProperty("--card-bg", CONFIG.colors.cardBackground);
rootStyle.setProperty("--text-dark", CONFIG.colors.textDark);
rootStyle.setProperty("--text-light", CONFIG.colors.textLight);
rootStyle.setProperty("--font-script", CONFIG.fonts.script);
rootStyle.setProperty("--font-body", CONFIG.fonts.body);
/* flower + decoration palette (used by the bouquet SVG and balloons) */
rootStyle.setProperty("--flower-primary", CONFIG.colors.flowerPrimary);
rootStyle.setProperty("--flower-secondary", CONFIG.colors.flowerSecondary);
rootStyle.setProperty("--flower-accent", CONFIG.colors.flowerAccent);
rootStyle.setProperty("--leaf-green", CONFIG.colors.leafGreen);
rootStyle.setProperty("--soft-pink", CONFIG.colors.softPink);

/* ---------- 2. Fill all text from CONFIG ---------- */
document.getElementById("sealTitle").textContent = CONFIG.sealText;
document.getElementById("sealSubtext").textContent = CONFIG.sealSubtext;
document.getElementById("letterMessage").textContent = CONFIG.letterMessage;
document.getElementById("montageTitle").textContent =
  CONFIG.montageTitle.replace("{name}", CONFIG.recipientName);
document.getElementById("menuTitle").textContent = CONFIG.menuTitle;
document.getElementById("messageSignature").textContent = CONFIG.personalMessageSignature;

/* small UI labels from CONFIG.ui */
document.querySelector(".env-letter-text").textContent = CONFIG.ui.envelopeLetterText;
document.querySelector("#letterContinue span").textContent = CONFIG.ui.continueHint;
document.querySelector(".montage-hint").textContent = CONFIG.ui.montageHint;
document.querySelectorAll(".back-btn span").forEach((el) => (el.textContent = CONFIG.ui.backLabel));
document.querySelector(".message-heading").textContent = CONFIG.ui.letterHeading;
document.querySelector(".flower-title").textContent = CONFIG.ui.flowerTitle;
document.querySelector(".cake-title").textContent = CONFIG.ui.cakeTitle;
document.getElementById("vinylLabel").textContent = CONFIG.ui.vinylPauseLabel;

/* ---------- 3. Screen navigation ---------- */
const SCREENS = {
  envelope: "screen-envelope",
  letter: "screen-letter",
  montage: "screen-montage",
  menu: "screen-menu",
  message: "screen-message",
  flower: "screen-flower",
  cake: "screen-cake",
};

let currentScreen = "screen-envelope";

function goTo(name) {
  const next = SCREENS[name];
  if (!next || next === currentScreen) return;

  // leave the current screen
  document.getElementById(currentScreen).classList.remove("active");
  currentScreen = next;
  // enter the new screen
  document.getElementById(currentScreen).classList.add("active");

  onEnter(name);
}

/* hooks that run each time a screen becomes visible */
function onEnter(name) {
  switch (name) {
    case "letter":
      showMusicToggle(); // mute/unmute icon appears from the letter onward
      break;
    case "montage":
      startMontageTimer(); // auto-advance to the menu after a few seconds
      break;
    case "menu":
      animateMenuCards();
      break;
    case "message":
      playSfx("messageChime"); // entering the message screen
      revealMessage();
      break;
    case "flower":
      playSfx("flowerBloom"); // entering the flower screen
      revealReasons();
      break;
    case "cake":
      playSfx("cakePop"); // entering the cake screen
      break;
  }
}

/* ---------- 4. Background music ---------- */
const audio = document.getElementById("bgAudio");
const musicToggle = document.getElementById("musicToggle");
audio.src = CONFIG.backgroundMusic;

let musicStarted = false; // stays false until the user's first tap
let musicMuted = false;   // user-controlled mute

function playMusic() {
  audio.play().catch(() => {}); // browsers may still block; fail silently
}

function pauseMusic() {
  audio.pause();
}

function showMusicToggle() {
  musicToggle.hidden = false;
}

musicToggle.addEventListener("click", (e) => {
  e.stopPropagation();
  musicMuted = !musicMuted;
  musicToggle.classList.toggle("muted", musicMuted);
  if (musicMuted) {
    pauseMusic();
  } else {
    playMusic();
    musicStarted = true;
  }
});

/* first tap anywhere in the page starts the music (browser rule) */
function handleFirstInteraction() {
  if (musicStarted) return;
  musicStarted = true;
  if (!musicMuted) playMusic();
}
document.addEventListener("pointerdown", handleFirstInteraction, { once: true });

/* ---------- 4b. Sound effects (layered on top of the music) ---------- */
const SFX = CONFIG.sounds;
let duckFrame = null; // rAF handle for the duck/fade-back cycle

/* play one effect by its config key, and duck the background music */
function playSfx(key) {
  if (!SFX.soundsEnabled || musicMuted) return; // respect master switch + global mute
  const entry = SFX[key];
  if (!entry || !entry.enabled || !entry.file) return;

  try {
    const fx = new Audio(entry.file); // separate element — never cuts the music off
    fx.volume = 0.9;
    fx.play().catch(() => {}); // missing/unloadable file → silently skip, site keeps working
  } catch (err) {
    /* never let a sound effect break the site */
  }
  duckMusic();
}

/* briefly lower the music, then smooth (ease-out) fade back to full volume */
function duckMusic() {
  if (musicMuted) return;
  audio.volume = SFX.musicDuckVolume;
  if (duckFrame) cancelAnimationFrame(duckFrame);

  const start = performance.now();
  const from = audio.volume;
  const to = 1;
  const duration = SFX.musicDuckFadeMs;

  function step(now) {
    const t = Math.min(1, (now - start) / duration);
    audio.volume = from + (to - from) * (1 - (1 - t) * (1 - t)); // ease-out
    duckFrame = t < 1 ? requestAnimationFrame(step) : null;
  }
  duckFrame = requestAnimationFrame(step);
}

/* ---------- 5. Screen 1 → 2 : open the envelope ---------- */
const envelopeScreen = document.getElementById("screen-envelope");
const waxSeal = document.getElementById("waxSeal");

waxSeal.addEventListener("click", (e) => {
  e.stopPropagation();
  playSfx("envelopeOpen"); // wax seal tapped → envelope opens
  envelopeScreen.classList.add("opening");
  waxSeal.disabled = true; // no double-tap
  setTimeout(() => goTo("letter"), 1000);
});

/* ---------- 6. Screen 2 → 3 : letter continue ---------- */
document.getElementById("letterContinue").addEventListener("click", () => {
  playSfx("transition"); // letter → photo montage
  goTo("montage");
});

/* ---------- 6b. Letter screen floating decorations ---------- */
function balloonSVG(color) {
  return (
    '<svg viewBox="0 0 40 52" xmlns="http://www.w3.org/2000/svg">' +
    '<ellipse cx="20" cy="17" rx="13" ry="16" fill="' + color + '" stroke="rgba(0,0,0,0.18)"/>' +
    '<polygon points="17,33 23,33 20,38" fill="' + color + '"/>' +
    '<path d="M20 38 q-4 8 2 14" stroke="' + color + '" fill="none" stroke-width="1.6"/>' +
    "</svg>"
  );
}

function sparkleSVG(color) {
  return (
    '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">' +
    '<path d="M12 0 L14.5 9.5 L24 12 L14.5 14.5 L12 24 L9.5 14.5 L0 12 L9.5 9.5 Z" fill="' + color + '"/>' +
    "</svg>"
  );
}

const letterDecorations = document.getElementById("letterDecorations");

function buildLetterDecorations() {
  letterDecorations.innerHTML = "";
  CONFIG.letterDecorations.forEach((d) => {
    const el = document.createElement("span");
    el.className = "decoration " + d.type;
    el.style.left = d.left + "%";
    el.style.top = d.top + "%";
    el.style.animationDuration = d.duration + "s"; // each element floats at its own pace
    el.style.animationDelay = d.delay + "s";

    const color = d.color ? CONFIG.colors[d.color] : CONFIG.colors.accentGold;

    if (d.type === "gift") {
      el.style.fontSize = d.size + "px";
      el.textContent = "\uD83C\uDF81"; // 🎁
    } else {
      el.style.setProperty("--dec-size", d.size + "px");
      if (d.type === "balloon") el.innerHTML = balloonSVG(color);
      else if (d.type === "confetti") el.style.background = color;
      else if (d.type === "sparkle") el.innerHTML = sparkleSVG(color);
    }

    letterDecorations.appendChild(el);
  });
}
buildLetterDecorations();

/* ---------- 7. Screen 3 : photo montage grid + timer ---------- */
function makeImageTile(src) {
  const tile = document.createElement("div");
  tile.className = "montage-tile";

  const img = document.createElement("img");
  img.alt = "memory";
  img.src = src;
  img.addEventListener("error", () => {
    tile.classList.add("placeholder");
    tile.innerHTML = "";
    const label = document.createElement("span");
    label.textContent = src;
    tile.appendChild(label);
  });
  tile.appendChild(img);
  return tile;
}

const montageGrid = document.getElementById("montageGrid");

function buildMontage() {
  montageGrid.innerHTML = "";
  const photos = CONFIG.photos;
  const totalTiles = 9; // 3x3 grid

  for (let i = 0; i < totalTiles; i++) {
    if (photos.length > 0) {
      montageGrid.appendChild(makeImageTile(photos[i % photos.length]));
    } else {
      // no photos configured yet — show an obvious placeholder
      const tile = document.createElement("div");
      tile.className = "montage-tile placeholder";
      const label = document.createElement("span");
      label.textContent = "Drop your photos into assets/";
      tile.appendChild(label);
      montageGrid.appendChild(tile);
    }
  }
}
buildMontage();

let montageTimer = null;
function startMontageTimer() {
  clearTimeout(montageTimer);
  montageTimer = setTimeout(() => goTo("menu"), 6000);
}

/* tap anywhere on the montage also advances */
document.getElementById("screen-montage").addEventListener("click", () => goTo("menu"));

/* ---------- 8. Screen 4 : menu icon cards ---------- */
const ICONS = {
  message:
    '<path d="M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z"/><polyline points="22 7 12 13 2 7"/>',
  flower:
    '<circle cx="12" cy="7.5" r="3.2"/><circle cx="16.3" cy="11.5" r="3.2"/><circle cx="13.5" cy="16.8" r="3.2"/><circle cx="7.5" cy="14" r="3.2"/><circle cx="8.5" cy="8.5" r="3.2"/><circle cx="12" cy="12" r="2.6"/>',
  cake:
    '<path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8"/><path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1"/><path d="M2 21h20"/><path d="M7 8v3M12 8v3M17 8v3"/><path d="M7 4v.01M12 4v.01M17 4v.01"/>',
  gift:
    '<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5C11 3 12 8 12 8s1-5 4.5-5a2.5 2.5 0 0 1 0 5"/>',
};

const MENU_TARGETS = {
  message: "message",
  flower: "flower",
  cake: "cake",
};

const menuCards = document.getElementById("menuCards");

function buildMenu() {
  menuCards.innerHTML = "";
  CONFIG.menuOptions.forEach((label, index) => {
    const key = label.toLowerCase();
    const icon = ICONS[key] || ICONS.gift;
    const target = MENU_TARGETS[key] || "message";

    const btn = document.createElement("button");
    btn.className = "menu-card";
    btn.style.transitionDelay = index * 120 + "ms";
    btn.style.animationDelay = index * 0.35 - 1.2 + "s";
    btn.innerHTML = '<svg viewBox="0 0 24 24">' + icon + "</svg>" +
                    '<span class="menu-card-label">' + escapeHtml(label) + "</span>";
    btn.addEventListener("click", () => goTo(target));
    menuCards.appendChild(btn);
  });
}
buildMenu();

function animateMenuCards() {
  const cards = menuCards.querySelectorAll(".menu-card");
  cards.forEach((card) => {
    card.classList.remove("show");
    // force reflow so the entrance animation replays every visit
    void card.offsetWidth;
    card.classList.add("show");
  });
}

/* ---------- 9. Screen 5 : personal message, line by line ---------- */
const messageBody = document.getElementById("messageBody");
let messageTimer = null;

function buildMessage() {
  messageBody.innerHTML = "";
  const lines = CONFIG.personalMessage.split("\n");
  lines.forEach((line) => {
    const span = document.createElement("span");
    span.className = "line";
    span.textContent = line;
    messageBody.appendChild(span);
  });
}
buildMessage();

function revealMessage() {
  clearTimeout(messageTimer);
  const lines = messageBody.querySelectorAll(".line");
  lines.forEach((l) => l.classList.remove("visible"));
  lines.forEach((line, i) => {
    messageTimer = setTimeout(() => line.classList.add("visible"), 150 + i * 260);
  });
}

/* ---------- 10. Screen 6 : bouquet of reasons ---------- */
const reasonsBoard = document.getElementById("reasonsBoard");

function buildReasons() {
  reasonsBoard.innerHTML = "";
  const count = CONFIG.reasons.length;

  // Fixed rows on both sides of the Ross image so every note stays readable.
  const anchors = [
    [2, 2],  [53, 2],
    [2, 21], [53, 21],
    [2, 40], [53, 40],
    [2, 59], [53, 59],
    [28, 79]
  ];

  CONFIG.reasons.forEach((reason, i) => {
    const anchor = anchors[i % anchors.length];

    const note = document.createElement("div");
    note.className = "reason-note";
    note.style.left = anchor[0] + "%";
    note.style.top = anchor[1] + "%";
    note.style.setProperty("--rot", (i % 2 ? 2 : -2) + "deg");
    note.style.transitionDelay = (i * 160) + "ms";
    note.textContent = reason;
    reasonsBoard.appendChild(note);
  });
}
buildReasons();

function revealReasons() {
  const notes = reasonsBoard.querySelectorAll(".reason-note");
  notes.forEach((n) => n.classList.remove("show"));
  notes.forEach((n) => {
    void n.offsetWidth; // force reflow so stagger replays
    n.classList.add("show");
  });
}

/* ---------- 11. Screen 7 : polaroids + vinyl record player ---------- */
const polaroidsWrap = document.getElementById("polaroids");

function makePolaroid(src) {
  const frame = document.createElement("div");
  frame.className = "polaroid";

  const img = document.createElement("img");
  img.alt = "memory";
  img.src = src;
  img.addEventListener("error", () => {
    frame.classList.add("placeholder");
    img.remove();
    const label = document.createElement("span");
    label.textContent = src;
    frame.appendChild(label);
  });
  frame.appendChild(img);
  return frame;
}

function buildPolaroids() {
  polaroidsWrap.innerHTML = "";
  if (CONFIG.photos.length === 0) {
    const frame = document.createElement("div");
    frame.className = "polaroid placeholder";
    frame.style.left = "50%";
    frame.style.top = "20%";
    const label = document.createElement("span");
    label.textContent = "Drop photos into assets/";
    frame.appendChild(label);
    polaroidsWrap.appendChild(frame);
    return;
  }

  CONFIG.photos.forEach((src, i) => {
    // Use explicit, repeatable positions so photos stay visible and clear
    // of the vinyl record instead of landing randomly behind it.
    const position = CONFIG.photoPositions?.[i % CONFIG.photoPositions.length] || {
      left: 4 + (i % 2) * 68,
      top: 8 + Math.floor(i / 2) * 52,
      rotate: i % 2 ? 6 : -6
    };

    const frame = makePolaroid(src);
    frame.style.left = position.left + "%";
    frame.style.top = position.top + "%";
    frame.style.setProperty("--rot", position.rotate + "deg");
    frame.style.transitionDelay = (i * 150) + "ms";
    frame.style.animationDelay = (i * 150 + 450) + "ms";
    polaroidsWrap.appendChild(frame);
  });
}
buildPolaroids();

/* --- cake image: open the birthday video --- */
const vinylLabel = document.getElementById("vinylLabel");
const cakeImageButton = document.getElementById("cakeImageButton");
const videoModal = document.getElementById("videoModal");
const birthdayVideo = document.getElementById("birthdayVideo");
const localBirthdayVideo = document.getElementById("localBirthdayVideo");
const videoMissing = document.getElementById("videoMissing");
const videoClose = document.getElementById("videoClose");
let musicWasPlayingBeforeVideo = false;

function toDriveEmbedUrl(url) {
  const match = String(url || "").match(/\/d\/([a-zA-Z0-9_-]+)/);
  return match ? "https://drive.google.com/file/d/" + match[1] + "/preview" : url;
}

function closeVideo() {
  videoModal.hidden = true;
  birthdayVideo.src = "";
  localBirthdayVideo.pause();
  localBirthdayVideo.removeAttribute("src");
  localBirthdayVideo.load();
  if (musicWasPlayingBeforeVideo && !musicMuted) {
    playMusic();
  }
  musicWasPlayingBeforeVideo = false;
}

cakeImageButton.addEventListener("click", (e) => {
  e.stopPropagation();
  musicWasPlayingBeforeVideo = !audio.paused && !musicMuted;
  pauseMusic();
  const url = toDriveEmbedUrl(CONFIG.birthdayVideoUrl);
  videoModal.hidden = false;
  if (url && /\.mp4($|\?)/i.test(url)) {
    localBirthdayVideo.src = url;
    localBirthdayVideo.hidden = false;
    birthdayVideo.hidden = true;
    videoMissing.hidden = true;
    localBirthdayVideo.play().catch(() => {});
  } else if (url) {
    birthdayVideo.src = url;
    birthdayVideo.hidden = false;
    localBirthdayVideo.hidden = true;
    videoMissing.hidden = true;
  } else {
    birthdayVideo.hidden = true;
    localBirthdayVideo.hidden = true;
    videoMissing.hidden = false;
  }
});
videoClose.addEventListener("click", closeVideo);
document.querySelector("[data-close-video]").addEventListener("click", closeVideo);

/* ---------- 12. Back buttons ---------- */
document.querySelectorAll(".back-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    goTo("menu");
  });
});

/* ---------- helpers ---------- */
function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}
