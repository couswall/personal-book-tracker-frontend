import {addons} from 'storybook/manager-api';
import {create} from 'storybook/theming/create';

const bookTrackerTheme = create({
    base: 'dark',

    brandTitle: 'Book Tracker Design System',
    brandUrl: '/',
    brandTarget: '_self',

    colorPrimary: '#FF6B6B',
    colorSecondary: '#FF6B6B',

    appBg: '#0F1B2A',
    appContentBg: '#1A2C40',
    appPreviewBg: '#1A2C40',
    appBorderColor: '#2A3F55',
    appBorderRadius: 8,

    textColor: '#FFFFFF',
    textMutedColor: '#94A3B8',
    textInverseColor: '#0F1B2A',

    barTextColor: '#94A3B8',
    barSelectedColor: '#FF6B6B',
    barHoverColor: '#FF6B6B',
    barBg: '#142336',

    inputBg: '#1A2C40',
    inputBorder: '#2A3F55',
    inputTextColor: '#FFFFFF',
    inputBorderRadius: 6,
});

addons.setConfig({
    theme: bookTrackerTheme,
});
