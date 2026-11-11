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
            // 'forks' (the default) spawns a new OS process per test file, which is slow
            // to start on Windows and occasionally times out ("Failed to start forks worker").
            // 'threads' reuses worker threads instead, which is faster and more reliable here.
            pool: 'threads',
            // isolate: false was tried to cut per-file jsdom startup time, but this suite
            // mocks '@api/httpClient' per file with vi.mock() extensively - disabling
            // isolation shares each worker's module registry across files, so one file's
            // mock setup corrupted another's (many spurious failures). Not viable here.
        },
    })
);
