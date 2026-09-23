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
