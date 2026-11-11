import {ISearchBook} from '@store/books/searchBook/interfaces';

export interface IBookResultProps {
    book: ISearchBook;
}

export interface ISearchResultsProps {
    books?: ISearchBook[];
    loading: boolean;
    hasSearched: boolean;
}
