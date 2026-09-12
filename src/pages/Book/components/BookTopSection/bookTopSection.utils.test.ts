import {describe, it, expect} from 'vitest';
import {formatIsoDate} from '@pages/Book/components/BookTopSection/bookTopSection.utils';

describe('BookTopSection utils', () => {
    it('formats an ISO date string in en-US long format', () => {
        expect(formatIsoDate('2024-03-15T00:00:00.000Z')).toBe('March 15, 2024');
    });

    it('formats another date correctly', () => {
        expect(formatIsoDate('2000-01-01T00:00:00.000Z')).toBe('January 01, 2000');
    });

    it('pads single-digit days with a leading zero', () => {
        expect(formatIsoDate('2024-12-05T00:00:00.000Z')).toBe('December 05, 2024');
    });

    it('handles the end of a year', () => {
        expect(formatIsoDate('1999-12-31T00:00:00.000Z')).toBe('December 31, 1999');
    });

    it('handles a leap day', () => {
        expect(formatIsoDate('2024-02-29T00:00:00.000Z')).toBe('February 29, 2024');
    });

    it('returns "Invalid Date" for an invalid input', () => {
        expect(() => formatIsoDate('not-a-date')).toThrow();
    });
});
