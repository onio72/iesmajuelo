import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/iesmajuelo/bach/fi2/t03/lineascampo/',
  build: {
    outDir: '../../../../docs/bach/fi2/t03/lineascampo',
    emptyOutDir: true,
  },
})
