import axios, {AxiosError, AxiosResponse} from 'axios';
import {apiUrl, urlWeb} from '@constants/apiEndpoints';
import {
    IGetBookshelvesWithStatusParams,
    IGetBookshelvesWithStatusResponse,
} from '@pages/Book/book.interfaces';

export const getBookshelvesWithStatus = async (params: IGetBookshelvesWithStatusParams) => {
    const headers = {
        Authorization: `Bearer ${params.token}`,
        Accept: 'application/json',
    };

    try {
        const endpoint = urlWeb.getBookshelvesWithStatus
            .replace(':userId', params.userId.toString())
            .replace(':apiBookId', params.apiBookId);
        const {data}: AxiosResponse<IGetBookshelvesWithStatusResponse> = await axios.get(
            `${apiUrl}${endpoint}`,
            {headers}
        );
        params.setBookshelves(data.data.bookshelves);
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(error.response?.data.error?.message || 'Unknown error');
        }
        throw new Error('Unknown error');
    }
};
