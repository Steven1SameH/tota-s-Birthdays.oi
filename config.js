/* ============================================================
   CONFIG.JS  —  EDIT THIS ONE FILE TO PERSONALIZE THE WHOLE SITE
   ============================================================
   Every piece of text, every color, and every image / audio
   filename lives in this single object below.

   To customize the site:
     1. Change any value inside CONFIG.
     2. Drop your photos into the "assets/" folder.
     3. Drop your music file into the "assets/" folder.
     4. Open index.html in a browser (or deploy the folder
        as-is to Vercel / Netlify).

   You do NOT need to touch index.html, style.css or script.js.
   ============================================================ */

const CONFIG = {

  /* ------------------------------------------------------------
     RECIPIENT NAME
     Shown on the photo montage intro screen.
     Use a plain English name for best results with the script fonts.
  ------------------------------------------------------------ */
  recipientName: "tota",                    // e.g. "Tota"

  /* ------------------------------------------------------------
     COLORS  —  change any hex value to restyle the whole site.
     These are injected into CSS as variables on page load, so
     editing here is the ONLY place you need to change a color.
  ------------------------------------------------------------ */
  colors: {
    background: "#7a1622",                  // main dark red/burgundy background
    backgroundLight: "#a8324a",             // secondary/gradient red
    accentGold: "#d4af37",                  // wax seal + decorative gold details
    cardBackground: "#fdf6ec",              // letter / cards / polaroid background
    textDark: "#2b2b2b",                    // dark text on light cards
    textLight: "#ffffff",                   // light text on dark backgrounds

    /* flower screen palette */
    flowerPrimary: "#d94f6a",               // main rose color of the bouquet
    flowerSecondary: "#e88aa0",             // mid-rose petals
    flowerAccent: "#f2b8c6",                // light blush filler blooms
    leafGreen: "#4c9a54",                   // stems & leaves

    /* extra soft pink used for balloons / small decorations */
    softPink: "#f3c4c8"
  },

  /* ------------------------------------------------------------
     FONTS  —  names of the Google Fonts used.
     "script" = handwriting / cursive headings
     "body"   = clean, readable body text
  ------------------------------------------------------------ */
  fonts: {
    script: "'Great Vibes', cursive",       // titles / handwriting style
    body: "'Poppins', sans-serif"           // readable body text
  },

  /* ------------------------------------------------------------
     SCREEN 1 — SEALED ENVELOPE
     Text shown on / above the envelope.
  ------------------------------------------------------------ */
  sealText: "Happy Birthday Toty!",              // script-font line above the seal
  sealSubtext: "Click the seal to open",    // small hint under the envelope

  /* ------------------------------------------------------------
     SCREEN 2 — LETTER REVEAL
     Short welcome note revealed after the envelope opens.
  ------------------------------------------------------------ */
  letterMessage: "Love You Forever",

  /* ------------------------------------------------------------
     LETTER SCREEN DECORATIONS  —  floating gifts, balloons,
     confetti and sparkles around the letter card.
     One entry per element. Add / remove / reposition freely.

     Fields:
       type     : "gift" | "balloon" | "confetti" | "sparkle"
       left     : horizontal position in % of screen width (0 = far left)
       top      : vertical position in % of screen height (0 = very top)
       size     : base size in px
       duration : seconds for one full float up/down loop
       delay    : seconds to wait before starting (offsets the motion)
       color    : (optional) a key from CONFIG.colors above, used for
                  balloons, confetti dots and sparkles. Leave out for
                  gifts (they use the 🎁 emoji).
  ------------------------------------------------------------ */
  letterDecorations: [
    { type: "gift",      left: 5,   top: 10,  size: 38, duration: 5.5, delay: 0 },
    { type: "balloon",   left: 6,   top: 70,  size: 44, duration: 6.4, delay: 0.7, color: "backgroundLight" },
    { type: "balloon",   left: 92,  top: 12,  size: 34, duration: 5.1, delay: 1.5, color: "accentGold" },
    { type: "confetti",  left: 18,  top: 78,  size: 13, duration: 4.6, delay: 0.3, color: "accentGold" },
    { type: "sparkle",   left: 90,  top: 60,  size: 22, duration: 6.1, delay: 2.1, color: "softPink" },
    { type: "balloon",   left: 84,  top: 80,  size: 50, duration: 7.2, delay: 0.1, color: "softPink" },
    { type: "gift",      left: 40,  top: 6,   size: 28, duration: 6.3, delay: 1.1 },
    { type: "confetti",  left: 62,  top: 8,   size: 12, duration: 5.4, delay: 1.7, color: "backgroundLight" },
    { type: "sparkle",   left: 8,   top: 40,  size: 18, duration: 5.7, delay: 2.6, color: "accentGold" },
    { type: "sparkle",   left: 80,   top: 40,  size: 18, duration: 5.7, delay: 2.6, color: "accentGold" },
    { type: "gift",      left: 80,   top: 15,  size: 38, duration: 5.5, delay: 0 },
    { type: "gift",      left: 16,   top: 85,  size: 38, duration: 5.5, delay: 0 },
    { type: "gift",      left: 70,   top: 85,  size: 38, duration: 5.5, delay: 0 },
    { type: "confetti",  left: 30,  top: 88,  size: 13, duration: 4.9, delay: 0.5, color: "softPink" }
  ],

  /* ------------------------------------------------------------
     SCREEN 3 — PHOTO MONTAGE INTRO
     {name} is auto-replaced with CONFIG.recipientName.
  ------------------------------------------------------------ */
  montageTitle: "Happy Birthday {name}!",   // {name} auto-replaced with recipientName

  /* ------------------------------------------------------------
     SCREEN 4 — MAIN MENU
  ------------------------------------------------------------ */
  menuTitle: "These are for you",           // script-font heading on the menu
  menuOptions: ["Message", "Flower", "Cake"], // one icon card per item (3 items)

  /* ------------------------------------------------------------
     SCREEN 5 — MESSAGE (PERSONAL LETTER)
     The long personal letter, shown after the menu.
     Use backticks so you can type multiple lines.
  ------------------------------------------------------------ */
  personalMessage: `batoty 7bibty kol sana w anti a8la haga w ahm haga 7slt fe 7yaty 
  kol sana w ana kol yom b7bk aktr w bt3l2 bkol tfsyla fiki aktr kol sana w a7na mlnash 8ir b3d 
  kol sana w ana dyman bnam w b2om m3aki w kol sana w ana m2drsh a3shha mn 8irk 
  mafesh kalm yosf 7obi liki akid w mafesh haga a2dr a3mlha tkfyki aw a3od byha el 7ob w ek 5of
  el bshofhom fe 3yonk dyman lya...awel 3id mlad liki m3aya ya set baty w isa mesh a5er wa7d
  3lashn a7na kda kda mktobin lb3d ya 7bibty w 2a3d 3ala 2lbk (de klmtk ana 3arf :))
  mesh 7abb agib syrt ay haga 2dyma fe yom momyz zy da bs lazm afkr nfsi fe kol monsba ani a2olk 
  ani b7bk awi awi awi w an rbna ysa3dni as3dk w akon 2d ms2olya w akon ragl w snad liki f3ln 
  w zy ma b2olk dyman lw a2dr agblk el nfsk fe mn 8ir ma t2oly hykon ben 2edk asln
  rbna y5liki lya ya ro7i w kol sana w 7yaty mnwra biki w l2a5r el 3omr sawa .`,
  personalMessageSignature: "— Tito",  // signed at the end of the letter

  /* ------------------------------------------------------------
     SCREEN 6 — FLOWER (BOUQUET OF REASONS)
     One sticky-note card is generated automatically for each
     entry in this array. Add or remove lines freely.
  ------------------------------------------------------------ */
  reasons: [
    "You are kind in ways that inspire everyone around you",
    "You are strong, even when things get difficult",
    "You are thoughtful and always consider others",
    "You are beautiful in every state, even when you are angry.",
    "You have the most beautiful eyes and an irresistible smile.",
    "Your voice makes even ordinary days feel special",
    "You make me feel safe, understood, and truly loved",
    "Your heart is pure, and your presence makes everything better",
    "You are the person I want beside me in every new memory"
  ],

  /* ------------------------------------------------------------
     PHOTOS  —  used on the montage intro + cake (polaroid) screen.
     Drop your portrait photos into the assets/ folder and list
     their filenames here. You can add or remove entries freely.
     If a file is missing, a gray placeholder box with the
     filename is shown instead so the layout never breaks.
  ------------------------------------------------------------ */
  photos: [
    "assets/photo1.jpg",
    "assets/photo2.jpg",
    "assets/photo3.jpg",
    "assets/photo4.jpg"
  ],

  /* ------------------------------------------------------------
     CAKE PHOTO POSITIONS
     One position per photo, in percentages of the cake scene.
     Add more entries when you add more photos. If there are more
     photos than positions, the positions are reused in order.
  ------------------------------------------------------------ */
  photoPositions: [
    { left: 3,  top: 6,  rotate: -7 },
    { left: 70, top: 6,  rotate: 7 },
    { left: 3,  top: 59, rotate: 6 },
    { left: 70, top: 59, rotate: -6 },
    { left: 35, top: 2,  rotate: -4 },
    { left: 35, top: 64, rotate: 4 }
  ],

  /* ------------------------------------------------------------
     BACKGROUND MUSIC  —  used on the cake screen (and anywhere
     the mute/unmute icon is visible).
     Drop a royalty-free MP3 (30–60s) into assets/ and name it here.
     Music only starts after the user's first tap (browser rule).
  ------------------------------------------------------------ */
  backgroundMusic: "assets/song.mp3",

  /* Google Drive video opened when the cake image is tapped.
     Replace this with the video's share link after uploading it. */
 birthdayVideoUrl: "https://drive.google.com/file/d/1yUxx1ACAsSujdN6R0hOqTFSTENu0cLD_/view?usp=sharing",

  /* ------------------------------------------------------------
     SOUND EFFECTS  —  short sounds (under 2s each) that play at
     key interaction moments, layered ON TOP of the background
     music. While an effect plays, the music briefly dips to
     `musicDuckVolume` and smoothly fades back to full volume
     over `musicDuckFadeMs`.

     Each effect has its own entry with a `file` and `enabled`
     flag — set `enabled: false` to turn off just that one.
     Set `soundsEnabled: false` to switch off ALL effects.
     Missing files are silently skipped, so you can add them
     to assets/sfx/ at any time.

     Drop the MP3 files into the assets/sfx/ folder with the
     exact filenames below.
  ------------------------------------------------------------ */
  sounds: {
    soundsEnabled: true,                          // master switch for all effects
    musicDuckVolume: 0.3,                         // music dips to this volume (0-1) while an effect plays
    musicDuckFadeMs: 1800,                        // how long the fade back to full volume takes (ms)

    envelopeOpen: {                               // wax seal tapped, envelope opens (screen 1 → 2)
      file: "assets/sfx/envelope-open.mp3",
      enabled: true
    },
    transition: {                                 // letter screen → photo montage
      file: "assets/sfx/whoosh.mp3",
      enabled: true
    },
    messageChime: {                               // entering the Message screen
      file: "assets/sfx/chime.mp3",
      enabled: true
    },
    flowerBloom: {                                // entering the Flower screen
      file: "assets/sfx/bloom.mp3",
      enabled: true
    },
    cakePop: {                                    // entering the Cake screen
      file: "assets/sfx/pop.mp3",
      enabled: true
    },
    vinylDrop: {                                  // pressing play on the vinyl record
      file: "assets/sfx/needle-drop.mp3",
      enabled: true
    }
  },

  /* ------------------------------------------------------------
     SMALL UI LABELS  —  every remaining bit of text on the site.
     You probably won't need to change these, but they are here
     so no text lives anywhere except config.js.
  ------------------------------------------------------------ */
  ui: {
    envelopeLetterText: "A little something for you...", // text peeking out of the envelope
    continueHint: "tap to continue",                     // button below the letter card
    montageHint: "Tap anywhere to continue",             // hint on the montage screen
    backLabel: "Menu",                                   // label on every back button
    letterHeading: "A letter for you",                   // heading on the message screen
    flowerTitle: "Why I adore you",                      // heading on the flower screen
    cakeTitle: "Moments & a song",                       // heading on the cake screen
    vinylPauseLabel: "Tap the cake to watch the video",  // label under the cake image
    vinylPlayLabel: "Now playing ♪"                      // label under the vinyl when playing
  }

};
