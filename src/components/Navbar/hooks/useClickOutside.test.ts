import {afterEach, describe, expect, it, vi} from 'vitest';
import {renderHook} from '@testing-library/react';
import {useClickOutside} from '@components/Navbar/hooks/useClickOutside';

const click = (element: Element) => {
    element.dispatchEvent(new MouseEvent('click', {bubbles: true}));
};

const buildRef = (element: HTMLElement | null) => ({current: element});

const attachedElements: HTMLElement[] = [];
const buildAttachedElement = () => {
    const element = document.createElement('div');
    document.body.appendChild(element);
    attachedElements.push(element);
    return element;
};

afterEach(() => {
    attachedElements.forEach((element) => element.remove());
    attachedElements.length = 0;
});

describe('useClickOutside', () => {
    it('calls the callback when clicking outside every given ref', () => {
        const insideEl = buildAttachedElement();
        const outsideEl = buildAttachedElement();
        const callback = vi.fn();

        renderHook(() => useClickOutside([buildRef(insideEl)], callback));

        click(outsideEl);

        expect(callback).toHaveBeenCalledTimes(1);
    });

    it('does not call the callback when clicking inside a given ref', () => {
        const insideEl = buildAttachedElement();
        const callback = vi.fn();

        renderHook(() => useClickOutside([buildRef(insideEl)], callback));

        click(insideEl);

        expect(callback).not.toHaveBeenCalled();
    });

    it('requires the click to be outside every ref, not just one of them', () => {
        const firstEl = buildAttachedElement();
        const secondEl = buildAttachedElement();
        const callback = vi.fn();

        renderHook(() => useClickOutside([buildRef(firstEl), buildRef(secondEl)], callback));

        click(secondEl);

        expect(callback).not.toHaveBeenCalled();
    });

    it('stops listening once unmounted', () => {
        const outsideEl = buildAttachedElement();
        const callback = vi.fn();

        const {unmount} = renderHook(() => useClickOutside([], callback));
        unmount();

        click(outsideEl);

        expect(callback).not.toHaveBeenCalled();
    });

    it('never calls the callback while a ref has not attached to an element yet', () => {
        const outsideEl = buildAttachedElement();
        const callback = vi.fn();

        renderHook(() => useClickOutside([buildRef(null)], callback));

        click(outsideEl);

        expect(callback).not.toHaveBeenCalled();
    });
});
