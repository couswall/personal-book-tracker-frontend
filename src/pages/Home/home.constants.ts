import {BookshelfType} from '@pages/Book/book.interfaces';
import {privateRoutes} from '@routes/routes';

export const getBookDetailPath = (apiBookId: string): string =>
    privateRoutes.book.replace(':id', encodeURIComponent(apiBookId));

/** "1 book", "3 books". */
export const pluralizeBooks = (count: number): string =>
    `${count} ${count === 1 ? 'book' : 'books'}`;

export const HOME_TEXTS = {
    CURRENTLY_READING_TITLE: 'Currently Reading',
    PROGRESS_LABEL: 'Progress',
    UPDATE_PROGRESS: 'Update progress',
    PAGE_OF: (currentPage: number, totalPages: number) => `Page ${currentPage} of ${totalPages}`,
    MORE_BOOKS: (count: number) => `+${count} more`,
    WANT_TO_READ_TITLE: 'Want to Read',
    CHALLENGE_TITLE: (year: number) => `Reading Challenge ${year}`,
    CHALLENGE_PERCENTAGE: (percentage: number) => `${percentage}%`,
    BOOKS_OF_GOAL: (booksRead: number, goal: number) => `${booksRead} of ${pluralizeBooks(goal)}`,
    VIEW_CHALLENGE_DETAILS: 'View details',
    CURRENTLY_READING_EMPTY_TITLE: 'Ready for your next read?',
    CURRENTLY_READING_EMPTY_DESCRIPTION:
        'Search for a book and start tracking your reading progress.',
    CURRENTLY_READING_EMPTY_BUTTON: 'Search books',
    WANT_TO_READ_EMPTY_TITLE: 'Your reading list is empty',
    WANT_TO_READ_EMPTY_DESCRIPTION: "Save books you'd like to read later and they'll appear here.",
    WANT_TO_READ_EMPTY_BUTTON: 'Find a book',
    CHALLENGE_EMPTY_TITLE: (year: number) => `Set a reading challenge for ${year}`,
    CHALLENGE_EMPTY_DESCRIPTION:
        "Choose how many books you'd like to read and keep track of your progress throughout the year.",
    CHALLENGE_EMPTY_BUTTON: 'Set a Challenge',
    ERROR_TITLE: "We couldn't load your dashboard",
    ERROR_DESCRIPTION: 'Something went wrong on our side. Please try again.',
    RETRY: 'Try again',
};

/** Pieces of the reading challenge's motivational message. See buildChallengeMessage. */
export const CHALLENGE_MESSAGES = {
    COMPLETED: (goal: number) => `You reached your goal of ${pluralizeBooks(goal)}!`,
    AHEAD: "You're ahead of schedule! Keep it up!",
    ON_TRACK: "You're right on track.",
    BEHIND: (booksBehind: number) => `You're ${pluralizeBooks(booksBehind)} behind.`,
    CATCH_UP: (booksPerMonth: string) => `Read about ${booksPerMonth} a month to catch up.`,
    THIS_MONTH: (booksThisMonth: number) =>
        `You've read ${pluralizeBooks(booksThisMonth)} this month.`,
    FINISH_BY: (month: string) => `You're on track to finish by ${month}.`,
};

export const SHELF_ICONS: Record<BookshelfType, string> = {
    READ: 'fa-solid fa-book',
    CURRENTLY_READING: 'fa-solid fa-book-open',
    TO_BE_READ: 'fa-solid fa-hourglass-half',
};
