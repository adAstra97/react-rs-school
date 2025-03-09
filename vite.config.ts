import { defineConfig } from 'vitest/config';
import { reactRouter } from '@react-router/dev/vite';
import netlifyPlugin from '@netlify/vite-plugin-react-router';

export default defineConfig({
  base: '/',
  plugins: [!process.env.VITEST && reactRouter(), netlifyPlugin()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'src/__tests__/setup.ts',
    coverage: {
      provider: 'v8',
      include: ['**/*.tsx'],
      exclude: [
        '**/node_modules/**',
        '**/*.test.tsx',
        '**/*.spec.tsx',
        'src/__tests__/setup.ts',
      ],
    },
  },
});
