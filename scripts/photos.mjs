// Procesa las fotos originales de waykos-design/ hacia src/assets/fotos/
//
// Uso:  pnpm photos            (procesa todas)
//       pnpm photos granja     (solo las que contienen "granja" en el nombre de salida)
//
// Cada lote tiene su propia corrección de color para que las tres fuentes
// (Gael, Makilema y fotos propias de celular) se vean como una misma serie:
// un look documental y cálido. Para agregar una foto, añade una línea a PHOTOS.

import sharp from 'sharp';
import { execFileSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, extname } from 'node:path';

const SOURCE_DIR = 'waykos-design';
const OUT_DIR = 'src/assets/fotos';
const MAX_SIZE = 2400;
const QUALITY = 80;

// Corrección por lote (aprobada en noviembre 2026)
const GRADES = {
  // Gael: subexpuestas y apagadas -> más luz y un toque cálido
  gael: (img) => img.linear([1.22, 1.18, 1.12], [6, 6, 4]).modulate({ saturation: 1.05 }),
  // Makilema: muy saturadas y con negros aplastados -> menos color, negros levantados
  makilema: (img) => img.modulate({ saturation: 0.72 }).linear([0.92, 0.9, 0.88], [16, 14, 12]),
  // Propias (celular, HDR): cielos y verdes intensos -> más contenidas
  propias: (img) => img.modulate({ saturation: 0.78 }).linear([0.95, 0.94, 0.9], [8, 8, 8]),
};

// [lote, archivo original (dentro de waykos-design/fotos-<lote>), nombre de salida]
const PHOTOS = [
  // Platos y equipo (Makilema)
  ['makilema', 'cordero-3.jpg', 'plato-cordero'],
  ['makilema', 'bolones-3.jpg', 'plato-maduro-queso'],
  ['makilema', 'lasaña-1.jpg', 'plato-lasana'],
  ['makilema', 'pizza-1.jpg', 'plato-pizza'],
  ['makilema', 'equipo.jpg', 'equipo'],

  // Hero: escritorio (horizontal) y móvil (vertical)
  ['propias', 'IMG_20201211_160451.JPG', 'hero-techo-arcoiris'],
  ['makilema', '_1399725.jpg', 'hero-mesera'],
  ['makilema', '_1399901.jpg', 'hero-chimichurri'],
  ['gael', 'si3.JPG', 'hero-borrego-negro'],
  ['makilema', 'cordero-1.jpg', 'hero-cordero'],
  ['makilema', '_1399726.jpg', 'hero-plato-campo'],
  ['propias', 'IMG_20190812_174210 2.JPG', 'hero-potrero-arcoiris'],
  ['propias', 'IMG_20190812_174158.JPG', 'hero-arcoiris-vertical'],

  // Granja (Gael + propias)
  ['propias', 'IMG_0109.HEIC', 'granja-potrero'],
  ['propias', 'IMG_0116.HEIC', 'granja-arbol'],
  ['gael', 'si11.JPG', 'granja-borrego-negro'],
  ['gael', 'si12.JPG', 'granja-rebano'],
  ['gael', 'si7.JPG', 'granja-corral'],
  ['gael', 'si23.JPG', 'granja-borrego-blanco'],
  ['gael', 'si22.JPG', 'granja-gallo'],
  ['gael', 'si25.JPG', 'granja-gallo-2'],
  ['gael', 'si27.JPG', 'granja-casa-madera'],
  ['gael', 'si32.JPG', 'granja-patio'],
];

const filter = process.argv[2];
mkdirSync(OUT_DIR, { recursive: true });
let tmp;

for (const [batch, file, name] of PHOTOS) {
  if (filter && !name.includes(filter)) continue;
  let input = join(SOURCE_DIR, `fotos-${batch}`, file);
  if (!existsSync(input)) {
    console.warn(`✗ No existe: ${input}`);
    continue;
  }
  // sharp no lee HEIC: se convierte primero con sips (macOS)
  if (extname(input).toLowerCase() === '.heic') {
    tmp ??= mkdtempSync(join(tmpdir(), 'waykos-'));
    const jpg = join(tmp, `${name}.jpg`);
    execFileSync('sips', ['-s', 'format', 'jpeg', input, '--out', jpg], { stdio: 'ignore' });
    input = jpg;
  }
  const out = join(OUT_DIR, `${name}.webp`);
  const base = sharp(input)
    .rotate() // respeta la orientación EXIF
    .resize({ width: MAX_SIZE, height: MAX_SIZE, fit: 'inside', withoutEnlargement: true });
  const info = await GRADES[batch](base).webp({ quality: QUALITY }).toFile(out);
  console.log(`✓ ${out}  ${info.width}x${info.height}  ${Math.round(info.size / 1024)} KB  (${batch}: ${file})`);
}
