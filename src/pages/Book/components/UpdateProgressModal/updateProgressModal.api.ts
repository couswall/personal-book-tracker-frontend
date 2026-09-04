import {urlWeb} from '@constants/apiEndpoints';
import {createPrivateClient} from '@api/httpClient';
import {IApiResponse} from '@api/api.interfaces';
import {
    IBookshelfBookProgress,
    IUpdateReadingProgressParams,
} from '@pages/Book/components/UpdateProgressModal/updateProgressModal.interfaces';

export const updateReadingProgress = async (
    params: IUpdateReadingProgressParams
): Promise<IBookshelfBookProgress> => {
    const client = createPrivateClient(params.token);
    const response = await client.put<IApiResponse<{bookshelfBook: IBookshelfBookProgress}>>(
        urlWeb.updateReadingProgress,
        {
            bookshelfBookId: params.bookshelfBookId,
            progressType: params.progressType,
            value: params.value,
            isFinished: params.isFinished,
        }
    );
    await params.onSuccess();
    return response.data.bookshelfBook;
};
