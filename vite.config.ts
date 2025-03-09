import { defineConfig } from 'vitest/config';
import { reactRouter } from '@react-router/dev/vite';

export default defineConfig({
  base: '/',
  plugins: [!process.env.VITEST && reactRouter()],
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
