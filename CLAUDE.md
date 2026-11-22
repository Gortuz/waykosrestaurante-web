# Wayko's Restaurante Rural — memoria del proyecto

Sitio web de Wayko's, restaurante rural en La Esperanza, Ibarra (Imbabura, Ecuador), con granja propia. Bilingüe ES (por defecto) / EN. Los textos de la interfaz y los commits van en español.

## El restaurante (contexto de marca, dado por el usuario)

**Wayko's es un restaurante rural:** comida de calidad en un lugar de desconexión, donde el entorno natural es protagonista.

**Origen y propuesta:** nace del deseo de ofrecer una gastronomía diferente y variada en el sector, con énfasis en la calidad de los procesos y un balance entre salud y buen sabor.

**La granja es parte del restaurante** (mismo terreno). Se crían borregos, gallinas y cuyes, y en temporada se cosecha de una huerta. Es una granja integral, donde todo cumple un ciclo: el abono vuelve a la tierra, la tierra da el pasto, el pasto alimenta a los borregos, y lo que se cría y cosecha llega a la cocina. Es su forma de respetar la naturaleza.
- No se usan productos químicos en la granja; se busca acercarse lo más posible a lo orgánico. **No usar "orgánico"** (en Ecuador requiere certificación de Agrocalidad): decir "sin químicos". No prometer absolutos como "eliminar desperdicios"; usar "aprovechar al máximo cada recurso".
- Borregos: **cruces de Dorper y Poll Dorset**, criados **estabulados** (en establo). No decir "de pastoreo" ni "pasture-raised".
- Gallinas: **en libertad**.
- Además compran **productos locales y de temporada**, que dan variedad a las ensaladas.

**Nunca mencionar:** bambú, carbón, leña (ni brasa, fuego, "charcoal", "wood-fired", "open fire").

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
- **Hero:** 3 fotos (escritorio: techo con arcoíris, cordero, potrero con arcoíris; móvil: arcoíris vertical, bolones, casa de madera). Sin animales bajo el lema ni fotos con cucharas o personas sosteniendo platos (decisión del usuario): las fotos con personas van en Equipo. Se alternan con fundido cada 7 s (horizontal en escritorio, vertical en móvil, vía `<picture>`), con botón de pausa; con "reducir movimiento" se queda fija. Foto y franja comparten la primera pantalla (`100svh`).
- Navegación de escritorio desde `lg`; debajo, menú hamburguesa. Orden: primero las secciones de la portada (anclas: Menú, Reservas, Equipo, Cómo llegar) y al final, separada por una línea, "La granja" (otra página). No mezclar enlaces que salen de la página entre los que hacen scroll.

## Fotos

Originales en `waykos-design/fotos-<lote>/`, salida en `src/assets/fotos/<nombre>.webp` (máx. 3200 px, WebP q90 casi sin pérdida). Astro genera los tamaños responsivos en el build con `quality={85}`; **todo `<Image>`/`getImage` debe llevar `quality={85}`** y anchos suficientes para pantallas 2K y retina (iPhone 3x: ~1290 px a todo el ancho).

Tres lotes con estilos distintos, unificados con una corrección por lote (`GRADES` en `scripts/photos.mjs`). La v1 (negros levantados, saturación muy baja) se veía apagada y de baja calidad; el usuario pidió fotos **más vivas**. v2 actual:
- `gael` — granja (borregos, gallinas, construcciones); todas verticales, subexpuestas → más brillo, contraste y color.
- `makilema` — platos y equipo; muy saturadas → solo saturación 0.86, sin tocar el contraste.
- `propias` — paisajes de celular (incluye HEIC; se convierten con `sips`) → saturación 0.92, un poco de contraste.
- Regla: no levantar los negros con offsets positivos en `linear`; lava la foto.

**Agregar o cambiar una foto:** añadir/editar una línea en `PHOTOS` (`[lote, archivo original, nombre de salida]`), ejecutar `pnpm photos` (o `pnpm photos <filtro>`), e importar `../assets/fotos/<nombre>.webp` en el componente. **Orden importante:** generar la foto antes de importarla; si `pnpm dev` está corriendo y ve el import primero, guarda un error `ImageNotFound` en caché (se arregla reiniciando el servidor o borrando `node_modules/.vite`). Para revisar muchas fotos, generar hojas de contacto con miniaturas numeradas antes de elegir.

La granja muestra solo animales y potrero; las construcciones de madera y el patio (si27, si32) son del restaurante y no van en la granja. No se usa bambú: describir el lugar como rústico.

Fotos descartadas a propósito: Makilema en mesa blanca sobre fondo negro (#7–#21, look de estudio), especias en penumbra; Gael con comederos de plástico azul (si14, si15).

## Tono de los textos

- Directo y breve: frases cortas, sin explicar de más.
- Granja: un solo bloque (título "Conoce nuestra granja" → fotos → tres pilares: Granja, Agricultura circular, Huerta), sin separar por animal. Sin números (no son una secuencia). Equipo: título, foto ancha del equipo y tres verticales con personas (misma composición que la granja).
- **Nunca relacionar a los animales con la mesa o el plato** (nada que aluda al sacrificio): ni "de la granja a la parrilla", ni "lo que criamos llega a la cocina", ni "prueba lo que criamos", ni "razas de carne", tampoco en meta descripciones. El ciclo de la granja termina en "el pasto alimenta a los borregos". "De la huerta a la mesa" sí se podrá usar cuando haya fotos de la huerta. El cierre de la página de la granja lleva al mapa, no a reservar.
- **Registro serio y directo:** frases cortas y afirmativas, una idea por frase, hechos en vez de adjetivos, sin conectores de relleno ("además", "todo", "es decir"), sin exclamaciones ni "experiencia única". Hablarle al cliente, no describir procesos como en una presentación.
- **Lema:** "Una manera diferente de comer rico" (frase de un cliente; usarla tal cual, es el título del hero). Es la única frase con tono de eslogan.
- El detalle técnico (razas, establo) va como pie de foto que aparece al pasar el cursor o tocar, no en el texto principal.

## Contenido y datos del negocio

- Horario: viernes, sábados, domingos y feriados, 11:00–18:00 (`OPENING_HOURS` en `site.ts`; reservas hasta las 17:00).
- WhatsApp: +593 96 914 3757. Reservas por formulario → mensaje de WhatsApp en el idioma de la página.
- Granja: en el mismo terreno del restaurante, sin nombre propio (logo de Wayko's con "Granja"/"Farm" debajo). Detalles en "El restaurante" arriba. Aún no hay fotos de cuyes ni de la huerta.
- 8 años de aniversario (noviembre 2026, carta de aniversario).

**Actualizar la carta:** reemplazar `public/menu.pdf`; si cambian precios o platos de especialidades, actualizar `src/components/Specialties.astro` (precios) y `specialties.item*` en `translations.ts`.

## Pendientes

- Confirmar la dirección exacta (hoy: "Vía principal a La Esperanza, Ibarra, Imbabura", aproximada) y la calificación "★ 4.9" (hoy no se muestra).
- Textos definitivos del usuario: historia de los 8 años, políticas (niños, descorche, formas de pago), eventos privados.
- Faltan fotos de personas trabajando en la granja.
- `.vscode/mcp.json` sin decidir si se versiona.
