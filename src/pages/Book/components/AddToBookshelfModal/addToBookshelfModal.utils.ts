import {
    REMOVAL_WARNING_TEXTS,
    SHELF_ICONS,
} from '@pages/Book/components/AddToBookshelfModal/addToBookshelfModal.constants';
import {BookshelfType, IRead} from '@pages/Book/book.interfaces';

export const getShelfIcon = (type: BookshelfType): string =>
    SHELF_ICONS[type] ?? 'fa-solid fa-book';

/** UTC on purpose: finish dates are stored at UTC midnight. */
const getReadYear = (read: IRead): number => new Date(read.finishedAt).getUTCFullYear();

const uniqueYears = (reads: IRead[]): number[] => [...new Set(reads.map(getReadYear))];

/**
 * Warning for the Remove confirmation. Removing a book from any shelf deletes all of its reads,
 * so this lists their years (and the challenge years). null = never finished, no warning block.
 */
export const getRemovalWarning = (reads: IRead[]): string[] | null => {
    if (reads.length === 0) return null;
    const lines = [REMOVAL_WARNING_TEXTS.DELETES_READS(uniqueYears(reads))];
    const challengeYears = uniqueYears(reads.filter((read) => read.hasChallenge));
    if (challengeYears.length > 0) {
        lines.push(REMOVAL_WARNING_TEXTS.REMOVED_FROM_CHALLENGE(challengeYears));
    }
    return lines;
};
