import {DEFAULT_SHELF_ICONS} from '@pages/Book/components/AddToBookshelfModal/addToBookshelfModal.constants';

export const getShelfIcon = (name: string): string => {
    return DEFAULT_SHELF_ICONS[name.trim().toLowerCase()] ?? 'fa-solid fa-book';
};
