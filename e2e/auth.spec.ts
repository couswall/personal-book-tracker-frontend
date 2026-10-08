import {expect, test} from '@playwright/test';
import {
    endpoints,
    expectHomeDashboard,
    loginToDashboard,
    mockJson,
    submitLoginForm,
} from './mocks/api';
import {ERROR_MESSAGES, LOGIN_PAGE} from '@pages/Login/login.constants';
import {SIGN_UP} from '@pages/SignUp/signUp.constants';
import {privateRoutes, publicRoutes} from '@routes/routes';

test.describe('Authentication', () => {
    test('redirects an unauthenticated visitor to login', async ({page}) => {
        await page.goto(privateRoutes.myBooks);

        await expect(page).toHaveURL(new RegExp(publicRoutes.login));
        await expect(page.getByText(LOGIN_PAGE.TITLE)).toBeVisible();
    });

    test('logs in with valid credentials and reaches the dashboard', async ({page}) => {
        await loginToDashboard(page);
    });

    test('shows the server error message on invalid credentials', async ({page}) => {
        await mockJson(
            page,
            endpoints.login,
            {success: false, error: {message: 'Invalid credentials'}},
            {method: 'POST', status: 401}
        );

        await submitLoginForm(page);

        await expect(page.getByText('Invalid credentials')).toBeVisible();
        await expect(page).toHaveURL(new RegExp(publicRoutes.login));
    });

    test('shows validation errors on an empty signup submission', async ({page}) => {
        await page.goto(publicRoutes.signUp);
        await page.getByRole('button', {name: SIGN_UP.BTN_SUBMIT}).click();

        await expect(page.getByText(ERROR_MESSAGES.REQUIRED).first()).toBeVisible();
    });

    test('keeps the session after a page reload', async ({page}) => {
        await loginToDashboard(page);

        await page.reload();

        await expectHomeDashboard(page);
    });
});
