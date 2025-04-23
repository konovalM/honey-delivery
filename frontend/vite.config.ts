import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
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
});
