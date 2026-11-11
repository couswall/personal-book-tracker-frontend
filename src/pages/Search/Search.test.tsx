import {describe, expect, it} from 'vitest';
import {screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {http, HttpResponse} from 'msw';
import {Search} from '@pages/Search/Search';
import {renderWithProviders} from '@src/testUtils/renderWithProviders';
import {server} from '@src/testUtils/mswServer';
import {ISearchBook} from '@store/books/searchBook/interfaces';
import {apiUrl, urlWeb} from '@constants/apiEndpoints';
import {SEARCH_PAGE, ERROR_MSG} from '@pages/Search/search.constants';
import {GENERAL_ERROR_MSGS} from '@constants/errorMessages';

const mockSearchResponse = (books: ISearchBook[]) =>
    server.use(
        http.get(`${apiUrl}${urlWeb.searchBook}`, () =>
            HttpResponse.json({success: true, message: '', data: {page: 1, maxResults: 10, books}})
        )
    );

const buildBooks = (count: number): ISearchBook[] =>
    Array.from({length: count}, (_, index) => ({id: index + 1, title: `Book ${index + 1}`}));

describe('Search', () => {
    it('shows a validation error when submitted empty', async () => {
        renderWithProviders(<Search />, {route: '/search'});
        const user = userEvent.setup();

        await user.click(screen.getByRole('button', {name: SEARCH_PAGE.SEARCH_BTN}));

        expect(await screen.findByText(GENERAL_ERROR_MSGS.MANDATORY)).toBeInTheDocument();
    });

    it('shows a validation error for text shorter than the minimum length', async () => {
        renderWithProviders(<Search />, {route: '/search'});
        const user = userEvent.setup();

        await user.type(screen.getByPlaceholderText(SEARCH_PAGE.PLACEHOLDER), 'd');
        await user.click(screen.getByRole('button', {name: SEARCH_PAGE.SEARCH_BTN}));

        expect(await screen.findByText(ERROR_MSG.MIN_LENGTH)).toBeInTheDocument();
    });

    it('runs a search from the initial URL query and shows the results', async () => {
        mockSearchResponse([{id: 1, title: 'Dune'}]);

        renderWithProviders(<Search />, {route: '/search?q=dune&page=1'});

        expect(await screen.findByRole('heading', {name: 'Dune'})).toBeInTheDocument();
    });

    it('shows the no-results message when a search returns nothing', async () => {
        mockSearchResponse([]);

        renderWithProviders(<Search />, {route: '/search?q=nonexistent&page=1'});

        expect(await screen.findByText(SEARCH_PAGE.NO_RESULTS)).toBeInTheDocument();
    });

    it('searches for new text submitted through the form', async () => {
        mockSearchResponse([{id: 2, title: 'Foundation'}]);

        renderWithProviders(<Search />, {route: '/search'});
        const user = userEvent.setup();

        await user.type(screen.getByPlaceholderText(SEARCH_PAGE.PLACEHOLDER), 'foundation');
        await user.click(screen.getByRole('button', {name: SEARCH_PAGE.SEARCH_BTN}));

        expect(await screen.findByRole('heading', {name: 'Foundation'})).toBeInTheDocument();
    });

    it('disables Previous on the first page and enables Next on a full page of results', async () => {
        mockSearchResponse(buildBooks(10));

        renderWithProviders(<Search />, {route: '/search?q=dune&page=1'});

        expect(await screen.findByRole('heading', {name: 'Book 1'})).toBeInTheDocument();
        expect(screen.getByRole('button', {name: SEARCH_PAGE.PREVIOUS_BTN})).toBeDisabled();
        expect(screen.getByRole('button', {name: SEARCH_PAGE.NEXT_BTN})).toBeEnabled();
    });

    it('disables Next when the page of results is not full', async () => {
        mockSearchResponse(buildBooks(3));

        renderWithProviders(<Search />, {route: '/search?q=dune&page=1'});

        expect(await screen.findByRole('heading', {name: 'Book 1'})).toBeInTheDocument();
        expect(screen.getByRole('button', {name: SEARCH_PAGE.NEXT_BTN})).toBeDisabled();
    });

    it('requests the next page when Next is clicked', async () => {
        mockSearchResponse(buildBooks(10));

        renderWithProviders(<Search />, {route: '/search?q=dune&page=1'});
        const user = userEvent.setup();
        await screen.findByRole('heading', {name: 'Book 1'});

        mockSearchResponse([{id: 99, title: 'Second Page Book'}]);
        await user.click(screen.getByRole('button', {name: SEARCH_PAGE.NEXT_BTN}));

        expect(await screen.findByRole('heading', {name: 'Second Page Book'})).toBeInTheDocument();
        await waitFor(() =>
            expect(screen.getByRole('button', {name: SEARCH_PAGE.PREVIOUS_BTN})).toBeEnabled()
        );
    });
});
