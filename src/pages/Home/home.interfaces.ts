import {BookshelfType} from '@pages/Book/book.interfaces';
import {ProgressInputMethod} from '@pages/Book/components/UpdateProgressModal/updateProgressModal.interfaces';

export type ReadingProgressType = ProgressInputMethod;

export type ChallengeStatus = 'AHEAD' | 'ON_TRACK' | 'BEHIND' | 'COMPLETED';

export interface IDashboardShelf {
    id: number;
    name: string;
    type: BookshelfType;
    bookCount: number;
}

export interface IShelfBook {
    /** The id the progress-update endpoint needs. */
    bookshelfBookId: number;
    /** Links to the book detail page. */
    apiBookId: string;
    title: string;
    authors: string[];
    coverImageUrl: string | null;
    /** 0–100 percent. */
    readingProgress: number;
    currentPage: number | null;
    totalPages: number | null;
    progressType: ReadingProgressType | null;
}

export interface IWantToReadBook {
    bookshelfBookId: number;
    apiBookId: string;
    title: string;
    coverImageUrl: string | null;
}

export interface IChallengeProgress {
    remaining: number;
    /** Can go past 100 (e.g. 110). Clamp only the bar, show the real number. */
    percentage: number;
    expectedByNow: number;
    status: ChallengeStatus;
    /** Positive = ahead, negative = behind. */
    booksAheadOrBehind: number;
    /** Null when the year is over and the goal was missed. */
    booksPerMonthNeeded: number | null;
    /** ISO date at UTC midnight, e.g. "2026-11-12T00:00:00.000Z". */
    projectedFinishDate: string | null;
}

export interface IDashboardReadingChallenge {
    /** Current UTC year. */
    year: number;
    /** Null when the user hasn't set a challenge this year. */
    goal: number | null;
    booksRead: number;
    booksThisMonth: number;
    /** Null exactly when goal is null. */
    progress: IChallengeProgress | null;
}

export interface IDashboard {
    shelves: IDashboardShelf[];
    /** At most 3 books, most recently updated first. */
    currentlyReading: {total: number; books: IShelfBook[]};
    /** At most 8 books, most recently added first. */
    wantToRead: {total: number; books: IWantToReadBook[]};
    readingChallenge: IDashboardReadingChallenge;
}

export interface IGetDashboardResponse {
    dashboard: IDashboard;
}

export interface IGetDashboardParams {
    token: string;
}

export type DashboardStatus = 'loading' | 'error' | 'success';
