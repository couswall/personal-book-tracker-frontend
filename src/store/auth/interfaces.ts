export enum AuthStatus {
    Authenticated = 'authenticated',
    Checking = 'checking',
    NoAuthenticated = 'no-authenticated',
}

export interface IAuthSliceState{
    status: AuthStatus;
    user: IUser;
    token: string;
    loadings: IAuthSliceLoadings;
    errors: IAuthSliceErrors;
}

export interface IUser {
    id: number;
    fullName: string;
    username: string;
    email: string;
}

export interface IAuthSliceLoadings{
    loginLoading: boolean;
    registerUserLoading: boolean;
    refreshTokenLoading: boolean;
}

export interface IAuthSliceErrors{
    loginErrorMsg?: string;
    registerUserErrorMsg?: string;
    refreshTokenErrorMsg?: string;
}

export interface ILoginSuccessRes{
    user: IUser;
    token: string;
}

export interface ILoginFetchResponse{
    success: boolean;
    message: string;
    data: ILoginSuccessRes;
}

export interface IRegisterUserParams{
    fullName: string;
    username: string;
    email: string;
    password: string;
}

export interface ILoginParams{
    emailOrUsername: string;
    password: string;
}