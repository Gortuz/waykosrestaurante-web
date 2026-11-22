import { ui, defaultLang } from './translations';

export type Lang = keyof typeof ui;

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as Lang;
  return defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]): string {
    return ui[lang][key] || ui[defaultLang][key] || key;
  };
}


// Rutas de cada página por idioma (para navegación, hreflang y selector de idioma)
export const routes = {
  home: { es: '/', en: '/en/' },
  farm: { es: '/granja/', en: '/en/farm/' },
} as const;

export type PageKey = keyof typeof routes;
