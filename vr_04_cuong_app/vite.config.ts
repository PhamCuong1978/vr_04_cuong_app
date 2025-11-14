import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    // Conditionally set the base path for GitHub Pages deployment.
    // Vercel deploys at the root, so it doesn't need a specific base.
    base: env.VITE_DEPLOY_TARGET === 'github' ? '/vr_04_cuong_app/' : '/',
    plugins: [react()],
    define: {
      // Expose environment variables to your client-side code
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    }
  }
})
