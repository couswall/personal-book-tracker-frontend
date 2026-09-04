import {expect, test} from '@playwright/test';
import {endpoints, mockJson} from './mocks/api';
import {LOGIN_PAGE} from '@pages/Login/constants';
import {privateRoutes, publicRoutes} from '@routes/routes';
import {NAVBAR_ARIA_LABELS} from '@components/Navbar/constants';

const loginSuccessBody = {
    success: true,
    message: '',
    data: {
        user: {id: 1, fullName: 'Jane Doe', username: 'jane', email: 'jane@test.com'},
        token: 'e2e-token',
    },
};

test('toggles dark mode and keeps the preference after a reload', async ({page}) => {
    await mockJson(page, endpoints.login, loginSuccessBody, {method: 'POST'});
    await mockJson(page, endpoints.refreshToken, loginSuccessBody, {method: 'POST'});

    await page.goto(publicRoutes.login);
    await page.getByPlaceholder(LOGIN_PAGE.FIELDS.EMAIL_USERNAME.PLACEHOLDER).fill('jane');
    await page.getByPlaceholder(LOGIN_PAGE.FIELDS.PASSWORD.PLACEHOLDER).fill('Secret1!');
    await page.getByRole('button', {name: LOGIN_PAGE.BTN_LOGIN}).click();
    await expect(page).toHaveURL(new RegExp(privateRoutes.myBooks));

    // Dark mode defaults to on, so the toggle's accessible name offers to switch to light.
    const toggle = page.getByRole('button', {name: NAVBAR_ARIA_LABELS.SWITCH_TO_LIGHT_MODE});
    await expect(toggle).toBeVisible();

    await toggle.click();
    await expect(
        page.getByRole('button', {name: NAVBAR_ARIA_LABELS.SWITCH_TO_DARK_MODE})
    ).toBeVisible();

    await page.reload();

    await expect(
        page.getByRole('button', {name: NAVBAR_ARIA_LABELS.SWITCH_TO_DARK_MODE})
    ).toBeVisible();
});
