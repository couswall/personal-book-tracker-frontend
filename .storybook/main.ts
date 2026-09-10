import type {StorybookConfig} from '@storybook/react-vite';
import {mergeConfig} from 'vite';
import path from 'path';
import {fileURLToPath} from 'node:url';

const dirname = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
    stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    staticDirs: ['../public'],
    addons: [
        '@chromatic-com/storybook',
        '@storybook/addon-a11y',
        '@storybook/addon-docs',
        '@storybook/addon-mcp',
    ],
    framework: '@storybook/react-vite',
    viteFinal: async (config) =>
        mergeConfig(config, {
            resolve: {
                alias: {
                    '@src': path.resolve(dirname, '../src/'),
                    '@components': path.resolve(dirname, '../src/components'),
                    '@pages': path.resolve(dirname, '../src/pages'),
                    '@routes': path.resolve(dirname, '../src/routes'),
                    '@store': path.resolve(dirname, '../src/store'),
                    '@styles': path.resolve(dirname, '../src/styles'),
                    '@views': path.resolve(dirname, '../src/views'),
                    '@constants': path.resolve(dirname, '../src/constants'),
                    '@helpers': path.resolve(dirname, '../src/helpers'),
                    '@api': path.resolve(dirname, '../src/api'),
                },
            },
        }),
};
export default config;
