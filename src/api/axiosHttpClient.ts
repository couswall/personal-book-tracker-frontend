import axios, {AxiosError, AxiosInstance, HttpStatusCode} from 'axios';
import {getEnvVariables} from '@helpers/getEnvVariables';
import {GENERAL_ERROR_MSGS} from '@constants/errorMessages';
import {IApiErrorResponse, IHttpClient, IHttpRequestConfig} from '@api/api.interfaces';

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

export const createPublicClient = (): IHttpClient => {
    const instance = axios.create({
        baseURL: getEnvVariables().api_url,
    });
    return buildAdapter(instance);
};

export const createPrivateClient = (token: string): IHttpClient => {
    const instance = axios.create({
        baseURL: getEnvVariables().api_url,
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
        },
    });
    return buildAdapter(instance);
};
