import {describe, expect, it} from 'vitest';
import {
    getRemovalWarning,
    getShelfIcon,
} from '@pages/Book/components/AddToBookshelfModal/addToBookshelfModal.utils';
import {buildRead} from '@pages/Book/components/AddToBookshelfModal/bookshelfSelection.fixtures';

describe('getShelfIcon', () => {
    it('returns the icon for each shelf type', () => {
        expect(getShelfIcon('TO_BE_READ')).toBe('fa-solid fa-hourglass-half');
        expect(getShelfIcon('CURRENTLY_READING')).toBe('fa-solid fa-book-open');
        expect(getShelfIcon('READ')).toBe('fa-solid fa-check-double');
    });
});

describe('getRemovalWarning', () => {
    it('returns null when the book was never finished', () => {
        expect(getRemovalWarning([])).toBeNull();
    });

    it('lists every read year, newest first, without duplicates', () => {
        const reads = [
            buildRead('2026-03-15T00:00:00.000Z'),
            buildRead('2026-01-02T00:00:00.000Z'),
            buildRead('2021-06-02T00:00:00.000Z'),
        ];
        expect(getRemovalWarning(reads)).toEqual([
            'This also deletes your reads of this book (2026, 2021).',
        ]);
    });

    it('adds the challenge years only for reads with a challenge', () => {
        const reads = [
            buildRead('2026-03-15T00:00:00.000Z', true),
            buildRead('2021-06-02T00:00:00.000Z', false),
        ];
        expect(getRemovalWarning(reads)).toEqual([
            'This also deletes your reads of this book (2026, 2021).',
            'It will be removed from your 2026 reading challenge.',
        ]);
    });

    it('uses the UTC year of dates stored at UTC midnight', () => {
        expect(getRemovalWarning([buildRead('2026-01-01T00:00:00.000Z')])).toEqual([
            'This also deletes your reads of this book (2026).',
        ]);
    });
});
