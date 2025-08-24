import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';
import checker from 'vite-plugin-checker';

export default defineConfig({
  base: '/',
  plugins: [
    react(),
    svgr(),
    checker({
      typescript: true,
      eslint: {
        useFlatConfig: true, // for me this fix the problem
        lintCommand: 'eslint .',
        dev: {
          logLevel: ['warning', 'error'],
        },
      },
      overlay: {
        initialIsOpen: 'error'
      }
    }),
  ],
  build: {
    outDir: 'build'
  },
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],  // '@'를 '/src' 폴더로 대체
  },
});
