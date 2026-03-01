import {ISearchBook} from '@store/books/searchBook/interfaces';

export interface IBookInfoCardProps {
    book: ISearchBook;
    onClickOption?: () => void;
    imageWidth?: string;
    imageHeight?: string;
}
