import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  const productionEnv = mode === 'development' ? loadEnv('production', '.', '') : {};
  const apiBaseUrl = env.VITE_API_BASE_URL || productionEnv.VITE_API_BASE_URL;
  const apiKey = env.VITE_API_KEY || productionEnv.VITE_API_KEY;

  return {
    plugins: [react()],
    define: {
      'import.meta.env.VITE_API_BASE_URL': JSON.stringify(apiBaseUrl),
      'import.meta.env.VITE_API_KEY': JSON.stringify(apiKey),
    },
    server: {
      host: true,
      allowedHosts: ['aging-dealing-frequent.ngrok-free.dev', '.ngrok-free.dev'],
    },
    preview: {
      host: true,
      allowedHosts: ['aging-dealing-frequent.ngrok-free.dev', '.ngrok-free.dev'],
    },
  };
});
