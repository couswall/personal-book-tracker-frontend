import {RefObject, useEffect, useCallback} from 'react';

export const useClickOutside = (
    refs: RefObject<HTMLElement | null>[],
    callbackFn: () => void
) => {
    const handleClickOutside = useCallback(
        (e: MouseEvent) => {
            const isOutside = refs.every(
                (ref) => ref.current && !ref.current.contains(e.target as Node)
            );
            if (isOutside) callbackFn();
        },
        [refs, callbackFn]
    );

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [handleClickOutside]);
};
