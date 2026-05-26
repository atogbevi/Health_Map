/// <reference types="node" />
// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  // Avoid TS1323 on dynamic `import()` with Nuxt’s default `module: "preserve"`.
  typescript: {
    tsConfig: {
      compilerOptions: {
        module: 'ESNext',
      },
    },
  },
  modules: ['@nuxt/ui', '@nuxt/icon', '@nuxt/eslint'],
  css: ['~/assets/main.css'],
  vite: {
    plugins: [
      tailwindcss()
    ]
  },

  colorMode: {
    classSuffix: ''     
  },

  // Public values: set NUXT_PUBLIC_SUPABASE_URL / NUXT_PUBLIC_SUPABASE_KEY in .env
  // (Nuxt merges these at runtime). Fallbacks support legacy SUPABASE_* names.
  runtimeConfig: {
    public: {
      supabaseUrl:
        process.env.NUXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL,
      supabaseKey:
        process.env.NUXT_PUBLIC_SUPABASE_KEY || process.env.SUPABASE_KEY
    },
  },
  
})