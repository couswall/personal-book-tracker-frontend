import {describe, expect, it} from 'vitest';
import {darkModeSlice, toggleDarkMode} from '@store/darkMode/darkModeSlice';

const getInitialState = () => darkModeSlice.reducer(undefined, {type: '@@INIT'});

describe('darkModeSlice reducer', () => {
    it('returns the darkMode state in true by default', () => {
        expect(getInitialState().isDarkMode).toBeTruthy();
    });

    it('toggleDarkMode toggles the darkMode state', () => {
        const state = darkModeSlice.reducer(getInitialState(), toggleDarkMode());

        expect(state.isDarkMode).toBeFalsy();
    });
});
