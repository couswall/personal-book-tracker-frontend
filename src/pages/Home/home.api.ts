import {urlWeb} from '@constants/apiEndpoints';
import {createPrivateClient} from '@api/httpClient';
import {IApiResponse} from '@api/api.interfaces';
import {IDashboard, IGetDashboardResponse} from '@pages/Home/home.interfaces';

export const getDashboard = async (): Promise<IDashboard> => {
    const client = createPrivateClient();
    const {data} = await client.get<IApiResponse<IGetDashboardResponse>>(urlWeb.getDashboard);
    return data.dashboard;
};
