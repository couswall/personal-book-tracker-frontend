import {IDashboard, IShelfBook} from '@pages/Home/home.interfaces';

export const pageBook: IShelfBook = {
    bookshelfBookId: 11,
    apiBookId: 'hobbit-1937',
    title: 'The Hobbit',
    authors: ['J.R.R. Tolkien', 'Christopher Tolkien'],
    coverImageUrl: null,
    readingProgress: 40,
    currentPage: 124,
    totalPages: 310,
    progressType: 'PAGE',
};

export const percentageBook: IShelfBook = {
    bookshelfBookId: 12,
    apiBookId: 'dune-1965',
    title: 'Dune',
    authors: ['Frank Herbert'],
    coverImageUrl: 'https://example.com/dune.jpg',
    readingProgress: 75,
    currentPage: null,
    totalPages: null,
    progressType: 'PERCENTAGE',
};

export const dashboard: IDashboard = {
    shelves: [
        {id: 1, name: 'Read', type: 'READ', bookCount: 42},
        {id: 2, name: 'Currently Reading', type: 'CURRENTLY_READING', bookCount: 5},
        {id: 3, name: 'Want to Read', type: 'TO_BE_READ', bookCount: 9},
    ],
    currentlyReading: {total: 5, books: [pageBook, percentageBook]},
    wantToRead: {
        total: 1,
        books: [
            {bookshelfBookId: 21, apiBookId: 'circe-2018', title: 'Circe', coverImageUrl: null},
        ],
    },
    readingChallenge: {
        year: 2026,
        goal: 20,
        booksRead: 22,
        booksThisMonth: 0,
        progress: {
            remaining: 0,
            percentage: 110,
            expectedByNow: 15,
            status: 'COMPLETED',
            booksAheadOrBehind: 7,
            booksPerMonthNeeded: 0,
            projectedFinishDate: null,
        },
    },
};

export const emptyDashboard: IDashboard = {
    shelves: dashboard.shelves.map((shelf) => ({...shelf, bookCount: 0})),
    currentlyReading: {total: 0, books: []},
    wantToRead: {total: 0, books: []},
    readingChallenge: {year: 2026, goal: null, booksRead: 0, booksThisMonth: 0, progress: null},
};
