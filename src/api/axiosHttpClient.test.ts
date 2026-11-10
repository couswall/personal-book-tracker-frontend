import {beforeAll, beforeEach, describe, expect, it, vi} from 'vitest';
import {http, HttpResponse} from 'msw';
import {createPrivateClient, createAuthClient, setupAuthInterceptors} from '@api/axiosHttpClient';
import {apiUrl} from '@constants/apiEndpoints';
import {GENERAL_ERROR_MSGS} from '@constants/errorMessages';
import {server} from '@src/testUtils/mswServer';

const endpoint = `${apiUrl}ping`;

describe('createAuthClient', () => {
    it('unwraps the response data on success', async () => {
        server.use(
            http.get(endpoint, () =>
                HttpResponse.json({success: true, message: '', data: {ok: true}})
            )
        );

        const result = await createAuthClient().get<{
            success: boolean;
            message: string;
            data: {ok: boolean};
        }>('ping');

        expect(result).toEqual({success: true, message: '', data: {ok: true}});
    });

    it('maps a 500 response to the generic "something went wrong" message', async () => {
        server.use(http.get(endpoint, () => new HttpResponse(null, {status: 500})));

        await expect(createAuthClient().get('ping')).rejects.toThrow(
            GENERAL_ERROR_MSGS.SOMETHING_WENT_WRONG
        );
    });

    it('surfaces the API-provided error message for a structured error response', async () => {
        server.use(
            http.get(endpoint, () =>
                HttpResponse.json(
                    {success: false, error: {message: 'Book not found'}},
                    {status: 404}
                )
            )
        );

        await expect(createAuthClient().get('ping')).rejects.toThrow('Book not found');
    });

    it('falls back to the unknown error message when the response has no structured error', async () => {
        server.use(http.get(endpoint, () => HttpResponse.json({oops: true}, {status: 400})));

        await expect(createAuthClient().get('ping')).rejects.toThrow(
            GENERAL_ERROR_MSGS.UNKNOWN_ERROR
        );
    });

    it('falls back to the unknown error message on a network error', async () => {
        server.use(http.get(endpoint, () => HttpResponse.error()));

        await expect(createAuthClient().get('ping')).rejects.toThrow(
            GENERAL_ERROR_MSGS.UNKNOWN_ERROR
        );
    });
});

describe('createPrivateClient with auth interceptors', () => {
    // Interceptors stack up on the shared instance, so install them once and
    // change what they return through these variables instead.
    let accessToken = '';
    const refreshAccessToken = vi.fn();

    beforeAll(() => {
        setupAuthInterceptors({getAccessToken: () => accessToken, refreshAccessToken});
    });

    beforeEach(() => {
        accessToken = 'old-token';
        refreshAccessToken.mockReset();
        // Simulates a slow refresh that stores a new access token.
        refreshAccessToken.mockImplementation(
            () =>
                new Promise((resolve) => {
                    setTimeout(() => {
                        accessToken = 'new-token';
                        resolve(undefined);
                    }, 20);
                })
        );
    });

    /** Answers 200 only to the new token, 401 to anything else, and counts requests. */
    const mockProtectedEndpoint = () => {
        const calls = {count: 0};
        server.use(
            http.get(endpoint, ({request}) => {
                calls.count += 1;
                if (request.headers.get('authorization') === 'Bearer new-token') {
                    return HttpResponse.json({success: true, message: '', data: {ok: true}});
                }
                return HttpResponse.json(
                    {success: false, error: {message: 'Invalid or expired token'}},
                    {status: 401}
                );
            })
        );
        return calls;
    };

    it('sends the access token as a Bearer header', async () => {
        accessToken = 'new-token';
        mockProtectedEndpoint();

        await expect(createPrivateClient().get('ping')).resolves.toMatchObject({success: true});
    });

    it('does not send an Authorization header when there is no access token', async () => {
        accessToken = '';
        let authorization: string | null = 'not checked';
        server.use(
            http.get(endpoint, ({request}) => {
                authorization = request.headers.get('authorization');
                return HttpResponse.json({success: true, message: '', data: {}});
            })
        );

        await createPrivateClient().get('ping');

        expect(authorization).toBeNull();
    });

    it('refreshes on a 401 and retries the request with the new token', async () => {
        const calls = mockProtectedEndpoint();

        await expect(createPrivateClient().get('ping')).resolves.toMatchObject({success: true});

        expect(refreshAccessToken).toHaveBeenCalledTimes(1);
        expect(calls.count).toBe(2);
    });

    it('retries only once when the retried request also gets a 401', async () => {
        const calls = mockProtectedEndpoint();
        // The refresh "works" but the token is still rejected.
        refreshAccessToken.mockResolvedValue(undefined);

        await expect(createPrivateClient().get('ping')).rejects.toThrow('Invalid or expired token');

        expect(refreshAccessToken).toHaveBeenCalledTimes(1);
        expect(calls.count).toBe(2);
    });

    it('does not retry when the refresh fails', async () => {
        const calls = mockProtectedEndpoint();
        refreshAccessToken.mockRejectedValue(new Error('Refresh failed'));

        await expect(createPrivateClient().get('ping')).rejects.toThrow();

        expect(calls.count).toBe(1);
    });

    it('shares one refresh between requests that get a 401 at the same time', async () => {
        const calls = mockProtectedEndpoint();
        const client = createPrivateClient();

        const results = await Promise.all([
            client.get('ping'),
            client.get('ping'),
            client.get('ping'),
        ]);

        expect(results).toHaveLength(3);
        expect(refreshAccessToken).toHaveBeenCalledTimes(1);
        expect(calls.count).toBe(6);
    });

    it('does not refresh for errors other than 401', async () => {
        server.use(http.get(endpoint, () => new HttpResponse(null, {status: 500})));

        await expect(createPrivateClient().get('ping')).rejects.toThrow(
            GENERAL_ERROR_MSGS.SOMETHING_WENT_WRONG
        );

        expect(refreshAccessToken).not.toHaveBeenCalled();
    });
});
