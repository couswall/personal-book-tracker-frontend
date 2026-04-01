import {getEnvVariables} from '@helpers/getEnvVariables';

export const apiUrl = getEnvVariables().api_url;

export const urlWeb = {
    login: 'auth/login',
    registerUser: 'auth/register',
    refreshToken: 'auth/refresh',
    getBookById: 'book/bookById',
    searchBook: 'book/search',
    getBookshelvesWithStatus: 'bookshelf/bookStatus/:userId/:apiBookId',
    addBookToBookshelf: 'bookshelfBook/addToBookshelf',
    updateBookToBookshelf: 'bookshelfBook/updateBookshelf',
    removeBookFromBookshelf: 'bookshelfBook/:bookshelfBookId',
};
