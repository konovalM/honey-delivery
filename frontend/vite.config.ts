import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
    plugins: [react(), svgr()],
    resolve: {
        alias: {
            '@app': path.resolve(__dirname, 'src/app'),
            '@pages': path.resolve(__dirname, 'src/pages'),
            '@components': path.resolve(__dirname, 'src/shared/components'),
            '@utils': path.resolve(__dirname, 'src/utils'),
            '@hooks': path.resolve(__dirname, 'src/shared/hooks'),
            '@widgets': path.resolve(__dirname, 'src/widgets'),
            '@icons': path.resolve(__dirname, 'src/shared/assets/icons'),
            '@shared': path.resolve(__dirname, 'src/shared'),
            '@features': path.resolve(__dirname, 'src/features'),
            '@styles': path.resolve(__dirname, 'src/app/styles'),
            '@entities': path.resolve(__dirname, 'src/entities'),
        },
    },
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './vitest.setup.ts',
        css: true,
        coverage: {
            reporter: ['text', 'lcov'], // для sonarqube
            reportsDirectory: './coverage', // default
            exclude: [
                '**/vitest.setup.ts',
                '**/__mocks__/**',
                '**/*.d.ts',
                '**/index.ts',
                'vite.config.ts',
                'prettier.config.*',
                'eslint.config.*',
                'src/**/*.stories.*',
                'dist/**'
              ],
          },
    },
});