import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'ar'],
  defaultLocale: 'en',
  localePrefix: 'always',
  // /ar is not translated yet: don't auto-send Arabic browsers there, and don't
  // emit next-intl's Link-header hreflang (the <head> tags are the one source).
  localeDetection: false,
  alternateLinks: false,
});
