import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  // Supported locales
  locales: ['en', 'pt', 'es', 'id'],

  // Default locale
  defaultLocale: 'en',

  // URL prefix strategy: no prefix for default locale
  localePrefix: 'as-needed',

  // Enable automatic locale detection
  localeDetection: true,
})

// Export locale type
export type Locale = (typeof routing.locales)[number]
