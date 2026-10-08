import {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '@store/store';
import {onLogout} from '@store/index';
import {getDashboard} from '@pages/Home/home.api';
import {DashboardStatus, IDashboard} from '@pages/Home/home.interfaces';
import {API_ERROR_MSGS} from '@constants/errorMessages';

/**
 * Loads the whole Home dashboard from a single request. `refetch` keeps the current data on
 * screen while it reloads, so open modals aren't unmounted; `retry` goes back to the loading state.
 */
export const useDashboard = () => {
    const dispatch: AppDispatch = useDispatch();
    const {token} = useSelector((state: RootState) => state.auth);
    const [dashboard, setDashboard] = useState<IDashboard | null>(null);
    const [status, setStatus] = useState<DashboardStatus>('loading');

    const load = useCallback(async () => {
        if (!token) return;
        try {
            setDashboard(await getDashboard({token}));
            setStatus('success');
        } catch (error) {
            if (
                error instanceof Error &&
                error.message === API_ERROR_MSGS.INVALID_OR_EXPIRED_TOKEN
            ) {
                dispatch(onLogout());
                return;
            }
            setStatus('error');
        }
    }, [token, dispatch]);

    useEffect(() => {
        load();
    }, [load]);

    const retry = useCallback(() => {
        setStatus('loading');
        return load();
    }, [load]);

    return {dashboard, status, token, refetch: load, retry};
};
