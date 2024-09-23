import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/solar': {
        target: 'https://solar.sumeiklima.org',  // Base URL of the target
        changeOrigin: true,  // Needed for CORS
        secure: false,       // Set to false if SSL certificate issues, true otherwise
        rewrite: path => path.replace(/^\/solar/, '/sr/solar')  // Rewrites /solar in the request to /sr/solar
      }
    }
  }
})
