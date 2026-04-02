export interface IHttpRequestConfig<P extends object = Record<string, unknown>> {
    params?: P;
}

export interface IHttpClient {
    get<T, P extends object = Record<string, unknown>>(
        url: string,
        config?: IHttpRequestConfig<P>
    ): Promise<T>;
    post<T, P extends object = Record<string, unknown>>(
        url: string,
        body?: unknown,
        config?: IHttpRequestConfig<P>
    ): Promise<T>;
    put<T, P extends object = Record<string, unknown>>(
        url: string,
        body?: unknown,
        config?: IHttpRequestConfig<P>
    ): Promise<T>;
    delete<T, P extends object = Record<string, unknown>>(
        url: string,
        config?: IHttpRequestConfig<P>
    ): Promise<T>;
}

export interface IApiResponse<T> {
    data: T;
    success: boolean;
    message: string;
}

export interface IApiError {
    message: string;
}

export interface IApiErrorResponse {
    success: boolean;
    error: IApiError;
}
