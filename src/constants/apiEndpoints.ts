import {getEnvVariables} from '@helpers/getEnvVariables';

export const apiUrl = getEnvVariables().api_url;

export const urlWeb = {
    login: 'auth/login',
    registerUser: 'auth/register',
    refreshToken: 'auth/refresh',
    getBookById: 'book/bookById/:id',
    searchBook: 'book/search',
    getBookshelvesWithStatus: 'bookshelf/bookStatus/:apiBookId',
    addBookToBookshelf: 'bookshelfBook/addToBookshelf',
    updateBookToBookshelf: 'bookshelfBook/updateBookshelf',
    removeBookFromBookshelf: 'bookshelfBook/:bookshelfBookId',
    updateReadingProgress: 'bookshelfBook/updateReadingProgress',
    getDashboard: 'dashboard',
};
