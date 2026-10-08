import {urlWeb} from '@constants/apiEndpoints';
import {createPrivateClient} from '@api/httpClient';
import {IApiResponse} from '@api/api.interfaces';
import {IDashboard, IGetDashboardParams, IGetDashboardResponse} from '@pages/Home/home.interfaces';

export const getDashboard = async ({token}: IGetDashboardParams): Promise<IDashboard> => {
    const client = createPrivateClient(token);
    const {data} = await client.get<IApiResponse<IGetDashboardResponse>>(urlWeb.getDashboard);
    return data.dashboard;
};
