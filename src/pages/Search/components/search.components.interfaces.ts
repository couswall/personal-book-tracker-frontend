import {ISearchBook} from '@store/books/searchBook/interfaces';

export interface IBookResultProps {
    book: ISearchBook;
}

export interface IStarRatingProps {
    rating: number;
    size?: string;
}

export interface ISearchResultsProps {
    books?: ISearchBook[];
    loading: boolean;
    hasSearched: boolean;
}
