import {describe, expect, it} from 'vitest';
import {getEnvVariables} from '@helpers/getEnvVariables';

describe('getEnvVariables', () => {
    it('reads mode and api_url from the Vite env', () => {
        const env = getEnvVariables();

        expect(env).toEqual({
            mode: import.meta.env.VITE_MODE,
            api_url: import.meta.env.VITE_API_URL,
        });
    });
});
