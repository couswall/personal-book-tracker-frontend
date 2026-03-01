import {DefaultTheme} from 'styled-components';

export const lightTheme: DefaultTheme = {
    mode: 'light',
    colors: {
        // Brand Identity
        primaryColor: '#EC7F13', // Primary Orange - buttons, progress bars, active states
        primaryHover: '#D47211', // Brand Hover - interactive hover states
        primaryLight: '#FDF2E7', // Brand Light - badge backgrounds, highlights
        secondaryColor: '#DA498D', // Secondary accent
        tertiaryColor: '#FAC67A', // Tertiary accent

        // Surfaces & Foundations
        background: '#F8F7F6', // Global Background - clean off-white
        backgroundSecondary: '#FFFFFF', // Surface White - cards, floating containers
        backgroundTertiary: '#ffffff9d', // Darker surface - navbar, elevated elements
        borderColor: '#E6E0DB', // Border Color - separators, container outlines

        // Typography
        text: {
            theme: '#181411', // Main Text - deep charcoal-brown
            light: '#897561', // Muted Text - warm taupe for metadata
            accent: '#EC7F13', // Accent Text - links, emphasis
        },

        // UI Elements
        lightColor: '#FFFFFF',
        darkGrey: '#333333',
        disabledButton: '#FFA45B',
        searchBarContainer: '#7C444F',

        // Status Colors
        danger: '#DC2626',
        dangerHover: '#B91C1C',
        success: '#16A34A',
        successHover: '#15803D',

        // Input
        input: {
            inputBackground: '#F0EDEA',
            labelColor: '#333333',
            errorMsgText: '#FA4032',
        },

        containerHover: {
            primary: '#ff6b6b33',
            muted: '#E6E0DB',
        },
    },
    fonts: {
        lexend: 'Lexend',
    },
    typography: {
        sizes: {
            xs: {fontSize: '0.75rem', lineHeight: '1rem'},
            sm: {fontSize: '0.875rem', lineHeight: '1.25rem'},
            md: {fontSize: '1rem', lineHeight: '1.5rem'},
            lg: {fontSize: '1.125rem', lineHeight: '1.75rem'},
            xl: {fontSize: '1.25rem', lineHeight: '1.75rem'},
            '2xl': {fontSize: '1.5rem', lineHeight: '2rem'},
            '3xl': {fontSize: '1.875rem', lineHeight: '2.25rem'},
            '4xl': {fontSize: '2.25rem', lineHeight: '2.5rem'},
        },
        weights: {
            normal: '400',
            medium: '500',
            semibold: '600',
            bold: '700',
        },
    },
    widths: {
        sectionMaxWidths: {
            sm: '640px',
            md: '768px',
            lg: '1024px',
            xl: '1280px',
            xxl: '1400px',
            full: '100%',
        },
    },
    paddings: {
        sectionContainer: '0 40px',
    },
    margins: {
        sectionContainer: '0 auto',
    },
    breakpoints: {
        xxl: '1400px',
        xl: '1200px',
        lg: '992px',
        md: '768px',
        sm: '576px',
        xs: '375px',
    },
};

export const darkTheme: DefaultTheme = {
    mode: 'dark',
    colors: {
        // Brand Identity
        primaryColor: '#FF6B6B', // Vivid Coral - CTAs, buttons, active status
        primaryHover: '#FFD1AA', // Darker coral for hover states
        primaryLight: '#FFD1AA', // Light Peach - icons, secondary highlights
        secondaryColor: '#FFD1AA', // Light Peach - secondary accent
        tertiaryColor: '#A64D79', // Tertiary accent

        // Surfaces & Foundations
        background: '#0F1B2A', // Sapphire Deep - main background
        backgroundSecondary: '#1A2C40', // Cerulean Card - cards, sidebar, containers
        backgroundTertiary: '#142336', // Darker surface - navbar, elevated elements
        borderColor: '#2A3F55', // Border color for dark mode

        // Typography
        text: {
            theme: '#FFFFFF', // Pure White - headings, critical data
            light: '#94A3B8', // Slate Muted - author names, descriptions, metadata
            accent: '#FF6B6B', // Accent Text - links, emphasis
        },

        // UI Elements
        lightColor: '#FFFFFF',
        darkGrey: '#94A3B8',
        disabledButton: '#005650',
        searchBarContainer: '#1A2C40',

        // Status Colors
        danger: '#F87171',
        dangerHover: '#FCA5A5',
        success: '#4ADE80',
        successHover: '#86EFAC',

        // Input
        input: {
            inputBackground: '#1A2C40',
            labelColor: '#94A3B8',
            bg: '#FFFFFF',
            errorMsgText: '#F86868',
        },

        containerHover: {
            primary: '#ff6b6b33',
            muted: '#2A3F55',
        },
    },
    fonts: {
        lexend: 'Lexend',
    },
    typography: {
        sizes: {
            xs: {fontSize: '0.75rem', lineHeight: '1rem'},
            sm: {fontSize: '0.875rem', lineHeight: '1.25rem'},
            md: {fontSize: '1rem', lineHeight: '1.5rem'},
            lg: {fontSize: '1.125rem', lineHeight: '1.75rem'},
            xl: {fontSize: '1.25rem', lineHeight: '1.75rem'},
            '2xl': {fontSize: '1.5rem', lineHeight: '2rem'},
            '3xl': {fontSize: '1.875rem', lineHeight: '2.25rem'},
            '4xl': {fontSize: '2.25rem', lineHeight: '2.5rem'},
        },
        weights: {
            normal: '400',
            medium: '500',
            semibold: '600',
            bold: '700',
        },
    },
    widths: {
        sectionMaxWidths: {
            sm: '640px',
            md: '768px',
            lg: '1024px',
            xl: '1280px',
            xxl: '1400px',
            full: '100%',
        },
    },
    paddings: {
        sectionContainer: '0 40px',
    },
    margins: {
        sectionContainer: '0 auto',
    },
    breakpoints: {
        xxl: '1400px',
        xl: '1200px',
        lg: '992px',
        md: '768px',
        sm: '576px',
        xs: '375px',
    },
};
