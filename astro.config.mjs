// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://waykosrestaurante.com',
  output: 'static',
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'es',
        locales: { es: 'es-EC', en: 'en-US' },
      },
    }),
  ],
  vite: {
    // @ts-ignore
    plugins: [tailwindcss()],
  },
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Montserrat',
      cssVariable: '--font-montserrat',
      weights: ['300 700'],
      styles: ['normal'],
      fallbacks: ['sans-serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'Playfair Display',
      cssVariable: '--font-playfair',
      weights: ['500 700'],
      styles: ['normal'],
      fallbacks: ['serif'],
    },
  ],
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  devToolbar: {
    enabled: false,
  },
});
