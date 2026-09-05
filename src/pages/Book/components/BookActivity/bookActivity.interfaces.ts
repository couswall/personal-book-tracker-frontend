export interface IBookActivityProps {
    onOpenAddToBookshelfModal: () => void;
    onUpdateProgress?: () => void;
    bookshelfLabel?: string;
    progressPercentage?: number;
}
