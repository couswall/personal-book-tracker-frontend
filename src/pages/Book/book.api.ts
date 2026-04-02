import {urlWeb} from '@constants/apiEndpoints';
import {createPrivateClient} from '@api/httpClient';
import {
    IGetBookshelvesWithStatusParams,
    IGetBookshelvesWithStatusResponse,
} from '@pages/Book/book.interfaces';
import {IApiResponse} from '@api/api.interfaces';

export const getBookshelvesWithStatus = async (params: IGetBookshelvesWithStatusParams) => {
    const client = createPrivateClient(params.token);
    const endpoint = urlWeb.getBookshelvesWithStatus
        .replace(':userId', params.userId.toString())
        .replace(':apiBookId', params.apiBookId);

    const {data} = await client.get<IApiResponse<IGetBookshelvesWithStatusResponse>>(endpoint);
    params.setBookshelves(data.bookshelves);
};
