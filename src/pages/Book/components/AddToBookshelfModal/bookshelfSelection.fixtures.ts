import {vi} from 'vitest';
import {renderHook} from '@testing-library/react';
import {useBookshelfSelection} from '@pages/Book/components/AddToBookshelfModal/useBookshelfSelection';
import {BookshelfType, IBookshelfWithStatus, IRead} from '@pages/Book/book.interfaces';

export const buildShelf = (
    id: number,
    name: string,
    type: BookshelfType,
    overrides: Partial<IBookshelfWithStatus> = {}
): IBookshelfWithStatus => ({
    id,
    name,
    type,
    isSelected: false,
    bookshelfBookId: null,
    bookCount: 0,
    readingProgress: null,
    currentPage: null,
    progressType: null,
    ...overrides,
});

export const toBeRead = buildShelf(1, 'To Be Read', 'TO_BE_READ');
export const reading = buildShelf(2, 'Currently Reading', 'CURRENTLY_READING');
export const read = buildShelf(3, 'Read', 'READ');
export const onRead = buildShelf(3, 'Read', 'READ', {isSelected: true, bookshelfBookId: 58});

export const buildRead = (finishedAt: string, hasChallenge = false): IRead => ({
    finishedAt,
    hasChallenge,
});

export const renderSelection = (bookshelves: IBookshelfWithStatus[], reads: IRead[] = []) =>
    renderHook(() =>
        useBookshelfSelection({
            bookshelves,
            reads,
            token: 'tok',
            bookId: 'OXf3o_EBrxYC',
            onRefresh: vi.fn().mockResolvedValue(undefined),
            onCloseModal: vi.fn(),
        })
    );
