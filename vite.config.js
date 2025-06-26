import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';

// ✅ Force .json to serve with correct MIME type
export default defineConfig({
  plugins: [react()],
  server: {
    mimeTypes: {
      'json': 'application/json'
    }
  }
});
