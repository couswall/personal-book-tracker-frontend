import path from 'path';
import {configDefaults, defineConfig, mergeConfig} from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
    viteConfig,
    defineConfig({
        resolve: {
            alias: {
                // Vite's public-dir absolute imports (e.g. `/assets/avatar-robot.jpg`) aren't
                // resolvable under Vitest's SSR module runner - stub them out for tests.
                '/assets/avatar-robot.jpg': path.resolve(__dirname, './src/testUtils/fileMock.ts'),
            },
        },
        test: {
            environment: 'jsdom',
            setupFiles: ['./src/setupTests.ts'],
            css: true,
            // e2e/ holds Playwright specs, which use an incompatible test() global.
            exclude: [...configDefaults.exclude, 'e2e/**'],
        },
    })
);
