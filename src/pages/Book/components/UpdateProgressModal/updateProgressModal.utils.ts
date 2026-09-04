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

export const handleProgressInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.ctrlKey || event.metaKey || ALLOWED_NAVIGATION_KEYS.includes(event.key)) {
        return;
    }

    if (!/^[0-9]$/.test(event.key)) {
        event.preventDefault();
    }
};

export const handleProgressInputPaste = (event: React.ClipboardEvent<HTMLInputElement>): void => {
    const pastedText = event.clipboardData.getData('text');

    if (!/^[0-9]+$/.test(pastedText)) {
        event.preventDefault();
    }
};
