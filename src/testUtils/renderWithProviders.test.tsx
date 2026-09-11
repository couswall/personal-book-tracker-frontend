import {describe, expect, it} from 'vitest';
import {screen} from '@testing-library/react';
import {Button} from '@components/Button';
import {renderWithProviders} from '@src/testUtils/renderWithProviders';

describe('renderWithProviders', () => {
    it('renders a themed component wrapped in Redux and Router providers', () => {
        renderWithProviders(<Button>Click me</Button>);

        expect(screen.getByRole('button', {name: 'Click me'})).toBeInTheDocument();
    });

    it('accepts a preloadedState to seed the Redux store', () => {
        const {store} = renderWithProviders(<Button>Click me</Button>, {
            preloadedState: {darkMode: {isDarkMode: false}},
        });

        expect(store.getState().darkMode.isDarkMode).toBe(false);
    });
});
