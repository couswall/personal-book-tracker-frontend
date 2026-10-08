import {beforeEach, describe, expect, it, vi} from 'vitest';
import {getDashboard} from '@pages/Home/home.api';
import {createPrivateClient} from '@api/httpClient';
import {IHttpClient} from '@api/api.interfaces';
import {dashboard} from '@pages/Home/home.fixtures';

vi.mock('@api/httpClient', () => ({
    createPrivateClient: vi.fn(),
}));

const mockedCreatePrivateClient = vi.mocked(createPrivateClient);

const buildClientMock = (overrides: Partial<IHttpClient>): IHttpClient => ({
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
    ...overrides,
});

describe('getDashboard', () => {
    beforeEach(() => {
        mockedCreatePrivateClient.mockReset();
    });

    it('fetches the dashboard with the token and unwraps it from the response', async () => {
        const get = vi.fn().mockResolvedValue({success: true, message: '', data: {dashboard}});
        mockedCreatePrivateClient.mockReturnValue(buildClientMock({get}));

        await expect(getDashboard({token: 'tok'})).resolves.toEqual(dashboard);

        expect(mockedCreatePrivateClient).toHaveBeenCalledWith('tok');
        expect(get).toHaveBeenCalledWith('dashboard');
    });

    it('rejects when the request fails', async () => {
        const get = vi.fn().mockRejectedValue(new Error('Network error'));
        mockedCreatePrivateClient.mockReturnValue(buildClientMock({get}));

        await expect(getDashboard({token: 'tok'})).rejects.toThrow('Network error');
    });
});
