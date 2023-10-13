import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ovenplayer-vue3',
      fileName: (format) => `ovenplayer-vue3.${format}.js`
    },
    rollupOptions: {
      external: ['ovenplayer', 'vue'],
      output: {
        globals: {
          ovenplayer: 'OvenPlayer',
          vue: 'Vue'
        }
      }
    }
  }
})
