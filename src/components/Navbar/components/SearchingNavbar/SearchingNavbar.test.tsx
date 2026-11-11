import {describe, expect, it} from 'vitest';
import {screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {http, HttpResponse} from 'msw';
import {SearchingNavbar} from '@components/Navbar/components/SearchingNavbar/SearchingNavbar';
import {apiUrl, urlWeb} from '@constants/apiEndpoints';
import {renderWithProviders} from '@src/testUtils/renderWithProviders';
import {server} from '@src/testUtils/mswServer';

describe('SearchingNavbar', () => {
    it('does not search before the debounce settles or below the minimum length', async () => {
        let requestCount = 0;
        server.use(
            http.get(`${apiUrl}${urlWeb.searchBook}`, () => {
                requestCount += 1;
                return HttpResponse.json({
                    success: true,
                    message: '',
                    data: {page: 1, maxResults: 5, books: []},
                });
            })
        );

        renderWithProviders(<SearchingNavbar />);
        const user = userEvent.setup();

        await user.type(screen.getByPlaceholderText('Search books'), 'du');

        await new Promise((resolve) => setTimeout(resolve, 350));
        expect(requestCount).toBe(0);
    });

    it('searches after the debounce settles and shows the results dropdown', async () => {
        server.use(
            http.get(`${apiUrl}${urlWeb.searchBook}`, () =>
                HttpResponse.json({
                    success: true,
                    message: '',
                    data: {page: 1, maxResults: 5, books: [{id: 1, title: 'Dune'}]},
                })
            )
        );

        renderWithProviders(<SearchingNavbar />);
        const user = userEvent.setup();

        await user.type(screen.getByPlaceholderText('Search books'), 'dune');

        expect(await screen.findByText('Dune')).toBeInTheDocument();
    });

    it('stores the search error when the request fails', async () => {
        server.use(http.get(`${apiUrl}${urlWeb.searchBook}`, () => HttpResponse.error()));

        const {store} = renderWithProviders(<SearchingNavbar />);
        const user = userEvent.setup();

        await user.type(screen.getByPlaceholderText('Search books'), 'dune');

        await waitFor(() => expect(store.getState().navbarSearch.error).toBeDefined());
    });
});
