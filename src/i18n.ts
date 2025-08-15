import zh from './locales/zh.json';
import en from './locales/en.json';
import type { GetStaticPaths } from 'astro';

export type Translations = typeof zh;

export const locales = ['zh', 'en'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'zh';

export function getLocaleFromUrl(url: string): Locale {
  const locale = url.split('/')[1] as Locale;
  return locales.includes(locale) ? locale : defaultLocale;
}

export function getCurrentLocale(params: { locale?: Locale }): Locale {
  return params.locale ?? defaultLocale;
}

export function getTranslations(locale: Locale): Translations {
  return translations[locale];
}

export const getLocaleStaticPaths = function getLocalePaths() {
  return [undefined, ...locales].map((locale) => ({
    params: { locale },
  }));
} satisfies GetStaticPaths;

export function getRelativeLocaleUrl(locale: Locale, url: string): string {
  return `/${locale}${url}`;
}

const translations: Record<Locale, Translations> = {
  zh,
  en,
};
