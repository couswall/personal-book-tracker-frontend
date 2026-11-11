import {describe, expect, it, vi} from 'vitest';
import {
    handleProgressInputKeyDown,
    handleProgressInputPaste,
} from '@pages/Book/components/UpdateProgressModal/updateProgressModal.utils';

const buildKeyDownEvent = (key: string, options: {ctrlKey?: boolean; metaKey?: boolean} = {}) => ({
    key,
    ctrlKey: options.ctrlKey ?? false,
    metaKey: options.metaKey ?? false,
    preventDefault: vi.fn(),
});

const buildPasteEvent = (pastedText: string) => ({
    clipboardData: {getData: () => pastedText},
    preventDefault: vi.fn(),
});

describe('handleProgressInputKeyDown', () => {
    it('allows digit keys', () => {
        const event = buildKeyDownEvent('5');

        handleProgressInputKeyDown(event);

        expect(event.preventDefault).not.toHaveBeenCalled();
    });

    it('blocks a non-digit, non-navigation key', () => {
        const event = buildKeyDownEvent('a');

        handleProgressInputKeyDown(event);

        expect(event.preventDefault).toHaveBeenCalled();
    });

    it.each(['Backspace', 'Tab', 'Enter', 'ArrowLeft', 'ArrowRight', 'Home', 'End'])(
        'allows the navigation key "%s"',
        (key) => {
            const event = buildKeyDownEvent(key);

            handleProgressInputKeyDown(event);

            expect(event.preventDefault).not.toHaveBeenCalled();
        }
    );

    it('allows Ctrl/Cmd shortcuts regardless of the key', () => {
        const event = buildKeyDownEvent('a', {ctrlKey: true});

        handleProgressInputKeyDown(event);

        expect(event.preventDefault).not.toHaveBeenCalled();
    });
});

describe('handleProgressInputPaste', () => {
    it('allows pasting digits only', () => {
        const event = buildPasteEvent('123');

        handleProgressInputPaste(event);

        expect(event.preventDefault).not.toHaveBeenCalled();
    });

    it('blocks pasting content with non-digit characters', () => {
        const event = buildPasteEvent('12a');

        handleProgressInputPaste(event);

        expect(event.preventDefault).toHaveBeenCalled();
    });

    it('blocks pasting an empty string', () => {
        const event = buildPasteEvent('');

        handleProgressInputPaste(event);

        expect(event.preventDefault).toHaveBeenCalled();
    });
});
