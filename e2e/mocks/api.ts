import {Page} from '@playwright/test';

// Playwright tests run in Node, not through Vite, so source files that read
// `import.meta.env` (like src/helpers/getEnvVariables.ts) can't be imported here.
// This mirrors src/constants/apiEndpoints.ts and must stay in sync with the
// VITE_API_URL the dev server loads from .env.development.
export const API_URL = 'http://localhost:3000/api/';

export const endpoints = {
    login: 'auth/login',
    registerUser: 'auth/register',
    refreshToken: 'auth/refresh',
    searchBook: 'book/search',
    getBookById: (id: string) => `book/bookById/${id}`,
    getBookshelvesWithStatus: (userId: number, apiBookId: string) =>
        `bookshelf/bookStatus/${userId}/${apiBookId}`,
    addBookToBookshelf: 'bookshelfBook/addToBookshelf',
    updateReadingProgress: 'bookshelfBook/updateReadingProgress',
};

interface MockJsonOptions {
    status?: number;
    method?: string;
}

export const mockJson = (page: Page, path: string, body: unknown, options: MockJsonOptions = {}) =>
    page.route(
        (url) => `${url.origin}${url.pathname}` === `${API_URL}${path}`,
        (route) => {
            if (options.method && route.request().method() !== options.method) {
                return route.fallback();
            }
            return route.fulfill({status: options.status ?? 200, json: body});
        }
    );
