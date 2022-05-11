import vue from '@vitejs/plugin-vue'

const path = require('path')
const { defineConfig } = require('vite')


module.exports = defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.js'),
      name: 'ovenplayer-vue3',
      fileName: (format) => `ovenplayer-vue3.${format}.js`
    },
    rollupOptions: {
      external: ['vue', 'ovenplayer'],
      output: {
        globals: {
          ovenplayer: 'OvenPlayer',
          vue: 'Vue'
        }
      }
    }
  }
})