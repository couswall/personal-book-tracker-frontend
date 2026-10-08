import {describe, expect, it} from 'vitest';
import {screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {http, HttpResponse} from 'msw';
import {Home} from '@pages/Home/Home';
import {authSlice} from '@store/auth/authSlice';
import {AuthStatus} from '@store/auth/interfaces';
import {renderWithProviders} from '@src/testUtils/renderWithProviders';
import {server} from '@src/testUtils/mswServer';
import {apiUrl, urlWeb} from '@constants/apiEndpoints';
import {API_ERROR_MSGS} from '@constants/errorMessages';
import {HOME_TEXTS} from '@pages/Home/home.constants';
import {dashboard, emptyDashboard} from '@pages/Home/home.fixtures';
import {IDashboard} from '@pages/Home/home.interfaces';
import {UPDATE_PROGRESS_TEXTS} from '@pages/Book/components/UpdateProgressModal/updateProgressModal.constants';

const dashboardUrl = `${apiUrl}${urlWeb.getDashboard}`;

/** Serves each response in order (repeating the last one) and counts the requests. */
const mockDashboard = (...responses: Array<{status: number; body: Record<string, unknown>}>) => {
    const calls = {count: 0};
    server.use(
        http.get(dashboardUrl, () => {
            const {status, body} = responses[Math.min(calls.count, responses.length - 1)];
            calls.count += 1;
            return HttpResponse.json(body, {status});
        })
    );
    return calls;
};

const ok = (data: IDashboard) => ({
    status: 200,
    body: {success: true, message: 'Dashboard fetched successfully', data: {dashboard: data}},
});

const failure = (status: number, message: string) => ({
    status,
    body: {success: false, error: {message}},
});

const renderHome = () =>
    renderWithProviders(<Home />, {
        preloadedState: {
            auth: {...authSlice.getInitialState(), status: AuthStatus.Authenticated, token: 'tok'},
        },
    });

describe('Home', {timeout: 15000}, () => {
    it('renders the shelves, currently reading, want to read and challenge from the dashboard', async () => {
        mockDashboard(ok(dashboard));

        renderHome();

        expect(await screen.findByText('42')).toBeInTheDocument();
        expect(screen.getByText('J.R.R. Tolkien, Christopher Tolkien')).toBeInTheDocument();
        expect(screen.getByText(HOME_TEXTS.PAGE_OF(124, 310))).toBeInTheDocument();
        expect(screen.getByText(HOME_TEXTS.MORE_BOOKS(3))).toBeInTheDocument();
        // Only the PAGE-tracked book gets a page line.
        expect(screen.getAllByText(/^Page \d+ of \d+$/)).toHaveLength(1);
        expect(screen.getByRole('img', {name: 'Circe'})).toBeInTheDocument();
        expect(screen.getByRole('link', {name: /Circe/})).toHaveAttribute(
            'href',
            '/book/circe-2018'
        );
        // Real percentage past 100 is shown; the message comes from the builder.
        expect(screen.getByText('110%')).toBeInTheDocument();
        expect(screen.getByText('22 of 20 books')).toBeInTheDocument();
        expect(screen.getByText('You reached your goal of 20 books!')).toBeInTheDocument();
    });

    it('shows the empty states and the set-a-challenge prompt', async () => {
        mockDashboard(ok(emptyDashboard));

        renderHome();

        expect(
            await screen.findByText(HOME_TEXTS.CURRENTLY_READING_EMPTY_TITLE)
        ).toBeInTheDocument();
        expect(screen.getByText(HOME_TEXTS.WANT_TO_READ_EMPTY_TITLE)).toBeInTheDocument();
        expect(screen.getByText(HOME_TEXTS.CHALLENGE_EMPTY_TITLE(2026))).toBeInTheDocument();
        expect(screen.queryByText(HOME_TEXTS.VIEW_CHALLENGE_DETAILS)).not.toBeInTheDocument();
    });

    it('shows one error state on a 500 and reloads the dashboard on retry', async () => {
        const calls = mockDashboard(failure(500, 'boom'), ok(dashboard));

        renderHome();
        const user = userEvent.setup();

        const retryButton = await screen.findByRole('button', {name: HOME_TEXTS.RETRY});
        expect(screen.getByText(HOME_TEXTS.ERROR_TITLE)).toBeInTheDocument();

        await user.click(retryButton);

        expect(await screen.findByText('110%')).toBeInTheDocument();
        expect(calls.count).toBe(2);
    });

    it('logs the user out on an invalid or expired token', async () => {
        mockDashboard(failure(401, API_ERROR_MSGS.INVALID_OR_EXPIRED_TOKEN));

        const {store} = renderHome();

        await waitFor(() => expect(store.getState().auth.token).not.toBe('tok'));
        expect(store.getState().auth.status).not.toBe(AuthStatus.Authenticated);
    });

    it('refetches the whole dashboard after updating reading progress', async () => {
        const calls = mockDashboard(ok(dashboard));
        let sentBody: unknown;
        server.use(
            http.put(`${apiUrl}${urlWeb.updateReadingProgress}`, async ({request}) => {
                sentBody = await request.json();
                return HttpResponse.json({
                    success: true,
                    message: '',
                    data: {
                        bookshelfBook: {
                            id: 11,
                            bookshelfId: 2,
                            bookId: 1,
                            readingProgress: 50,
                            currentPage: 155,
                            totalPages: 310,
                        },
                    },
                });
            })
        );

        renderHome();
        const user = userEvent.setup();
        await screen.findByText(HOME_TEXTS.PAGE_OF(124, 310));
        const [firstUpdateButton] = screen.getAllByRole('button', {
            name: HOME_TEXTS.UPDATE_PROGRESS,
        });

        await user.click(firstUpdateButton);
        const saveButton = await screen.findByRole('button', {
            name: UPDATE_PROGRESS_TEXTS.SAVE_PROGRESS,
        });
        await user.click(saveButton);

        await waitFor(() => expect(calls.count).toBe(2));
        expect(sentBody).toMatchObject({bookshelfBookId: 11, progressType: 'PAGE', value: 124});
        expect(screen.getByText('110%')).toBeInTheDocument();
    });
});
