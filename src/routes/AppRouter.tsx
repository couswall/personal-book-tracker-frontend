import {useEffect} from 'react';
import {Navigate, Route, Routes} from 'react-router';
import {useDispatch, useSelector} from 'react-redux';
import {MyBooks, Login, SignUp, Book, Search} from '@pages/index';
import {AppDispatch, RootState} from '@store/store';
import {refreshToken} from '@store/auth/thunks';
import {privateRoutes, publicRoutes} from '@routes/routes';
import {DashboardLayout, PublicLayout} from '@views/index';
import {AuthStatus} from '@store/auth/interfaces';

export const AppRouter = () => {
    const dispatch = useDispatch<AppDispatch>();
    const authStatus = useSelector((state: RootState) => state.auth.status);
    const token = useSelector((state: RootState) => state.auth.token);
    const isAuthenticated = authStatus === AuthStatus.Authenticated;

    useEffect(() => {
        if (token) {
            dispatch(refreshToken());
        }
    }, []);

    return (
        <Routes>
            {isAuthenticated ? (
                <Route element={<DashboardLayout />}>
                    <Route path="/" element={<h1>{'HomePage'}</h1>} />
                    <Route path="/*" element={<h1>{'404 error'}</h1>} />
                    <Route path={privateRoutes.myBooks} element={<MyBooks />} />
                    <Route path={privateRoutes.book} element={<Book />} />
                    <Route path={privateRoutes.search} element={<Search />} />
                </Route>
            ) : (
                <>
                    <Route element={<PublicLayout />}>
                        <Route path={publicRoutes.login} element={<Login />} />
                        <Route path={publicRoutes.signUp} element={<SignUp />} />
                        <Route path="/*" element={<Navigate to={publicRoutes.login} />} />
                    </Route>
                </>
            )}
        </Routes>
    );
};
