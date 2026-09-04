import {describe, expect, it} from 'vitest';
import {http, HttpResponse} from 'msw';
import {createPrivateClient, createPublicClient} from '@api/axiosHttpClient';
import {apiUrl} from '@constants/apiEndpoints';
import {GENERAL_ERROR_MSGS} from '@constants/errorMessages';
import {server} from '@src/testUtils/mswServer';

const endpoint = `${apiUrl}ping`;

describe('createPublicClient', () => {
    it('unwraps the response data on success', async () => {
        server.use(
            http.get(endpoint, () =>
                HttpResponse.json({success: true, message: '', data: {ok: true}})
            )
        );

        const result = await createPublicClient().get<{
            success: boolean;
            message: string;
            data: {ok: boolean};
        }>('ping');

        expect(result).toEqual({success: true, message: '', data: {ok: true}});
    });

    it('maps a 500 response to the generic "something went wrong" message', async () => {
        server.use(http.get(endpoint, () => new HttpResponse(null, {status: 500})));

        await expect(createPublicClient().get('ping')).rejects.toThrow(
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

        await expect(createPublicClient().get('ping')).rejects.toThrow('Book not found');
    });

    it('falls back to the unknown error message when the response has no structured error', async () => {
        server.use(http.get(endpoint, () => HttpResponse.json({oops: true}, {status: 400})));

        await expect(createPublicClient().get('ping')).rejects.toThrow(
            GENERAL_ERROR_MSGS.UNKNOWN_ERROR
        );
    });

    it('falls back to the unknown error message on a network error', async () => {
        server.use(http.get(endpoint, () => HttpResponse.error()));

        await expect(createPublicClient().get('ping')).rejects.toThrow(
            GENERAL_ERROR_MSGS.UNKNOWN_ERROR
        );
    });
});

describe('createPrivateClient', () => {
    it('sends the bearer token with the request', async () => {
        server.use(
            http.get(endpoint, ({request}) =>
                HttpResponse.json({
                    success: true,
                    message: '',
                    data: {authorization: request.headers.get('authorization')},
                })
            )
        );

        const result = await createPrivateClient('secret-token').get<{
            success: boolean;
            message: string;
            data: {authorization: string | null};
        }>('ping');

        expect(result.data).toEqual({authorization: 'Bearer secret-token'});
    });
});
