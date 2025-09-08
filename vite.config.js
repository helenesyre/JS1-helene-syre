import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    base: '/JS1-helene-syre',
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                checkout: resolve(__dirname, 'checkout/index.html'),
                confirmation: resolve(__dirname, 'checkout/confirmation/index.html'),
                product: resolve(__dirname, 'product/index.html'),
                games: resolve(__dirname, 'games/index.html'),
            },
        },
    },
});