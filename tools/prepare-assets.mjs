/**
 * prepare-assets.mjs
 * ---------------------------------------------------------------------------
 * Genera i RITAGLI reali in ./assets a partire dalle 3 foto ufficiali in ./input.
 * Sovrascrive i placeholder mantenendo gli stessi nomi file: la pagina non
 * va toccata.
 *
 *   input/hero.jpg          -> assets/hero.webp      (flacone, passa "as-is")
 *   input/before-after.jpg  -> assets/before.webp + assets/after.webp
 *                              (divide a metà 4:5, rimuove la fascia scritte in basso)
 *   input/texture.jpg       -> assets/texture.webp   (crop quadrato 1:1)
 *
 * Uso:  npm run assets
 *
 * Se un ritaglio non è perfetto, ritocca le COSTANTI qui sotto e rilancia.
 * ---------------------------------------------------------------------------
 */
import sharp from 'sharp';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const IN = join(ROOT, 'input');
const OUT = join(ROOT, 'assets');

/* ====== COSTANTI DA RITOCCARE SE SERVE ==================================== */
const CFG = {
  // Frazione della foto PRIMA/DOPO occupata in basso dalla fascia con le
  // scritte stampate (PRIMA / DOPO / PEPTIDE EFFECT). Va rimossa: la pagina
  // disegna le proprie etichette. Aumenta se resta un residuo di testo.
  labelBandFrac: 0.15,
  // Quanto togliere dal bordo INTERNO di ogni metà per eliminare la linea
  // divisoria bianca centrale e l'emblema "PEPTIDE EFFECT" (frazione della
  // larghezza di ogni metà).
  dividerTrimFrac: 0.04,
  // Dimensioni di output
  hero:   { w: 1120, h: 1480 },   // il flacone: fit "inside", niente crop
  split:  { w: 1000, h: 1250 },   // 4:5
  texture:{ w: 1200, h: 1200 },   // 1:1
  quality: 86,
};
/* ========================================================================= */

const src = (name) => {
  for (const ext of ['jpg', 'jpeg', 'png', 'webp']) {
    const p = join(IN, `${name}.${ext}`);
    if (existsSync(p)) return p;
  }
  return null;
};
const out = (name) => join(OUT, name);
const ok = [];
const skip = [];

/* ---- HERO: converte e ridimensiona, senza tagliare il flacone ----------- */
async function hero() {
  const p = src('hero');
  if (!p) return skip.push('hero  → manca input/hero.jpg (tengo il placeholder)');
  // "contain" su tela fissa 1120x1480 con fondo scuro = niente crop del flacone,
  // dimensioni sempre coerenti con l'HTML (zero layout shift). Il padding è
  // invisibile: stesso nero della sezione + la mask radiale sfuma i bordi.
  await sharp(p)
    .resize({ width: CFG.hero.w, height: CFG.hero.h, fit: 'contain', background: '#0e0b0d' })
    .webp({ quality: CFG.quality })
    .toFile(out('hero.webp'));
  ok.push('hero.webp');
}

/* ---- PRIMA / DOPO: divide a metà, toglie fascia scritte, cover 4:5 ------- */
async function beforeAfter() {
  const p = src('before-after') || src('before_after') || src('beforeafter');
  if (!p) return skip.push('before/after → manca input/before-after.jpg (tengo i placeholder)');

  const meta = await sharp(p).metadata();
  const W = meta.width, H = meta.height;
  const usableH = Math.round(H * (1 - CFG.labelBandFrac)); // rimuove fascia in basso
  const halfW = Math.floor(W / 2);
  const trim = Math.round(halfW * CFG.dividerTrimFrac);    // via la linea centrale

  // metà sinistra = PRIMA ; toglie il bordo destro (divisoria)
  const leftRegion  = { left: 0,               top: 0, width: halfW - trim, height: usableH };
  // metà destra = DOPO ; toglie il bordo sinistro (divisoria)
  const rightRegion = { left: halfW + trim,    top: 0, width: W - halfW - trim, height: usableH };

  const cropTo45 = async (region, file) => {
    await sharp(p)
      .extract(region)
      .resize({ width: CFG.split.w, height: CFG.split.h, fit: 'cover', position: 'centre' })
      .webp({ quality: CFG.quality })
      .toFile(out(file));
    ok.push(file);
  };
  await cropTo45(leftRegion, 'before.webp');
  await cropTo45(rightRegion, 'after.webp');
}

/* ---- TEXTURE: crop quadrato 1:1 ----------------------------------------- */
async function texture() {
  const p = src('texture');
  if (!p) return skip.push('texture → manca input/texture.jpg (tengo il placeholder)');
  await sharp(p)
    .resize({ width: CFG.texture.w, height: CFG.texture.h, fit: 'cover', position: 'centre' })
    .webp({ quality: CFG.quality })
    .toFile(out('texture.webp'));
  ok.push('texture.webp');
}

/* ------------------------------------------------------------------------- */
if (!existsSync(IN)) {
  console.error('✗ Cartella ./input non trovata. Crea ./input e mettici le 3 foto.');
  process.exit(1);
}
await hero();
await beforeAfter();
await texture();

if (ok.length) console.log('✓ Ritagli reali generati:', ok.join(' · '));
if (skip.length) {
  console.log('\n⚠ Alcuni input mancano — restano i placeholder:');
  skip.forEach((s) => console.log('  ·', s));
  console.log('\n  Metti le foto ufficiali in ./input con questi nomi:');
  console.log('    input/hero.jpg  ·  input/before-after.jpg  ·  input/texture.jpg');
}
if (!ok.length && !skip.length) console.log('Nulla da fare.');
