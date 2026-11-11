const ALLOWED_NAVIGATION_KEYS = [
    'Backspace',
    'Delete',
    'Tab',
    'Enter',
    'ArrowLeft',
    'ArrowRight',
    'ArrowUp',
    'ArrowDown',
    'Home',
    'End',
];

interface ProgressInputKeyDownEvent {
    ctrlKey: boolean;
    metaKey: boolean;
    key: string;
    preventDefault: () => void;
}

interface ProgressInputPasteEvent {
    clipboardData: {getData: (format: string) => string};
    preventDefault: () => void;
}

export const handleProgressInputKeyDown = (event: ProgressInputKeyDownEvent): void => {
    if (event.ctrlKey || event.metaKey || ALLOWED_NAVIGATION_KEYS.includes(event.key)) {
        return;
    }

    if (!/^[0-9]$/.test(event.key)) {
        event.preventDefault();
    }
};

export const handleProgressInputPaste = (event: ProgressInputPasteEvent): void => {
    const pastedText = event.clipboardData.getData('text');

    if (!/^[0-9]+$/.test(pastedText)) {
        event.preventDefault();
    }
};
