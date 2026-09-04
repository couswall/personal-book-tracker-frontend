import {expect, Page, test} from '@playwright/test';
import {endpoints, mockJson} from './mocks/api';
import {ERROR_MESSAGES, LOGIN_PAGE} from '@pages/Login/constants';
import {SIGN_UP} from '@pages/SignUp/constants';
import {privateRoutes, publicRoutes} from '@routes/routes';

const loginSuccessBody = {
    success: true,
    message: '',
    data: {
        user: {id: 1, fullName: 'Jane Doe', username: 'jane', email: 'jane@test.com'},
        token: 'e2e-token',
    },
};

const login = async (page: Page) => {
    await page.goto(publicRoutes.login);
    await page.getByPlaceholder(LOGIN_PAGE.FIELDS.EMAIL_USERNAME.PLACEHOLDER).fill('jane');
    await page.getByPlaceholder(LOGIN_PAGE.FIELDS.PASSWORD.PLACEHOLDER).fill('Secret1!');
    await page.getByRole('button', {name: LOGIN_PAGE.BTN_LOGIN}).click();
};

test.describe('Authentication', () => {
    test('redirects an unauthenticated visitor to login', async ({page}) => {
        await page.goto(privateRoutes.myBooks);

        await expect(page).toHaveURL(new RegExp(publicRoutes.login));
        await expect(page.getByText(LOGIN_PAGE.TITLE)).toBeVisible();
    });

    test('logs in with valid credentials and reaches the dashboard', async ({page}) => {
        await mockJson(page, endpoints.login, loginSuccessBody, {method: 'POST'});

        await login(page);

        await expect(page).toHaveURL(new RegExp(privateRoutes.myBooks));
        await expect(page.getByRole('heading', {name: 'My books'})).toBeVisible();
    });

    test('shows the server error message on invalid credentials', async ({page}) => {
        await mockJson(
            page,
            endpoints.login,
            {success: false, error: {message: 'Invalid credentials'}},
            {method: 'POST', status: 401}
        );

        await login(page);

        await expect(page.getByText('Invalid credentials')).toBeVisible();
        await expect(page).toHaveURL(new RegExp(publicRoutes.login));
    });

    test('shows validation errors on an empty signup submission', async ({page}) => {
        await page.goto(publicRoutes.signUp);
        await page.getByRole('button', {name: SIGN_UP.BTN_SUBMIT}).click();

        await expect(page.getByText(ERROR_MESSAGES.REQUIRED).first()).toBeVisible();
    });

    test('keeps the session after a page reload', async ({page}) => {
        await mockJson(page, endpoints.login, loginSuccessBody, {method: 'POST'});
        await mockJson(page, endpoints.refreshToken, loginSuccessBody, {method: 'POST'});

        await login(page);
        await expect(page).toHaveURL(new RegExp(privateRoutes.myBooks));

        await page.reload();

        await expect(page.getByRole('heading', {name: 'My books'})).toBeVisible();
    });
});
