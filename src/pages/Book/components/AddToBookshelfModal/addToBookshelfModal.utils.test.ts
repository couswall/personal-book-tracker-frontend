import {describe, expect, it} from 'vitest';
import {getShelfIcon} from '@pages/Book/components/AddToBookshelfModal/addToBookshelfModal.utils';

describe('getShelfIcon', () => {
    it('returns the icon for each known default shelf', () => {
        expect(getShelfIcon('To Be Read')).toBe('fa-solid fa-hourglass-half');
        expect(getShelfIcon('Currently Reading')).toBe('fa-solid fa-book-open');
        expect(getShelfIcon('Read')).toBe('fa-solid fa-check-double');
    });

    it('is case-insensitive', () => {
        expect(getShelfIcon('READ')).toBe('fa-solid fa-check-double');
    });

    it('trims surrounding whitespace', () => {
        expect(getShelfIcon('  read  ')).toBe('fa-solid fa-check-double');
    });

    it('falls back to the default book icon for an unknown shelf name', () => {
        expect(getShelfIcon('Favorites')).toBe('fa-solid fa-book');
    });

    it('falls back to the default book icon for an empty name', () => {
        expect(getShelfIcon('')).toBe('fa-solid fa-book');
    });
});
