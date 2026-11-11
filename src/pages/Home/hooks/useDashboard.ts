import {useCallback, useEffect, useState} from 'react';
import {getDashboard} from '@pages/Home/home.api';
import {DashboardStatus, IDashboard} from '@pages/Home/home.interfaces';

/**
 * Loads the whole Home dashboard from a single request. `refetch` keeps the current data on
 * screen while it reloads, so open modals aren't unmounted; `retry` goes back to the loading state.
 */
export const useDashboard = () => {
    const [dashboard, setDashboard] = useState<IDashboard | null>(null);
    const [status, setStatus] = useState<DashboardStatus>('loading');

    const load = useCallback(async () => {
        try {
            setDashboard(await getDashboard());
            setStatus('success');
        } catch {
            setStatus('error');
        }
    }, []);

    useEffect(() => {
        load();
    }, [load]);

    const retry = useCallback(() => {
        setStatus('loading');
        return load();
    }, [load]);

    return {dashboard, status, refetch: load, retry};
};
