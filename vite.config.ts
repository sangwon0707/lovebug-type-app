import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  base: '/lovebug-type-app/', // This should match your homepage in package.json
  server: {
    host: '0.0.0.0',
  },
})