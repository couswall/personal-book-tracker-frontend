import {expect, test} from '@playwright/test';
import {loginToDashboard} from './mocks/api';
import {NAVBAR_ARIA_LABELS} from '@components/Navbar/constants';

test('toggles dark mode and keeps the preference after a reload', async ({page}) => {
    await loginToDashboard(page);

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
