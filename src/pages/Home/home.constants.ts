import {
    IHomeReadingBook,
    IHomeStat,
    IHomeWantToReadBook,
    IReadingChallenge,
} from '@pages/Home/home.interfaces';

export const HOME_TEXTS = {
    CURRENTLY_READING_TITLE: 'Currently Reading',
    PROGRESS_LABEL: 'Progress',
    UPDATE_PROGRESS: 'Update progress',
    WANT_TO_READ_TITLE: 'Want to Read',
    VIEW_ALL: 'View all',
    CHALLENGE_TITLE: (year: number) => `Reading Challenge ${year}`,
    BOOKS_GOAL_LABEL: (goal: number) => `of ${goal} books`,
    VIEW_CHALLENGE_DETAILS: 'View Challenge Details',
    CURRENTLY_READING_EMPTY_TITLE: 'Ready for your next read?',
    CURRENTLY_READING_EMPTY_DESCRIPTION:
        'Choose a book from your library and start tracking your reading progress.',
    CURRENTLY_READING_EMPTY_BUTTON: 'Start Reading',
    WANT_TO_READ_EMPTY_TITLE: 'Your reading list is empty',
    WANT_TO_READ_EMPTY_DESCRIPTION: "Save books you'd like to read later and they'll appear here.",
    WANT_TO_READ_EMPTY_BUTTON: 'Add a Book',
    CHALLENGE_EMPTY_TITLE: 'Set a reading goal for this year',
    CHALLENGE_EMPTY_DESCRIPTION:
        "Choose how many books you'd like to read and keep track of your progress throughout the year.",
    CHALLENGE_EMPTY_BUTTON: 'Set a Challenge',
};

export const HOME_STATS: IHomeStat[] = [
    {id: 'total-read', iconClassName: 'fa-solid fa-book', label: 'Total Read', value: 42},
    {id: 'currently-reading', iconClassName: 'fa-solid fa-book-open', label: 'Current', value: 3},
    {id: 'to-read', iconClassName: 'fa-solid fa-hourglass-half', label: 'To Read', value: 128},
];

export const CURRENTLY_READING_BOOKS: IHomeReadingBook[] = [
    {
        id: 'the-hobbit',
        title: 'The Hobbit',
        author: 'J.R.R. Tolkien',
        coverImageUrl: 'https://picsum.photos/seed/the-hobbit/300/400',
        progressPercentage: 65,
    },
    {
        id: 'project-hail-mary',
        title: 'Project Hail Mary',
        author: 'Andy Weir',
        coverImageUrl: 'https://picsum.photos/seed/project-hail-mary/300/400',
        progressPercentage: 82,
    },
    {
        id: 'atomic-habits',
        title: 'Atomic Habits',
        author: 'James Clear',
        coverImageUrl: 'https://picsum.photos/seed/atomic-habits/300/400',
        progressPercentage: 20,
    },
];

export const WANT_TO_READ_BOOKS: IHomeWantToReadBook[] = [
    {
        id: 'great-gatsby',
        title: 'The Great Gatsby',
        coverImageUrl: 'https://picsum.photos/seed/great-gatsby/300/400',
    },
    {
        id: 'normal-people',
        title: 'Normal People',
        coverImageUrl: 'https://picsum.photos/seed/normal-people/300/400',
    },
    {
        id: 'silent-patient',
        title: 'The Silent Patient',
        coverImageUrl: 'https://picsum.photos/seed/silent-patient/300/400',
    },
    {id: 'dune', title: 'Dune', coverImageUrl: 'https://picsum.photos/seed/dune/300/400'},
    {
        id: 'shoe-dog',
        title: 'Shoe Dog',
        coverImageUrl: 'https://picsum.photos/seed/shoe-dog/300/400',
    },
    {
        id: 'deep-work',
        title: 'Deep Work',
        coverImageUrl: 'https://picsum.photos/seed/deep-work/300/400',
    },
    {id: 'circe', title: 'Circe', coverImageUrl: 'https://picsum.photos/seed/circe/300/400'},
];

export const READING_CHALLENGE: IReadingChallenge = {
    year: 2026,
    booksRead: 12,
    booksGoal: 20,
    message:
        "You're ahead of schedule! You've read 3 books this month alone. You're on track to finish by November.",
};
