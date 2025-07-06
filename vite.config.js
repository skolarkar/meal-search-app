import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(),tailwindcss()],
  server: {
    port: 3000, // Set port to 3000
    proxy: {
      '/api': {
        target: 'http://app:8080', // Backend API URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Optional: Rewrite the path
      },
    },
  },
})
