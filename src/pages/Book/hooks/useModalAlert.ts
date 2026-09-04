import {useEffect, useRef, useState} from 'react';
import {AlertVariant, IAlertState} from '@pages/Book/hooks/hooks.interfaces';

export const useModalAlert = () => {
    const [alert, setAlert] = useState<IAlertState>({
        message: '',
        variant: 'success',
        visible: false,
    });
    const alertTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        return () => {
            if (alertTimeoutRef.current) clearTimeout(alertTimeoutRef.current);
        };
    }, []);

    const showAlert = (message: string, variant: AlertVariant) => {
        if (alertTimeoutRef.current) clearTimeout(alertTimeoutRef.current);
        setAlert({message, variant, visible: true});
        alertTimeoutRef.current = setTimeout(
            () => setAlert((prev) => ({...prev, visible: false})),
            3000
        );
    };

    return {alert, showAlert};
};
