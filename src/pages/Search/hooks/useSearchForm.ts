import {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import {useSearchParams} from 'react-router';
import {yupResolver} from '@hookform/resolvers/yup';
import {AppDispatch, RootState} from '@store/store';
import {searchBook} from '@store/index';
import {schemaSearchBook, SearchFormValues} from '@pages/Search/search.schema';
import {MAX_RESULTS} from '@pages/Search/search.constants';

export const useSearchForm = () => {
    const dispatch: AppDispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('q') ?? '';
    const pageFromUrl = Number(searchParams.get('page'));
    const currentPage = pageFromUrl > 0 ? pageFromUrl : 1;
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm<SearchFormValues>({
        defaultValues: {searchText: ''},
        resolver: yupResolver(schemaSearchBook),
    });
    const {token} = useSelector((state: RootState) => state.auth);
    const {searchBookData, loading} = useSelector((state: RootState) => state.searchBook);
    const errorMsg = errors.searchText?.message ? String(errors.searchText.message) : undefined;

    const performSearch = (searchText: string, page: number) => {
        const params = {searchText, maxResults: MAX_RESULTS, page};
        dispatch(searchBook({token, params}));
    };

    const onSubmit = ({searchText}: SearchFormValues) => {
        setSearchParams({q: searchText, page: '1'});
    };

    const handlePreviousPage = () => {
        setSearchParams({q: query, page: String(currentPage - 1)});
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

    const handleNextPage = () => {
        setSearchParams({q: query, page: String(currentPage + 1)});
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

    const isLastPage = Boolean(searchBookData && searchBookData.books.length < MAX_RESULTS);

    useEffect(() => {
        if (!query) return;
        reset({searchText: query});
        performSearch(query, currentPage);
    }, [query, currentPage]);

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
