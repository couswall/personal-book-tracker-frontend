export interface IBaseFetchRes {
    success: boolean;
    message?: string;
    error?: IErrorResponse;
}

export interface IErrorResponse {
    message: string;
}

export interface IGetBookByIdFetchRes extends IBaseFetchRes {
    data?: IBook;
}

export interface IBook {
    id: number;
    apiBookId: string;
    title: string;
    authors: string[];
    description: string | null;
    publishedDate: string | null;
    coverImageUrl: string | null;
    categories: string[];
    pageCount: number;
    averageRating: number;
    reviewCount: number;
    subtitle: string | null;
    deletedAt: Date | null;
}

export interface IGetBookByIdInitialState {
    book: IBook | null;
    loading: boolean;
    error: string | undefined;
}
