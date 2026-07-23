# Cartella `input/` — le 3 foto ufficiali

Metti qui le **3 foto ufficiali** con questi nomi esatti, poi lancia
`npm run assets` per generare i ritagli in `../assets` (sostituiscono i
placeholder mantenendo gli stessi nomi file: l'HTML non va toccato).

| File richiesto           | Cos'è                                                        |
|--------------------------|-------------------------------------------------------------|
| `hero.jpg`               | Flacone PLUMPY in piedi, fondo nero, luce dall'alto         |
| `before-after.jpg`       | Labbra PRIMA/DOPO affiancate (con la fascia scritte in basso)|
| `texture.jpg`            | Swatch del siero sulla mano                                 |

Sono accettate anche estensioni `.jpeg`, `.png`, `.webp`.

Lo script `tools/prepare-assets.mjs`:
- **hero** → convertito/ridimensionato, senza tagliare il flacone;
- **before-after** → diviso in due (`before` = metà sinistra, `after` = metà
  destra), **rimuovendo la fascia inferiore con le scritte** (PRIMA/DOPO/
  PEPTIDE EFFECT). Le etichette le disegna la pagina;
- **texture** → ritaglio quadrato 1:1.

Se un ritaglio non è perfetto, ritocca le costanti in alto a
`tools/prepare-assets.mjs` (es. `labelBandFrac`) e rilancia `npm run assets`.
