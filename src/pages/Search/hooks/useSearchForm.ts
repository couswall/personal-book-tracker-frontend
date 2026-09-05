import {useEffect, useState} from 'react';
import {FieldValues, useForm, useWatch} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import {useLocation, useNavigate} from 'react-router';
import {yupResolver} from '@hookform/resolvers/yup';
import {AppDispatch, RootState} from '@store/store';
import {searchBook} from '@store/index';
import {schemaSearchBook} from '@pages/Search/search.schema';
import {MAX_RESULTS} from '@pages/Search/search.constants';

export const useSearchForm = () => {
    const {state} = useLocation();
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: {errors},
    } = useForm({
        defaultValues: {searchText: ''},
        resolver: yupResolver(schemaSearchBook),
    });
    const {token} = useSelector((state: RootState) => state.auth);
    const {searchBookData, loading} = useSelector((state: RootState) => state.searchBook);
    const searchTextValue = useWatch({control, name: 'searchText'});
    const [currentPage, setCurrentPage] = useState<number>(1);
    const errorMsg = errors.searchText?.message ? String(errors.searchText.message) : undefined;

    const performSearch = (searchText: string, page: number) => {
        const params = {searchText, maxResults: MAX_RESULTS, page};
        dispatch(searchBook({token, params}));
    };

    const onSubmit = ({searchText}: FieldValues) => {
        setCurrentPage(1);
        performSearch(searchText, 1);
    };

    const handlePreviousPage = () => {
        const newPage = currentPage - 1;
        setCurrentPage(newPage);
        performSearch(searchTextValue, newPage);
    };

    const handleNextPage = () => {
        const newPage = currentPage + 1;
        setCurrentPage(newPage);
        performSearch(searchTextValue, newPage);
    };

    const isLastPage = searchBookData?.books && !searchBookData.books.length;

    useEffect(() => {
        if (!state?.searchText) return;
        reset({searchText: state.searchText});
        performSearch(state.searchText, 1);
        navigate('.', {replace: true, state: null});
    }, [state]);

    return {
        register,
        handleSubmit,
        onSubmit,
        errorMsg,
        searchBookData,
        loading,
        currentPage,
        isLastPage,
        handlePreviousPage,
        handleNextPage,
    };
};
