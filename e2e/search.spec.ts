import {expect, test} from '@playwright/test';
import {endpoints, loginToDashboard, mockJson} from './mocks/api';

const dune = {
    id: 42,
    apiBookId: 'dune-1965',
    title: 'Dune',
    authors: ['Frank Herbert'],
    description: 'A desert planet.',
    publishedDate: '1965-08-01',
    coverImageUrl: null,
    categories: ['Sci-Fi'],
    pageCount: 412,
    averageRating: 4.8,
    reviewCount: 900,
    subtitle: null,
    deletedAt: null,
};

test.beforeEach(async ({page}) => {
    await loginToDashboard(page);
});

test.describe('Navbar search', () => {
    test('shows results in the debounced dropdown and navigates to the book on click', async ({
        page,
    }) => {
        await mockJson(page, endpoints.searchBook, {
            success: true,
            message: '',
            data: {page: 1, maxResults: 5, books: [{id: dune.id, title: dune.title}]},
        });
        await mockJson(page, endpoints.getBookById(String(dune.id)), {
            success: true,
            message: '',
            data: dune,
        });

        await page.getByPlaceholder('Search books').fill('dune');
        await page.getByText('Dune', {exact: true}).click();

        await expect(page).toHaveURL(new RegExp(`/book/${dune.id}`));
        await expect(page.getByRole('heading', {name: dune.title})).toBeVisible();
    });
});
