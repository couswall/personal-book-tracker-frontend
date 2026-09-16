import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {act, renderHook} from '@testing-library/react';
import {useModalAlert} from '@pages/Book/hooks/useModalAlert';

beforeEach(() => {
    vi.useFakeTimers();
});

afterEach(() => {
    vi.useRealTimers();
});

describe('useModalAlert', () => {
    it('starts hidden', () => {
        const {result} = renderHook(() => useModalAlert());

        expect(result.current.alert).toEqual({message: '', variant: 'success', visible: false});
    });

    it('shows the alert immediately when showAlert is called', () => {
        const {result} = renderHook(() => useModalAlert());

        act(() => {
            result.current.showAlert('Added to shelf', 'success');
        });

        expect(result.current.alert).toEqual({
            message: 'Added to shelf',
            variant: 'success',
            visible: true,
        });
    });

    it('hides itself automatically after 3 seconds', () => {
        const {result} = renderHook(() => useModalAlert());

        act(() => {
            result.current.showAlert('Added to shelf', 'success');
        });

        act(() => {
            vi.advanceTimersByTime(3000);
        });

        expect(result.current.alert.visible).toBe(false);
    });

    it('resets the auto-hide timer when a new alert is shown before the old one hides', () => {
        const {result} = renderHook(() => useModalAlert());

        act(() => {
            result.current.showAlert('First message', 'success');
        });

        act(() => {
            vi.advanceTimersByTime(2000);
        });

        act(() => {
            result.current.showAlert('Second message', 'danger');
        });

        // The first timer would have fired 1s from here if it hadn't been cleared.
        act(() => {
            vi.advanceTimersByTime(2999);
        });
        expect(result.current.alert).toEqual({
            message: 'Second message',
            variant: 'danger',
            visible: true,
        });

        act(() => {
            vi.advanceTimersByTime(1);
        });
        expect(result.current.alert.visible).toBe(false);
    });

    it('clears the pending timeout on unmount', () => {
        const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout');
        const {result, unmount} = renderHook(() => useModalAlert());

        act(() => {
            result.current.showAlert('Added to shelf', 'success');
        });
        unmount();

        expect(clearTimeoutSpy).toHaveBeenCalled();
    });
});
