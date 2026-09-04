import {PropsWithChildren, ReactElement} from 'react';
import {render, RenderOptions} from '@testing-library/react';
import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import {ThemeProvider} from 'styled-components';
import {MemoryRouter} from 'react-router';
import {
    authSlice,
    darkModeSlice,
    getBookByIdSlice,
    navbarSearchSlice,
    searchBookSlice,
} from '@store/index';
import {darkTheme, lightTheme} from '@styles/Theme';
import {PersistState} from 'redux-persist';

const persistPlaceholderReducer = (state: PersistState = {version: -1, rehydrated: true}) => state;

const testRootReducer = combineReducers({
    darkMode: darkModeSlice.reducer,
    auth: authSlice.reducer,
    getBookById: getBookByIdSlice.reducer,
    searchBook: searchBookSlice.reducer,
    navbarSearch: navbarSearchSlice.reducer,
    // Mirrors the shape redux-persist adds to the real store's RootState, so thunks typed
    // against RootState (e.g. refreshToken) can be dispatched against this test store.
    _persist: persistPlaceholderReducer,
});

type TestRootState = ReturnType<typeof testRootReducer>;

export const createTestStore = (preloadedState?: Partial<TestRootState>) =>
    configureStore({
        reducer: testRootReducer,
        preloadedState,
    });

export type TestStore = ReturnType<typeof createTestStore>;

interface ExtendedRenderOptions extends Omit<RenderOptions, 'wrapper'> {
    preloadedState?: Partial<TestRootState>;
    store?: TestStore;
    route?: string;
}

export const renderWithProviders = (
    ui: ReactElement,
    {
        preloadedState,
        store = createTestStore(preloadedState),
        route = '/',
        ...renderOptions
    }: ExtendedRenderOptions = {}
) => {
    const {isDarkMode} = store.getState().darkMode;

    const Wrapper = ({children}: PropsWithChildren) => (
        <Provider store={store}>
            <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
                <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
            </ThemeProvider>
        </Provider>
    );

    return {store, ...render(ui, {wrapper: Wrapper, ...renderOptions})};
};
