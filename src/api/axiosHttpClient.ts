import axios, {AxiosError, AxiosInstance, HttpStatusCode} from 'axios';
import {getEnvVariables} from '@helpers/getEnvVariables';
import {GENERAL_ERROR_MSGS} from '@constants/errorMessages';
import {
    IApiErrorResponse,
    IAuthInterceptors,
    IHttpClient,
    IHttpRequestConfig,
} from '@api/api.interfaces';

const privateInstance = axios.create({
    baseURL: getEnvVariables().api_url,
    headers: {
        Accept: 'application/json',
    },
});

const isApiErrorResponse = (data: unknown): data is IApiErrorResponse => {
    if (typeof data !== 'object' || data === null) return false;
    if (!('error' in data)) return false;
    if (typeof data.error !== 'object' || data.error === null) return false;
    return 'message' in data.error;
};

const handleError = (error: unknown): never => {
    if (error instanceof AxiosError) {
        if (error.response?.status === HttpStatusCode.InternalServerError) {
            throw new Error(GENERAL_ERROR_MSGS.SOMETHING_WENT_WRONG);
        }
        const responseData = error.response?.data;
        if (isApiErrorResponse(responseData)) {
            throw new Error(responseData.error.message);
        }
        throw new Error(GENERAL_ERROR_MSGS.UNKNOWN_ERROR);
    }
    throw new Error(GENERAL_ERROR_MSGS.UNKNOWN_ERROR);
};

const buildAdapter = (instance: AxiosInstance): IHttpClient => ({
    async get<T, P extends object = Record<string, unknown>>(
        url: string,
        config?: IHttpRequestConfig<P>
    ): Promise<T> {
        try {
            const {data} = await instance.get<T>(url, {params: config?.params});
            return data;
        } catch (error) {
            return handleError(error);
        }
    },

    async post<T, P extends object = Record<string, unknown>>(
        url: string,
        body?: unknown,
        config?: IHttpRequestConfig<P>
    ): Promise<T> {
        try {
            const {data} = await instance.post<T>(url, body, {params: config?.params});
            return data;
        } catch (error) {
            return handleError(error);
        }
    },

    async put<T, P extends object = Record<string, unknown>>(
        url: string,
        body?: unknown,
        config?: IHttpRequestConfig<P>
    ): Promise<T> {
        try {
            const {data} = await instance.put<T>(url, body, {params: config?.params});
            return data;
        } catch (error) {
            return handleError(error);
        }
    },

    async delete<T, P extends object = Record<string, unknown>>(
        url: string,
        config?: IHttpRequestConfig<P>
    ): Promise<T> {
        try {
            const {data} = await instance.delete<T>(url, {params: config?.params});
            return data;
        } catch (error) {
            return handleError(error);
        }
    },
});

export const createAuthClient = (): IHttpClient => {
    const instance = axios.create({
        baseURL: getEnvVariables().api_url,
        withCredentials: true,
    });
    return buildAdapter(instance);
};

export const createPrivateClient = (): IHttpClient => {
    return buildAdapter(privateInstance);
};

export const setupAuthInterceptors = ({getAccessToken, refreshAccessToken}: IAuthInterceptors) => {
    privateInstance.interceptors.request.use((config) => {
        const token = getAccessToken();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    });

    let refreshPromise: Promise<unknown> | null = null;

    privateInstance.interceptors.response.use(
        (response) => response,
        async (error: unknown) => {
            if (
                error instanceof AxiosError &&
                error.response?.status === HttpStatusCode.Unauthorized &&
                error.config &&
                !error.config._retry
            ) {
                error.config._retry = true;

                if (!refreshPromise) {
                    refreshPromise = refreshAccessToken().finally(() => {
                        refreshPromise = null;
                    });
                }
                await refreshPromise;
                return privateInstance(error.config);
            }
            throw error;
        }
    );
};
