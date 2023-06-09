import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@svg': fileURLToPath(new URL('./public/svg', import.meta.url)),
      '@images': fileURLToPath(new URL('./public/images', import.meta.url))
    }
  },

  css: {
    preprocessorOptions: {
      scss: {
        additionalData:
          "@import '@/assets/scss/_variables.scss';@import '@/assets/scss/_mixins.scss';@import '@/assets/scss/_components.scss';"
      }
    }
  }
})
