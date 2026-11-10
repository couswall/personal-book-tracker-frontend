import {expect, Page} from '@playwright/test';
import {LOGIN_PAGE} from '@pages/Login/login.constants';
import {HOME_TEXTS} from '@pages/Home/home.constants';
import {publicRoutes} from '@routes/routes';
import {API_URL} from './apiUrl';

export const endpoints = {
    login: 'auth/login',
    registerUser: 'auth/register',
    refreshToken: 'auth/refresh',
    logout: 'auth/logout',
    searchBook: 'book/search',
    getBookById: (id: string) => `book/bookById/${id}`,
    getBookshelvesWithStatus: (apiBookId: string) => `bookshelf/bookStatus/${apiBookId}`,
    addBookToBookshelf: 'bookshelfBook/addToBookshelf',
    updateReadingProgress: 'bookshelfBook/updateReadingProgress',
    getDashboard: 'dashboard',
};

interface MockJsonOptions {
    status?: number;
    method?: string;
}

const isEndpoint = (path: string) => (url: URL) =>
    `${url.origin}${url.pathname}` === `${API_URL}${path}`;

export const mockJson = (page: Page, path: string, body: unknown, options: MockJsonOptions = {}) =>
    page.route(isEndpoint(path), (route) => {
        if (options.method && route.request().method() !== options.method) {
            return route.fallback();
        }
        return route.fulfill({status: options.status ?? 200, json: body});
    });

export const buildLoginSuccessBody = (userId = 1) => ({
    success: true,
    message: '',
    data: {
        user: {id: userId, fullName: 'Jane Doe', username: 'jane', email: 'jane@test.com'},
        token: 'e2e-token',
    },
});

/** A brand-new user's dashboard: empty shelves and no reading challenge. */
export const emptyDashboardBody = {
    success: true,
    message: 'Dashboard fetched successfully',
    data: {
        dashboard: {
            shelves: [
                {id: 1, name: 'Read', type: 'READ', bookCount: 0},
                {id: 2, name: 'Currently Reading', type: 'CURRENTLY_READING', bookCount: 0},
                {id: 3, name: 'Want to Read', type: 'TO_BE_READ', bookCount: 0},
            ],
            currentlyReading: {total: 0, books: []},
            wantToRead: {total: 0, books: []},
            readingChallenge: {
                year: 2026,
                goal: null,
                booksRead: 0,
                booksThisMonth: 0,
                progress: null,
            },
        },
    },
};

/** Fills in and submits the login form (without mocking anything). */
export const submitLoginForm = async (page: Page) => {
    await page.goto(publicRoutes.login);
    await page.getByPlaceholder(LOGIN_PAGE.FIELDS.EMAIL_USERNAME.PLACEHOLDER).fill('jane');
    await page.getByPlaceholder(LOGIN_PAGE.FIELDS.PASSWORD.PLACEHOLDER).fill('Secret1!');
    await page.getByRole('button', {name: LOGIN_PAGE.BTN_LOGIN}).click();
};

export const expectHomeDashboard = async (page: Page) => {
    await expect(page).toHaveURL(/\/$/);
    await expect(
        page.getByRole('heading', {name: HOME_TEXTS.CURRENTLY_READING_TITLE})
    ).toBeVisible();
};

/**
 * Mocks login, refresh and logout so they behave like the real httpOnly refresh cookie:
 * refresh answers 401 until login succeeds, 200 after it (also after page.reload()),
 * and 401 again after logout.
 */
export const mockSession = async (page: Page, userId = 1) => {
    const loginBody = buildLoginSuccessBody(userId);
    let hasRefreshCookie = false;

    await page.route(isEndpoint(endpoints.login), (route) => {
        hasRefreshCookie = true;
        return route.fulfill({json: loginBody});
    });
    await page.route(isEndpoint(endpoints.refreshToken), (route) =>
        hasRefreshCookie
            ? route.fulfill({json: loginBody})
            : route.fulfill({
                  status: 401,
                  json: {success: false, error: {message: 'Invalid or expired token'}},
              })
    );
    await page.route(isEndpoint(endpoints.logout), (route) => {
        hasRefreshCookie = false;
        return route.fulfill({json: {success: true, message: ''}});
    });
};

/** Logs in with mocked auth and lands on the Home dashboard, which loads from /api/dashboard. */
export const loginToDashboard = async (page: Page, userId = 1) => {
    await mockSession(page, userId);
    await mockJson(page, endpoints.getDashboard, emptyDashboardBody, {method: 'GET'});

    await submitLoginForm(page);
    await expectHomeDashboard(page);
};
