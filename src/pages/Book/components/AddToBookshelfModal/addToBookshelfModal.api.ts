import {urlWeb} from '@constants/apiEndpoints';
import {createPrivateClient} from '@api/httpClient';
import {
    IAddToBookshelfParams,
    IRemoveBookFromBookshelfParams,
    IUpdateBookshelfParams,
} from '@pages/Book/components/AddToBookshelfModal/addToBookshelfModal.interfaces';

export const addBookToBookshelf = async (params: IAddToBookshelfParams) => {
    const client = createPrivateClient(params.token);
    await client.post(urlWeb.addBookToBookshelf, {
        bookshelfId: params.bookshelfId,
        apiBookId: params.apiBookId,
    });
};

export const updateBookshelf = async (params: IUpdateBookshelfParams) => {
    const client = createPrivateClient(params.token);
    await client.put(urlWeb.updateBookToBookshelf, {
        bookshelfBookId: params.bookshelfBookId,
        bookshelfId: params.bookshelfId,
    });
};

export const removeBookFromBookshelf = async (params: IRemoveBookFromBookshelfParams) => {
    const client = createPrivateClient(params.token);
    const endpoint = urlWeb.removeBookFromBookshelf.replace(
        ':bookshelfBookId',
        params.bookshelfBookId.toString()
    );
    await client.delete(endpoint);
};
