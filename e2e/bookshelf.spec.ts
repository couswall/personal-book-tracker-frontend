import {expect, test} from '@playwright/test';
import {endpoints, mockJson} from './mocks/api';
import {LOGIN_PAGE} from '@pages/Login/login.constants';
import {privateRoutes, publicRoutes} from '@routes/routes';
import {BOOK_TOP_SECTION_TEXTS} from '@pages/Book/components/BookTopSection/bookTopSection.constants';
import {BOOK_ACTIVITY_TEXTS} from '@pages/Book/components/BookActivity/bookActivity.constants';
import {ADD_TO_BOOKSHELF_TEXTS} from '@pages/Book/components/AddToBookshelfModal/addToBookshelfModal.constants';
import {UPDATE_PROGRESS_TEXTS} from '@pages/Book/components/UpdateProgressModal/updateProgressModal.constants';

const userId = 7;
const bookId = '1';

const loginSuccessBody = {
    success: true,
    message: '',
    data: {
        user: {id: userId, fullName: 'Jane Doe', username: 'jane', email: 'jane@test.com'},
        token: 'e2e-token',
    },
};

const book = {
    id: 1,
    apiBookId: 'dune-1965',
    title: 'Dune',
    authors: ['Frank Herbert'],
    description: 'A desert planet.',
    publishedDate: '1965-08-01T00:00:00.000Z',
    coverImageUrl: null,
    categories: ['Sci-Fi'],
    pageCount: 400,
    averageRating: 4.8,
    reviewCount: 900,
    subtitle: null,
    deletedAt: null,
};

const notOwnedShelves = [
    {
        id: 1,
        name: 'To Be Read',
        isSelected: false,
        bookshelfBookId: null,
        bookCount: 2,
        readingProgress: null,
        currentPage: null,
    },
    {
        id: 2,
        name: 'Currently Reading',
        isSelected: false,
        bookshelfBookId: null,
        bookCount: 1,
        readingProgress: null,
        currentPage: null,
    },
    {
        id: 3,
        name: 'Read',
        isSelected: false,
        bookshelfBookId: null,
        bookCount: 5,
        readingProgress: null,
        currentPage: null,
    },
];

const ownedShelves = [
    {
        id: 1,
        name: 'To Be Read',
        isSelected: false,
        bookshelfBookId: null,
        bookCount: 2,
        readingProgress: null,
        currentPage: null,
    },
    {
        id: 2,
        name: 'Currently Reading',
        isSelected: true,
        bookshelfBookId: 55,
        bookCount: 2,
        readingProgress: 25,
        currentPage: 100,
    },
    {
        id: 3,
        name: 'Read',
        isSelected: false,
        bookshelfBookId: null,
        bookCount: 5,
        readingProgress: null,
        currentPage: null,
    },
];

test.beforeEach(async ({page}) => {
    await mockJson(page, endpoints.login, loginSuccessBody, {method: 'POST'});
    await mockJson(page, endpoints.getBookById(bookId), {success: true, message: '', data: book});
    await mockJson(page, endpoints.getBookshelvesWithStatus(userId, bookId), {
        success: true,
        message: '',
        data: {bookshelves: notOwnedShelves},
    });

    await page.goto(publicRoutes.login);
    await page.getByPlaceholder(LOGIN_PAGE.FIELDS.EMAIL_USERNAME.PLACEHOLDER).fill('jane');
    await page.getByPlaceholder(LOGIN_PAGE.FIELDS.PASSWORD.PLACEHOLDER).fill('Secret1!');
    await page.getByRole('button', {name: LOGIN_PAGE.BTN_LOGIN}).click();
    await expect(page).toHaveURL(new RegExp(privateRoutes.myBooks));

    await page.goto(`/book/${bookId}`);
    await expect(page.getByRole('heading', {name: 'Dune'})).toBeVisible();
});

test.describe('Bookshelf and reading progress', () => {
    test('adds the book to a shelf and then updates its reading progress', async ({page}) => {
        await expect(
            page.getByRole('button', {name: BOOK_TOP_SECTION_TEXTS.ADD_TO_BOOKSHELF})
        ).toBeVisible();

        await page.getByRole('button', {name: BOOK_TOP_SECTION_TEXTS.ADD_TO_BOOKSHELF}).click();
        await expect(
            page.getByRole('heading', {name: ADD_TO_BOOKSHELF_TEXTS.MODAL_TITLE})
        ).toBeVisible();

        await mockJson(
            page,
            endpoints.addBookToBookshelf,
            {success: true, message: '', data: {}},
            {
                method: 'POST',
            }
        );
        await mockJson(page, endpoints.getBookshelvesWithStatus(userId, bookId), {
            success: true,
            message: '',
            data: {bookshelves: ownedShelves},
        });

        await page.getByText('Currently Reading').click();

        await expect(
            page.getByText(ADD_TO_BOOKSHELF_TEXTS.ADDED_TO('Currently Reading'))
        ).toBeVisible();

        // Close the modal by clicking the overlay backdrop (its own close button has no
        // accessible name, and there's no Escape handler).
        await page.mouse.click(5, 5);
        await expect(
            page.getByRole('heading', {name: ADD_TO_BOOKSHELF_TEXTS.MODAL_TITLE})
        ).toBeHidden();

        await expect(page.getByText(BOOK_ACTIVITY_TEXTS.UPDATE_PROGRESS)).toBeVisible();

        await page.getByText(BOOK_ACTIVITY_TEXTS.UPDATE_PROGRESS).click();
        await expect(page.getByText(UPDATE_PROGRESS_TEXTS.MODAL_TITLE)).toBeVisible();

        await mockJson(
            page,
            endpoints.updateReadingProgress,
            {
                success: true,
                message: '',
                data: {
                    bookshelfBook: {
                        id: 55,
                        bookshelfId: 2,
                        bookId: 1,
                        readingProgress: 40,
                        currentPage: 160,
                        totalPages: 400,
                    },
                },
            },
            {method: 'PUT'}
        );

        const valueInput = page.locator('input[type="number"]');
        await valueInput.fill('160');
        await page.getByRole('button', {name: UPDATE_PROGRESS_TEXTS.SAVE_PROGRESS}).click();

        await expect(page.getByText(UPDATE_PROGRESS_TEXTS.PROGRESS_UPDATED)).toBeVisible();
    });
});
