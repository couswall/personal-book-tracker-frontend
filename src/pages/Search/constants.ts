export const SEARCH_PAGE = {
    TITLE: 'Search Book',
    PLACEHOLDER: 'Search by book title or author',
    SEARCH_BTN: 'Search',
    PREVIOUS_BTN: 'Previous',
    NEXT_BTN: 'Next',
    PAGE: 'Page',
};

export const MAX_RESULTS = 10;

export const ERROR_MSG = {
    MIN_LENGTH: 'It should include at least two charactes',
    MAX_LENGTH: 'It should include a maximum of fifty characteres',
};

export const searchBooks = [
    {
        id: 1,
        title: 'Clean Code',
        authors: ['Robert C. Martin'],
        imageCover: 'https://example.com/images/clean-code.jpg',
        averageRating: 4.3,
    },
    {
        id: 2,
        title: "You Don't Know JS",
        authors: ['Kyle Simpson'],
        // imageCover omitted
    },
    {
        id: 3,
        title: 'The Pragmatic Programmer',
        authors: ['Andrew Hunt', 'David Thomas'],
        imageCover: 'https://example.com/images/pragmatic-programmer.jpg',
        averageRating: 3.1,
    },
    {
        id: 4,
        title: 'Refactoring',
        authors: ['Martin Fowler'],
        imageCover: 'https://example.com/images/refactoring.jpg',
        averageRating: 2.8,
    },
    {
        id: 5,
        title: 'Design Patterns: Elements of Reusable Object-Oriented Software',
        authors: ['Erich Gamma', 'Richard Helm', 'Ralph Johnson', 'John Vlissides'],
        imageCover: 'https://example.com/images/design-patterns.jpg',
        averageRating: 4,
    },
    {
        id: 6,
        title: 'Introduction to Algorithms',
        authors: ['Thomas H. Cormen', 'Charles E. Leiserson', 'Ronald L. Rivest', 'Clifford Stein'],
        imageCover: 'https://example.com/images/algorithms.jpg',
        averageRating: 3.5,
    },
    {
        id: 7,
        title: 'Eloquent JavaScript',
        authors: ['Marijn Haverbeke'],
        imageCover: 'https://example.com/images/eloquent-js.jpg',
        averageRating: 2.8,
    },
    {
        id: 8,
        title: 'Head First Design Patterns',
        authors: ['Eric Freeman', 'Elisabeth Robson'],
        imageCover: 'https://example.com/images/head-first-design-patterns.jpg',
        averageRating: 4.8,
    },
    {
        id: 9,
        title: 'Domain-Driven Design',
        authors: ['Eric Evans'],
        imageCover: 'https://example.com/images/domain-driven-design.jpg',
        averageRating: 3.9,
    },
    {
        id: 10,
        title: 'Working Effectively with Legacy Code',
        authors: ['Michael Feathers'],
        imageCover: 'https://example.com/images/legacy-code.jpg',
    },
];
