import type {Preview} from '@storybook/react-vite';
import {StyleSheetManager, ThemeProvider} from 'styled-components';
import {shouldForwardProp} from '@helpers/shouldForwardProp';
import {darkTheme, lightTheme} from '@styles/Theme';

const themes = {light: lightTheme, dark: darkTheme};

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
            // Most components pair a themed API (variant, size, weight — lowercase) with a
            // raw CSS escape hatch — PascalCase in components not yet migrated (Width, Margin),
            // $-prefixed transient props in migrated ones ($width, $margin). Hiding both keeps
            // the controls table to the themed API regardless of migration state.
            exclude: /^[A-Z]|^\$/,
        },

        a11y: {
            // 'todo' - show a11y violations in the test UI only
            // 'error' - fail CI on a11y violations
            // 'off' - skip a11y checks entirely
            test: 'todo',
        },
    },
    globalTypes: {
        theme: {
            description: 'App theme',
            toolbar: {
                title: 'Theme',
                icon: 'mirror',
                items: [
                    {value: 'light', icon: 'sun', title: 'Light'},
                    {value: 'dark', icon: 'moon', title: 'Dark'},
                ],
                dynamicTitle: true,
            },
        },
    },
    initialGlobals: {
        theme: 'light',
    },
    decorators: [
        (Story, context) => {
            const themeName = context.globals.theme === 'dark' ? 'dark' : 'light';
            const theme = themes[themeName];

            return (
                <StyleSheetManager shouldForwardProp={shouldForwardProp}>
                    <ThemeProvider theme={theme}>
                        <div
                            style={{
                                minHeight: '100vh',
                                padding: '2rem',
                                backgroundColor: theme.colors.background,
                                color: theme.colors.text.theme,
                                fontFamily: theme.fonts.lexend,
                            }}
                        >
                            <Story />
                        </div>
                    </ThemeProvider>
                </StyleSheetManager>
            );
        },
    ],
};

export default preview;
