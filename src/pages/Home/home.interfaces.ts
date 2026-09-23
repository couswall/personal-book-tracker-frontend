export interface IHomeStat {
    id: string;
    iconClassName: string;
    label: string;
    value: number;
}

export interface IHomeReadingBook {
    id: string;
    title: string;
    author: string;
    coverImageUrl: string;
    progressPercentage: number;
}

export interface IHomeWantToReadBook {
    id: string;
    title: string;
    coverImageUrl: string;
}

export interface IReadingChallenge {
    year: number;
    booksRead: number;
    booksGoal: number;
    message: string;
}
