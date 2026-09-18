import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';

const entry = (file) => fileURLToPath(new URL(file, import.meta.url));

// Tres entradas al mismo bundle. index.html es el home donde se arma la tarjeta;
// nene.html y nena.html son las que se comparten, y existen por separado solo
// para que cada una declare su propia og:image (el crawler de WhatsApp no
// ejecuta JavaScript, asi que los meta tags tienen que venir ya en el HTML).
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: entry('./index.html'),
        nene: entry('./nene.html'),
        nena: entry('./nena.html'),
      },
    },
  },
});
