import {describe, expect, it} from 'vitest';
import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {Route, Routes} from 'react-router';
import {http, HttpResponse} from 'msw';
import {Book} from '@pages/Book/Book';
import {privateRoutes} from '@routes/routes';
import {AuthStatus} from '@store/auth/interfaces';
import {renderWithProviders} from '@src/testUtils/renderWithProviders';
import {server} from '@src/testUtils/mswServer';
import {IBookshelfWithStatus} from '@pages/Book/book.interfaces';
import {IBook} from '@store/books/getBookById/interfaces';
import {apiUrl, urlWeb} from '@constants/apiEndpoints';
import {BOOK_TEXTS} from '@pages/Book/book.constants';
import {BOOK_TOP_SECTION_TEXTS} from '@pages/Book/components/BookTopSection/bookTopSection.constants';
import {NOT_FOUND_TITLE} from '@pages/Book/components/book.components.constants';

const userId = 7;
const bookId = '1';
const bookDescription = 'A desert planet.';

const book: IBook = {
    id: 1,
    apiBookId: 'dune-1965',
    title: 'Dune',
    authors: ['Frank Herbert'],
    description: bookDescription,
    publishedDate: '1965-08-01T00:00:00.000Z',
    coverImageUrl: null,
    categories: ['Sci-Fi'],
    pageCount: 412,
    averageRating: 4.8,
    reviewCount: 900,
    subtitle: null,
    deletedAt: null,
};

const mockGetBookById = (status: number, data: IBook | null = book) =>
    server.use(
        http.get(`${apiUrl}${urlWeb.getBookById.replace(':id', bookId)}`, () =>
            HttpResponse.json({success: status < 400, message: '', data}, {status})
        )
    );

const mockGetBookshelvesWithStatus = (bookshelves: IBookshelfWithStatus[]) =>
    server.use(
        http.get(
            `${apiUrl}${urlWeb.getBookshelvesWithStatus
                .replace(':userId', String(userId))
                .replace(':apiBookId', bookId)}`,
            () => HttpResponse.json({success: true, message: '', data: {bookshelves}})
        )
    );

const renderBookPage = () =>
    renderWithProviders(
        <Routes>
            <Route path={privateRoutes.book} element={<Book />} />
        </Routes>,
        {
            route: `/book/${bookId}`,
            preloadedState: {
                auth: {
                    status: AuthStatus.Authenticated,
                    token: 'tok',
                    user: {
                        id: userId,
                        fullName: 'Jane Doe',
                        username: 'jane',
                        email: 'jane@test.com',
                    },
                    loadings: {
                        loginLoading: false,
                        registerUserLoading: false,
                        refreshTokenLoading: false,
                    },
                    errors: {},
                },
            },
        }
    );

describe('Book', () => {
    it('shows the book details once loaded', async () => {
        mockGetBookById(200);
        mockGetBookshelvesWithStatus([]);

        renderBookPage();

        expect(
            await screen.findByRole('heading', {name: 'Dune'}, {timeout: 10000})
        ).toBeInTheDocument();
        expect(screen.getByText(bookDescription)).toBeInTheDocument();
        expect(
            screen.getByRole('button', {name: BOOK_TOP_SECTION_TEXTS.ADD_TO_BOOKSHELF})
        ).toBeInTheDocument();
    }, 15000);

    it('shows the not-found page when the book request fails', async () => {
        mockGetBookById(404, null);
        mockGetBookshelvesWithStatus([]);

        renderBookPage();

        expect(await screen.findByText(NOT_FOUND_TITLE, {}, {timeout: 10000})).toBeInTheDocument();
    }, 15000);

    it('toggles the description between "Show more" and "Show less"', async () => {
        mockGetBookById(200);
        mockGetBookshelvesWithStatus([]);

        renderBookPage();
        const user = userEvent.setup();
        await screen.findByRole('heading', {name: 'Dune'}, {timeout: 10000});

        const toggleButton = screen.getByText(BOOK_TEXTS.SHOW_MORE);
        await user.click(toggleButton);

        expect(screen.getByText(BOOK_TEXTS.SHOW_LESS)).toBeInTheDocument();
    }, 15000);
});
