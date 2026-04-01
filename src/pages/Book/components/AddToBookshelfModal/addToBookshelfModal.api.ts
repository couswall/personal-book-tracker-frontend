import axios, {AxiosError} from 'axios';
import {apiUrl, urlWeb} from '@constants/apiEndpoints';
import {
    IAddToBookshelfParams,
    IRemoveBookFromBookshelfParams,
    IUpdateBookshelfParams,
} from '@pages/Book/components/AddToBookshelfModal/addToBookshelfModal.interfaces';

export const addBookToBookshelf = async (params: IAddToBookshelfParams) => {
    const headers = {
        Authorization: `Bearer ${params.token}`,
        Accept: 'application/json',
    };

    try {
        await axios.post(
            `${apiUrl}${urlWeb.addBookToBookshelf}`,
            {
                bookshelfId: params.bookshelfId,
                apiBookId: params.apiBookId,
            },
            {headers}
        );
        await params.onSuccess();
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(error.response?.data.error?.message || 'Unknown error');
        }
        throw new Error('Unknown error');
    }
};

export const updateBookshelf = async (params: IUpdateBookshelfParams) => {
    const headers = {
        Authorization: `Bearer ${params.token}`,
        Accept: 'application/json',
    };

    try {
        await axios.put(
            `${apiUrl}${urlWeb.updateBookToBookshelf}`,
            {
                bookshelfBookId: params.bookshelfBookId,
                bookshelfId: params.bookshelfId,
            },
            {headers}
        );
        await params.onSuccess();
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(error.response?.data.error?.message || 'Unknown error');
        }
        throw new Error('Unknown error');
    }
};

export const removeBookFromBookshelf = async (params: IRemoveBookFromBookshelfParams) => {
    const headers = {
        Authorization: `Bearer ${params.token}`,
        Accept: 'application/json',
    };

    try {
        const endpoint = urlWeb.removeBookFromBookshelf.replace(
            ':bookshelfBookId',
            params.bookshelfBookId.toString()
        );
        await axios.delete(`${apiUrl}${endpoint}`, {headers});
        await params.onSuccess();
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(error.response?.data.error?.message || 'Unknown error');
        }
        throw new Error('Unknown error');
    }
};
