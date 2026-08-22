import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/auth': 'http://localhost:3000',
      '/jogadores': {
        target: 'http://localhost:3000',
        bypass: (request) => request.headers.accept?.includes('text/html') ? '/index.html' : undefined,
      },
    },
  },
});
