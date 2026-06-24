import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    allowedHosts: ['aging-dealing-frequent.ngrok-free.dev', '.ngrok-free.dev'],
  },
  preview: {
    host: true,
    allowedHosts: ['aging-dealing-frequent.ngrok-free.dev', '.ngrok-free.dev'],
  },
});
