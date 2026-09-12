import '@testing-library/jest-dom/vitest';
import {afterAll, afterEach, beforeAll, vi} from 'vitest';
import {cleanup} from '@testing-library/react';
import {server} from '@src/testUtils/mswServer';

// jsdom doesn't implement scrollTo; stub it so components that call it don't warn.
window.scrollTo = vi.fn();

beforeAll(() => server.listen({onUnhandledRequest: 'error'}));

afterEach(() => {
    cleanup();
    server.resetHandlers();
});

afterAll(() => server.close());
