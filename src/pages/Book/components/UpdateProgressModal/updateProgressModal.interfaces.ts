import type {Control, UseFormRegisterReturn} from 'react-hook-form';

export type ProgressInputMethod = 'PAGE' | 'PERCENTAGE';

export interface IUpdateProgressFormValues {
    value: number;
    isFinished: boolean;
}

export interface IBookshelfBookProgress {
    id: number;
    bookshelfId: number;
    bookId: number;
    readingProgress: number;
    currentPage: number | null;
    totalPages: number | null;
}

export interface IUpdateReadingProgressParams {
    token: string;
    bookshelfBookId: number;
    progressType: ProgressInputMethod;
    value: number;
    isFinished?: boolean;
    onSuccess: () => Promise<void>;
}

export interface IUseUpdateProgressParams {
    token?: string;
    bookshelfBookId?: number;
    totalPages: number;
    initialCurrentPage: number | null;
    initialReadingProgress: number | null;
    isOpen: boolean;
    onRefresh: () => Promise<void>;
}

export interface IUpdateProgressModalProps {
    isOpen: boolean;
    onCloseModal: () => void;
    bookTitle: string;
    totalPages: number;
    bookshelfBookId?: number;
    currentPage: number | null;
    readingProgress: number | null;
    token?: string;
    onRefresh: () => Promise<void>;
}

export interface IConfirmedProgress {
    currentPage: number;
    readingProgress: number;
}

export interface IFinishedToggleRowProps {
    control: Control<IUpdateProgressFormValues>;
}

export interface IProgressContextCardProps {
    hasPageCount: boolean;
    currentPage: number;
    totalPages: number;
    percentage: number;
}

export interface IProgressInputSectionProps {
    hasPageCount: boolean;
    inputMethod: ProgressInputMethod;
    onSwitchInputMethod: (method: ProgressInputMethod) => void;
    totalPages: number;
    valueField: UseFormRegisterReturn<'value'>;
}

export interface IUpdateProgressModalHeaderProps {
    bookTitle: string;
    onCloseModal: () => void;
}
