<p align="center">
  <img src="public/waykos.svg" alt="Wayko's Restaurante Rural" width="280">
</p>

<h1 align="center">Wayko's Restaurante Rural</h1>

<p align="center">
  <strong>Sitio web oficial de Wayko's Restaurante Rural</strong><br>
  Sabores a la leña, corderos de granja y tradición culinaria en San Antonio de Ibarra, Ecuador.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Astro-5.x-BC52EE?style=flat-square&logo=astro&logoColor=white" alt="Astro">
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/TypeScript-Ready-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Cloudflare_Pages-Ready-F38020?style=flat-square&logo=cloudflare&logoColor=white" alt="Cloudflare Pages">
  <img src="https://img.shields.io/badge/i18n-ES%20%7C%20EN-90050E?style=flat-square" alt="i18n ES / EN">
</p>

<p align="center">
  <a href="#-características">Características</a> •
  <a href="#-stack-tecnológico">Stack Tecnológico</a> •
  <a href="#-estructura-del-proyecto">Estructura</a> •
  <a href="#-desarrollo-local">Desarrollo Local</a> •
  <a href="#-despliegue-en-cloudflare-pages">Despliegue</a> •
  <a href="#-contacto-y-redes">Contacto</a>
</p>

---

## 🌟 Características

- **Diseño Gastronómico de Alta Fidelidad**: Desarrollado a partir de los diseños oficiales en Figma con estética rústica elegante, tipografías *Playfair Display* y *Montserrat*, y contrastes cromáticos de marca (`#90050e`, `#e5a93c`).
- **Modo Oscuro / Claro Completo**: Toggle interactivo con persistencia en `localStorage` y script anti-parpadeo (*anti-FOUC*) integrado en el layout principal.
- **Internacionalización Nativa (i18n)**:
  - Ruta en Español por defecto: `/`
  - Ruta en Inglés localizada: `/en`
  - Selector de idioma en el header con preservación de la posición exacta de scroll.
- **Secciones de la Experiencia**:
  - **Hero**: Fotografía principal inmersiva a pantalla completa con overlays atmosféricos y llamadas a la acción.
  - **Especialidades de la Casa**: Tarjetas interactivas de cordero al grill, maduro con queso, lasaña artesanal y pizzas al horno de leña, sobre la marca de agua del isotipo andino.
  - **Carta & Menú PDF Sincronizado**: Modal interactivo de platos categorizados (*Entradas*, *Principales*, *Pizzas*, *Bebidas*) y enlace directo a `/menu.pdf`, respaldado por una función edge de Cloudflare Pages conectada a Google Drive con respaldo estático.
  - **Reservas Directas por WhatsApp**: Formulario instantáneo optimizado para dispositivos Apple (iOS / Safari) con selección compacta de comensales (1, 2, 3, 4, 8+) que genera el mensaje estructurado para WhatsApp Business.
  - **Nuestro Equipo**: Homenaje visual y narrativo al equipo de parrilla y horno de leña.
  - **Nosotros & Ubicación**: Concepto de restaurante de campo, tarjetas de servicios y mapa embebido de Google Maps con accesos directos a rutas en **Google Maps** y **Waze**.
  - **Footer Minimalista**: Logotipo, eslogan, ubicación y accesos circulares interactivos a redes sociales oficiales.
- **Optimización de Assets con Sharp**: Fotografías del restaurante organizadas en `src/assets/restaurante/`, convertidas a formato moderno **WebP** de alta resolución, reduciendo el peso en más del 87% sin pérdida de nitidez.

---

## 🛠️ Stack Tecnológico

| Herramienta | Propósito |
| :--- | :--- |
| [**Astro**](https://astro.build/) | Framework web orientado a contenido, generación estática (SSG) y cero JavaScript innecesario. |
| [**Tailwind CSS v4**](https://tailwindcss.com/) | Motor de estilos utilitarios de última generación con variables CSS y tema oscuro. |
| [**Sharp**](https://sharp.pixelplumbing.com/) | Optimización y conversión de imágenes de cámara a WebP responsivo. |
| [**Cloudflare Pages**](https://pages.cloudflare.com/) | Plataforma de alojamiento perimetral estático ultrarrápido con soporte para Edge Functions (`functions/`). |
| [**TypeScript**](https://www.typescriptlang.org/) | Tipado estático para la configuración i18n y datos del menú gastronómico. |

---

## 📂 Estructura del Proyecto

```text
waykosrestaurante-web/
├── functions/                     # Cloudflare Pages Functions (Edge)
│   └── menu.pdf.ts                # Proxy y caché perimetral del PDF de Google Drive
├── public/                        # Archivos estáticos públicos
│   ├── _headers                   # Cabeceras HTTP de caché inmutable y seguridad
│   ├── apple-touch-icon.png       # Icono para dispositivos Apple
│   ├── favicon.ico / favicon.svg  # Favicons de la marca
│   ├── menu.pdf                   # Respaldo estático de la carta
│   └── waykos.svg                 # Isotipo y logotipo oficial
├── src/
│   ├── assets/
│   │   └── restaurante/           # Fotografías en formato WebP optimizado
│   ├── components/                # Componentes modulares Astro
│   │   ├── About.astro            # Sección Nosotros y Mapa interactivo
│   │   ├── Footer.astro           # Pie de página y redes sociales
│   │   ├── Hero.astro             # Portada principal
│   │   ├── LanguagePicker.astro   # Selector de idioma ES / EN
│   │   ├── MenuModal.astro        # Modal interactivo de la carta completa
│   │   ├── Navbar.astro           # Barra de navegación responsive
│   │   ├── Reservation.astro      # Formulario de reservas a WhatsApp
│   │   ├── Specialties.astro      # Tarjetas de especialidades
│   │   ├── Team.astro             # Sección Nuestro Equipo
│   │   ├── ThemeToggle.astro      # Conmutador de modo claro / oscuro
│   │   └── WaykosLogo.astro       # Logo vectorial responsivo
│   ├── data/
│   │   └── menu.ts                # Carta completa bilingüe (precios y descripciones)
│   ├── i18n/
│   │   ├── translations.ts        # Diccionario de textos (ES / EN)
│   │   └── utils.ts               # Helpers de traducción y localización
│   ├── layouts/
│   │   └── Layout.astro           # Estructura HTML base, SEO y anti-FOUC
│   ├── pages/
│   │   ├── index.astro            # Página principal en Español (/)
│   │   └── en/
│   │       └── index.astro        # Página principal en Inglés (/en)
│   └── styles/
│       └── global.css             # Configuración Tailwind v4 y normalización iOS
├── astro.config.mjs               # Configuración de Astro e internacionalización
├── package.json                   # Dependencias y scripts del proyecto
└── tsconfig.json                  # Configuración TypeScript
```

---

## 🚀 Desarrollo Local

### Prerrequisitos
- **Node.js** v20 o superior
- Gestor de paquetes **pnpm** (recomendado) o **npm**

### Instalación y Ejecución

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/Gortuz/waykosrestaurante-web.git
   cd waykosrestaurante-web
   ```

2. **Instalar dependencias**:
   ```bash
   pnpm install
   # o bien: npm install
   ```

3. **Iniciar el servidor de desarrollo**:
   ```bash
   pnpm dev
   # o bien: npm run dev
   ```
   Abre [http://localhost:4321](http://localhost:4321) en tu navegador para ver el resultado.

4. **Compilar para producción**:
   ```bash
   pnpm build
   # o bien: npm run build
   ```

5. **Previsualizar la compilación de producción**:
   ```bash
   pnpm preview
   # o bien: npm run preview
   ```

---

## ☁️ Despliegue en Cloudflare Pages

El proyecto está diseñado para desplegarse de manera automática mediante Git en **Cloudflare Pages**:

- **Framework preset**: `Astro`
- **Build command**: `npm run build` o `pnpm build`
- **Build output directory**: `dist`
- **Root directory**: `/`
- **Funciones Edge**: Detectadas automáticamente en la carpeta `functions/`.
- **Cabeceras de Caché**: Definidas en `public/_headers` (1 año de caché inmutable para assets en `/_astro/*`).

---

## 📱 Contacto y Redes

- **Ubicación**: La Esperanza, San Antonio de Ibarra, Imbabura, Ecuador
- **WhatsApp Reservas**: [+593 96 914 3757](https://wa.me/593969143757)
- **Instagram**: [@waykosrestaurante](https://www.instagram.com/waykosrestaurante/)
- **Facebook**: [@waykosrestaurante](https://www.facebook.com/waykosrestaurante)

---

<p align="center">
  <sub>Desarrollado con dedicación para <strong>Wayko's Restaurante Rural</strong>. Todos los derechos reservados © 2026.</sub>
</p>
