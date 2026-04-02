export interface IGetBookshelvesWithStatusParams {
    token: string;
    userId: number;
    apiBookId: string;
    setBookshelves: React.Dispatch<React.SetStateAction<IBookshelfWithStatus[]>>;
}

export interface IBookshelfWithStatus {
    id: number;
    name: string;
    isSelected: boolean;
    bookshelfBookId: number | null;
    bookCount: number;
    isCustom: boolean;
}

export interface IGetBookshelvesWithStatusResponse {
    bookshelves: IBookshelfWithStatus[];
}
