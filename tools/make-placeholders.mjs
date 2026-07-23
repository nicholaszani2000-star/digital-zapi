/**
 * make-placeholders.mjs
 * ---------------------------------------------------------------------------
 * Genera placeholder ELEGANTI con gli STESSI nomi e le STESSE proporzioni
 * degli asset finali, così la sostituzione con le foto reali è 1:1.
 *
 * Quando avrai le 3 foto ufficiali in ./input, lancia invece:
 *     npm run assets        (tools/prepare-assets.mjs)
 * che sovrascrive questi file con i ritagli reali, senza toccare l'HTML.
 *
 * Uso:  npm run placeholders
 * ---------------------------------------------------------------------------
 */
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'assets');
mkdirSync(OUT, { recursive: true });

/* ---- Palette brand ------------------------------------------------------ */
const C = {
  ink: '#1A1615',
  dark: '#0E0B0D',
  gold: '#B8935A',
  goldLight: '#D9BC85',
  white: '#FFFFFF',
  warm: '#F6F4F1',
  blush: '#E7A9C2',
  muted: '#6E6A67',
};

const SERIF = 'DejaVu Serif';
const SANS = 'DejaVu Sans';

/* Piccola etichetta "esempio" per segnalare che è un placeholder */
const chip = (w, h) => `
  <g transform="translate(${w - 150}, ${h - 58})" opacity="0.9">
    <rect x="0" y="0" width="118" height="30" rx="15" fill="#000000" opacity="0.42"/>
    <circle cx="18" cy="15" r="3.2" fill="${C.goldLight}"/>
    <text x="32" y="20" font-family="${SANS}" font-size="13" letter-spacing="2"
          fill="#F3ECE6">ESEMPIO</text>
  </g>`;

const render = (svg, out, opts = {}) => {
  const img = sharp(Buffer.from(svg));
  const p = join(OUT, out);
  if (out.endsWith('.png')) return img.png().toFile(p);
  if (out.endsWith('.jpg')) return img.jpeg({ quality: 86 }).toFile(p);
  return img.webp({ quality: 84 }).toFile(p);
};

/* ========================================================================= */
/* HERO — flacone in piedi, fondo nero, luce dall'alto (proporz. 1120x1480)  */
/* ========================================================================= */
function hero() {
  const w = 1120, h = 1480, cx = w / 2;
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <radialGradient id="spot" cx="50%" cy="8%" r="75%">
      <stop offset="0%"  stop-color="#4a3a30" stop-opacity="0.9"/>
      <stop offset="34%" stop-color="#241c1b" stop-opacity="0.65"/>
      <stop offset="100%" stop-color="${C.dark}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="beam" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.16"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="glass" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"  stop-color="#f8d2e0"/>
      <stop offset="42%" stop-color="#e79ec0"/>
      <stop offset="100%" stop-color="#bf567f"/>
    </linearGradient>
    <linearGradient id="goldg" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%"  stop-color="#8a6a3c"/>
      <stop offset="28%" stop-color="${C.goldLight}"/>
      <stop offset="55%" stop-color="#f2e2c2"/>
      <stop offset="78%" stop-color="${C.gold}"/>
      <stop offset="100%" stop-color="#7d5f36"/>
    </linearGradient>
    <radialGradient id="floor" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#c79a6a" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#c79a6a" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="${w}" height="${h}" fill="${C.dark}"/>
  <rect width="${w}" height="${h}" fill="url(#spot)"/>
  <polygon points="${cx - 70},0 ${cx + 70},0 ${cx + 230},900 ${cx - 230},900" fill="url(#beam)"/>

  <!-- riflesso a terra -->
  <ellipse cx="${cx}" cy="1240" rx="210" ry="34" fill="url(#floor)"/>

  <!-- corpo in vetro -->
  <rect x="${cx - 118}" y="600" width="236" height="628" rx="30" fill="url(#glass)"/>
  <rect x="${cx - 104}" y="618" width="30" height="590" rx="15" fill="#ffffff" opacity="0.20"/>
  <rect x="${cx + 66}" y="640" width="14" height="540" rx="7" fill="#7d3f5e" opacity="0.28"/>

  <!-- collare oro -->
  <rect x="${cx - 92}" y="516" width="184" height="96" rx="14" fill="url(#goldg)"/>
  <rect x="${cx - 92}" y="516" width="184" height="14" rx="7" fill="#fff" opacity="0.28"/>
  <rect x="${cx - 92}" y="596" width="184" height="12" rx="6" fill="#5f4526" opacity="0.5"/>

  <!-- pipetta / cappuccio -->
  <rect x="${cx - 48}" y="250" width="96" height="286" rx="46" fill="url(#goldg)"/>
  <ellipse cx="${cx}" cy="250" rx="56" ry="70" fill="url(#goldg)"/>
  <circle cx="${cx}" cy="188" r="13" fill="${C.goldLight}"/>
  <rect x="${cx - 30}" y="272" width="14" height="228" rx="7" fill="#fff" opacity="0.35"/>

  <!-- wordmark sul flacone -->
  <text x="${cx}" y="928" text-anchor="middle" font-family="${SERIF}" font-weight="bold"
        font-size="42" letter-spacing="9" fill="#fdeef4">PLUMPY</text>
  <line x1="${cx - 34}" y1="948" x2="${cx + 34}" y2="948" stroke="#f2d9e4" stroke-width="1.2" opacity="0.7"/>
  <text x="${cx}" y="984" text-anchor="middle" font-family="${SANS}"
        font-size="15" letter-spacing="4" fill="#f0d3e0" opacity="0.9">LIP PLUMPING PEPTIDE SERUM</text>

  ${chip(w, h)}
</svg>`;
  return render(svg, 'hero.webp');
}

/* ========================================================================= */
/* PRIMA / DOPO — due metà 4:5 allineate (1000x1250)                          */
/* ========================================================================= */
function lipsPanel(state) {
  const w = 1000, h = 1250, cx = w / 2, cy = 760;
  const after = state === 'after';
  // fullezza e gloss differenziano prima/dopo, stessa composizione
  const fy = after ? 1.16 : 0.9;             // scala verticale labbra
  const lip = after ? '#d47a97' : '#c98d92'; // dopo più saturo, prima più spento
  const lipDeep = after ? '#b45877' : '#b07f82';
  const gloss = after ? 0.5 : 0.14;
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="skin" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#eed6c7"/>
      <stop offset="100%" stop-color="#dcb7a1"/>
    </linearGradient>
    <radialGradient id="soft" cx="50%" cy="60%" r="60%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.28"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="lip" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${lipDeep}"/>
      <stop offset="45%" stop-color="${lip}"/>
      <stop offset="100%" stop-color="${lipDeep}"/>
    </linearGradient>
  </defs>

  <rect width="${w}" height="${h}" fill="url(#skin)"/>
  <rect width="${w}" height="${h}" fill="url(#soft)"/>

  <!-- accenno narici in alto per ricreare il crop del volto -->
  <ellipse cx="${cx - 58}" cy="300" rx="26" ry="18" fill="#c69c86" opacity="0.5"/>
  <ellipse cx="${cx + 58}" cy="300" rx="26" ry="18" fill="#c69c86" opacity="0.5"/>
  <path d="M ${cx - 120} 420 Q ${cx} 470 ${cx + 120} 420" stroke="#c69c86" stroke-width="3"
        fill="none" opacity="0.35"/>

  <!-- labbra -->
  <g transform="translate(${cx} ${cy}) scale(1 ${fy}) translate(${-cx} ${-cy})">
    <path d="M ${cx - 210} ${cy - 8}
             Q ${cx - 120} ${cy - 78} ${cx - 40} ${cy - 40}
             Q ${cx} ${cy - 66} ${cx + 40} ${cy - 40}
             Q ${cx + 120} ${cy - 78} ${cx + 210} ${cy - 8}
             Q ${cx + 120} ${cy + 96} ${cx} ${cy + 104}
             Q ${cx - 120} ${cy + 96} ${cx - 210} ${cy - 8} Z"
          fill="url(#lip)"/>
    <path d="M ${cx - 200} ${cy - 6} Q ${cx} ${cy + 22} ${cx + 200} ${cy - 6}"
          stroke="#8f5064" stroke-width="4" fill="none" opacity="0.55"/>
    <!-- gloss -->
    <ellipse cx="${cx - 40}" cy="${cy + 46}" rx="120" ry="26" fill="#ffffff" opacity="${gloss}"/>
    <ellipse cx="${cx + 90}" cy="${cy - 22}" rx="34" ry="10" fill="#ffffff" opacity="${gloss * 0.8}"/>
  </g>

  ${chip(w, h)}
</svg>`;
  return render(svg, `${state}.webp`);
}

/* ========================================================================= */
/* TEXTURE — swatch del siero, 1:1 (1200x1200)                                */
/* ========================================================================= */
function texture() {
  const w = 1200, h = 1200;
  // sparkles deterministici
  let sp = '';
  const rnd = (s => () => (s = (s * 9301 + 49297) % 233280) / 233280)(7);
  for (let i = 0; i < 46; i++) {
    const a = rnd() * Math.PI * 2, r = 60 + rnd() * 300;
    const x = 540 + Math.cos(a) * r, y = 600 + Math.sin(a) * r * 0.8;
    const rad = 1.4 + rnd() * 3.2, op = 0.35 + rnd() * 0.5;
    sp += `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${rad.toFixed(1)}" fill="#ffffff" opacity="${op.toFixed(2)}"/>`;
  }
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="skin2" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#f0ddd0"/>
      <stop offset="100%" stop-color="#e3c4b2"/>
    </linearGradient>
    <radialGradient id="light" cx="45%" cy="45%" r="60%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="gel" cx="42%" cy="40%" r="70%">
      <stop offset="0%" stop-color="#f9dcea"/>
      <stop offset="55%" stop-color="#eaadca"/>
      <stop offset="100%" stop-color="#d67ea4"/>
    </radialGradient>
    <linearGradient id="tip" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#e9e9ee"/>
      <stop offset="50%" stop-color="#b9b9c2"/>
      <stop offset="100%" stop-color="#8f8f99"/>
    </linearGradient>
  </defs>

  <rect width="${w}" height="${h}" fill="url(#skin2)"/>
  <rect width="${w}" height="${h}" fill="url(#light)"/>

  <!-- goccia di siero organica -->
  <path d="M 360 560
           C 300 440 470 360 560 420
           C 650 350 820 420 800 540
           C 900 580 880 720 760 740
           C 740 850 560 860 500 780
           C 380 800 300 680 360 560 Z"
        fill="url(#gel)"/>
  <ellipse cx="520" cy="520" rx="150" ry="70" fill="#ffffff" opacity="0.30"/>
  <ellipse cx="690" cy="640" rx="70" ry="34" fill="#ffffff" opacity="0.22"/>
  ${sp}

  <!-- applicatore in metallo (in alto a destra) -->
  <g transform="rotate(28 980 300)">
    <rect x="930" y="150" width="70" height="240" rx="35" fill="url(#tip)"/>
    <ellipse cx="965" cy="150" rx="35" ry="30" fill="url(#tip)"/>
    <ellipse cx="965" cy="150" rx="13" ry="11" fill="#d67ea4" opacity="0.85"/>
    <rect x="950" y="175" width="10" height="180" rx="5" fill="#ffffff" opacity="0.5"/>
  </g>

  ${chip(w, h)}
</svg>`;
  return render(svg, 'texture.webp');
}

/* ========================================================================= */
/* OG IMAGE — 1200x630 (social)                                               */
/* ========================================================================= */
function og() {
  const w = 1200, h = 630, cx = 920;
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <radialGradient id="ospot" cx="78%" cy="20%" r="70%">
      <stop offset="0%" stop-color="#3a2c25" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="${C.dark}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="oglass" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#f6cede"/>
      <stop offset="100%" stop-color="#bf567f"/>
    </linearGradient>
    <linearGradient id="ogold" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#8a6a3c"/><stop offset="50%" stop-color="#f2e2c2"/>
      <stop offset="100%" stop-color="#7d5f36"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="${C.dark}"/>
  <rect width="${w}" height="${h}" fill="url(#ospot)"/>

  <text x="90" y="250" font-family="${SERIF}" font-weight="bold" font-size="88"
        letter-spacing="10" fill="#f6efe6">PLUMPY</text>
  <text x="94" y="300" font-family="${SANS}" font-size="22" letter-spacing="5"
        fill="${C.goldLight}">SIERO RIMPOLPANTE LABBRA</text>
  <text x="90" y="392" font-family="${SERIF}" font-size="40" fill="#ffffff">Più piene,
    <tspan font-style="italic" fill="${C.blush}">naturalmente.</tspan></text>
  <text x="94" y="452" font-family="${SANS}" font-size="20" letter-spacing="2"
        fill="#c9bdb2">Con peptidi GHK-Cu e Acido Ialuronico</text>

  <!-- mini flacone -->
  <rect x="${cx - 46}" y="300" width="92" height="230" rx="20" fill="url(#oglass)"/>
  <rect x="${cx - 60}" y="250" width="120" height="60" rx="10" fill="url(#ogold)"/>
  <rect x="${cx - 28}" y="140" width="56" height="120" rx="28" fill="url(#ogold)"/>
  <ellipse cx="${cx}" cy="140" rx="34" ry="42" fill="url(#ogold)"/>
</svg>`;
  return render(svg, 'og.jpg');
}

/* ========================================================================= */
/* FAVICON / touch icon                                                       */
/* ========================================================================= */
function favicon() {
  const mono = (s) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 64 64">
  <defs>
    <linearGradient id="fg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${C.goldLight}"/><stop offset="100%" stop-color="${C.gold}"/>
    </linearGradient>
  </defs>
  <rect width="64" height="64" rx="14" fill="${C.dark}"/>
  <text x="32" y="45" text-anchor="middle" font-family="${SERIF}" font-weight="bold"
        font-size="42" fill="url(#fg)">P</text>
</svg>`;
  const svg = mono(64);
  // favicon SVG file
  return Promise.all([
    sharp(Buffer.from(svg)).png().resize(32, 32).toFile(join(OUT, 'favicon.png')),
    sharp(Buffer.from(svg)).png().resize(180, 180).toFile(join(OUT, 'apple-touch-icon.png')),
    (async () => {
      const { writeFileSync } = await import('node:fs');
      writeFileSync(join(OUT, 'favicon.svg'), svg.trim());
    })(),
  ]);
}

/* ========================================================================= */
await Promise.all([hero(), lipsPanel('before'), lipsPanel('after'), texture(), og(), favicon()]);
console.log('✓ Placeholder generati in ./assets:');
console.log('  hero.webp · before.webp · after.webp · texture.webp · og.jpg · favicon.*');
console.log('  Sostituiscili con le foto reali:  npm run assets  (dopo aver messo i file in ./input)');
