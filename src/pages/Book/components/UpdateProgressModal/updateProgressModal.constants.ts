import {ProgressInputMethod} from '@pages/Book/components/UpdateProgressModal/updateProgressModal.interfaces';

export const PROGRESS_INPUT_METHODS: Record<ProgressInputMethod, ProgressInputMethod> = {
    PAGE: 'PAGE',
    PERCENTAGE: 'PERCENTAGE',
};

export const UPDATE_PROGRESS_TEXTS = {
    CANCEL: 'Cancel',
    SAVING: 'Saving...',
    SAVE_PROGRESS: 'Save Progress',
    FINISHED_BOOK: "I've finished this book",
    CURRENT_STATE: 'Current State',
    CURRENT_PAGE_PROGRESS: (current: number, total: number) =>
        `Currently at ${current} of ${total} pages`,
    PERCENTAGE_PROGRESS: (percentage: number) => `${percentage}% completed`,
    INPUT_METHOD_LABEL: 'Input Method',
    PAGES_LABEL: 'Pages',
    PERCENTAGE_LABEL: 'Percentage',
    PAGES_READ_LABEL: 'Pages Read',
    PERCENTAGE_COMPLETED_LABEL: 'Percentage Completed',
    MODAL_TITLE: 'Update Reading Progress',
    PROGRESS_UPDATED: 'Progress updated',
};
