# Wayko's Restaurante Rural — memoria del proyecto

Sitio web de Wayko's, restaurante rural en La Esperanza, Ibarra (Imbabura, Ecuador). Especialidad: cordero de su propia granja a la parrilla. Bilingüe ES (por defecto) / EN. Los textos de la interfaz y los commits van en español.

## Comandos

```bash
pnpm dev --host   # servidor de desarrollo; --host para verlo desde el celular en la misma WiFi
pnpm check        # astro check (debe dar 0 errores)
pnpm build        # compila a dist/ (sitio 100 % estático)
pnpm photos       # reprocesa las fotos desde waykos-design/ (ver "Fotos")
pnpm run deploy   # build + wrangler deploy
```

Antes de dar un cambio por terminado: `pnpm check` y `pnpm build` sin errores, y revisar en móvil (390 px) y en modo oscuro.

## Ramas y despliegue

- `main` = producción (Cloudflare Workers, static assets, `wrangler.jsonc` publica `./dist`).
- `dev` = trabajo en curso. Los cambios grandes van primero a `dev`.
- El push lo hace el usuario (`! git push`): la clave SSH está en el agente de Bitwarden y no funciona desde la sesión de Claude.

## Estructura

- `src/pages/` — `index.astro` (ES), `en/index.astro`, `granja.astro`, `en/farm.astro`.
- `src/components/` — una sección por componente: `Hero`, `Specialties`, `FarmTeaser`, `Reservation`, `Team`, `About`, `Footer`, `Navbar`, `FarmPage`, etc.
- `src/data/site.ts` — **única fuente** de datos del negocio: URL, WhatsApp, redes, coordenadas, mapa, horario, ruta del PDF.
- `src/i18n/translations.ts` — todos los textos ES/EN. `src/i18n/utils.ts` — `useTranslations` y `routes` (rutas de cada página por idioma, usadas por navegación, hreflang y selector de idioma).
- `src/styles/global.css` — tokens de diseño (Tailwind v4) y estilos globales.
- `scripts/photos.mjs` — procesamiento de fotos.
- `public/menu.pdf` — carta oficial. `public/og-image.jpg` — imagen para redes (1200×630).
- `waykos-design/` — **no está en git** (`.gitignore`): fotos originales, manual de marca (`manualwaykos.pdf`), logos, cartas. Solo existe en la Mac del usuario.

## Sistema de diseño ("editorial andino")

- **Esquinas rectas en todo** (sin `rounded-*`), coherente con el logo. Sin tarjetas con sombra, sin píldoras.
- **Tipografía:** Alegreya (títulos, `font-serif`) y Alegreya Sans (texto, `font-sans`), cargadas con el Fonts API de Astro en `astro.config.mjs`. Nota: el manual de marca usa Montserrat/Gotham como secundarias; se eligió Alegreya para la web.
- **Colores** (`global.css`): `poncho #90050E` (rojo de marca), `carbon #1B1613`, `maiz #E5A93C` (solo franja tejida y foco de teclado). Superficies y texto vía tokens con modo oscuro: `surface`, `surface-alt`, `ink`, `ink-muted`, `rule`, `rule-accent`, `accent`, `accent-hover`, `accent-text`. Usar siempre los tokens, no hex sueltos.
- **Elemento distintivo:** la franja roja con zigzag tejido (`.faja-trim`) bajo el hero, sobre el pie de página y en el cierre de la página de la granja.
- **Platos** con el formato de la carta impresa: nombre y precio sobre una línea roja (`border-rule-accent`).
- **Evitar:** etiquetas en mayúsculas sobre cada título, cifras de relleno, flechas en los botones, animaciones en cada sección. Títulos en mayúscula inicial (sentence case). Botones que dicen exactamente lo que pasa ("Enviar reserva por WhatsApp").
- **Hero:** fotos que se alternan con fundido cada 7 s (horizontal en escritorio, vertical en móvil, vía `<picture>`), con botón de pausa; con "reducir movimiento" se queda fija. Foto y franja comparten la primera pantalla (`100svh`).
- Navegación de escritorio desde `lg`; debajo, menú hamburguesa.

## Fotos

Originales en `waykos-design/fotos-<lote>/`, salida en `src/assets/fotos/<nombre>.webp` (máx. 3200 px, WebP q90 casi sin pérdida). Astro genera los tamaños responsivos en el build con `quality={85}`; **todo `<Image>`/`getImage` debe llevar `quality={85}`** y anchos suficientes para pantallas 2K y retina (iPhone 3x: ~1290 px a todo el ancho).

Tres lotes con estilos distintos, unificados con una corrección por lote (`GRADES` en `scripts/photos.mjs`). La v1 (negros levantados, saturación muy baja) se veía apagada y de baja calidad; el usuario pidió fotos **más vivas**. v2 actual:
- `gael` — granja (borregos, gallinas, construcciones); todas verticales, subexpuestas → más brillo, contraste y color.
- `makilema` — platos y equipo; muy saturadas → solo saturación 0.86, sin tocar el contraste.
- `propias` — paisajes de celular (incluye HEIC; se convierten con `sips`) → saturación 0.92, un poco de contraste.
- Regla: no levantar los negros con offsets positivos en `linear`; lava la foto.

**Agregar o cambiar una foto:** añadir/editar una línea en `PHOTOS` (`[lote, archivo original, nombre de salida]`), ejecutar `pnpm photos` (o `pnpm photos <filtro>`), e importar `../assets/fotos/<nombre>.webp` en el componente. Para revisar muchas fotos, generar hojas de contacto con miniaturas numeradas antes de elegir.

Fotos descartadas a propósito: Makilema en mesa blanca sobre fondo negro (#7–#21, look de estudio), especias en penumbra; Gael con comederos de plástico azul (si14, si15).

## Tono de los textos

- Directo y breve: frases cortas, sin explicar de más.
- **Respeto por los animales:** hablar de la granja como cuidado y crianza ("con cuidado y respeto"). No relacionar a los animales con el plato ni con la parrilla (nada de "de la granja a la parrilla", "prueba lo que criamos", "razas de carne"). El cierre de la página de la granja lleva al mapa, no a reservar.

## Contenido y datos del negocio

- Horario: viernes, sábados, domingos y feriados, 11:00–18:00 (`OPENING_HOURS` en `site.ts`; reservas hasta las 17:00).
- WhatsApp: +593 96 914 3757. Reservas por formulario → mensaje de WhatsApp en el idioma de la página.
- Granja: en el mismo terreno del restaurante, sin nombre propio (logo de Wayko's con "Granja"/"Farm" debajo). Borregos: **cruces de Dorper y Poll Dorset**, criados **estabulados**. Gallinas **en libertad**, también van a la cocina.
- 8 años de aniversario (noviembre 2026, carta de aniversario).

**Actualizar la carta:** reemplazar `public/menu.pdf`; si cambian precios o platos de especialidades, actualizar `src/components/Specialties.astro` (precios) y `specialties.item*` en `translations.ts`.

## Pendientes

- Confirmar la dirección exacta (hoy: "Vía principal a La Esperanza, Ibarra, Imbabura", aproximada) y la calificación "★ 4.9" (hoy no se muestra).
- Textos definitivos del usuario: historia de los 8 años, políticas (niños, descorche, formas de pago), eventos privados.
- Faltan fotos de personas trabajando en la granja.
- `.vscode/mcp.json` sin decidir si se versiona.
