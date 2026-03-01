import {useDispatch, useSelector} from 'react-redux';
import {FieldValues, useForm, useWatch} from 'react-hook-form';
import {useLocation} from 'react-router';
import {useEffect, useState} from 'react';
import {AppDispatch, RootState} from '@store/store';
import {yupResolver} from '@hookform/resolvers/yup';
import {searchBook} from '@store/index';
import {
    Button,
    Container,
    FlexContainer,
    FormContainer,
    Icon,
    Input,
    LoadingSpinner,
    MutedIcon,
    Paragraph,
    TitleH1,
} from '@components/index';
import {ErrorMessage} from '@pages/Login/ErrorMessage';
import {schemaSearchBook} from '@pages/Search/schemaSearchBook';
import {SEARCH_PAGE, MAX_RESULTS, searchBooks} from '@pages/Search/constants';

import {SearchInputWrapper} from '@components/Navbar/components/SearchingNavbar/styles';
import {BookResult} from '@pages/Search/BookResult';

export const Search = () => {
    const {state} = useLocation();
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
    }, [state, reset]);

    return (
        <Container Padding="20px 40px" MaxWidthVariant="lg" MinHeight="100vh">
            <FlexContainer Gap="1.5rem" FlexDirection="column" JustifyContent="center">
                <TitleH1 Width="100%">{SEARCH_PAGE.TITLE}</TitleH1>

                <FormContainer Gap="0.5rem" onSubmit={handleSubmit(onSubmit)}>
                    <FlexContainer
                        Gap="0.5rem"
                        FlexDirection="column"
                        Width="100%"
                        AlignItems="start"
                    >
                        <SearchInputWrapper
                            Background="unset"
                            Gap="0.5rem"
                            AlignItems="center"
                            Width="100%"
                            BorderRadius="0.75rem"
                            Padding="0px 0px 0px 0.875rem"
                            hasError={!!errorMsg}
                        >
                            <MutedIcon
                                className="fa-solid fa-magnifying-glass"
                                size="md"
                                Cursor="default"
                            />
                            <Input
                                placeholder={SEARCH_PAGE.PLACEHOLDER}
                                Height="100%"
                                BackgroundColor="transparent"
                                Border="unset"
                                Width="100%"
                                Padding="0.875rem 0.5rem 0.875rem 0px"
                                {...register('searchText')}
                                minLength={1}
                                maxLength={50}
                            />
                        </SearchInputWrapper>
                        {errorMsg && <ErrorMessage message={errorMsg} />}
                    </FlexContainer>
                    <Button MaxWidth="100px" Height="50px">
                        {SEARCH_PAGE.SEARCH_BTN}
                    </Button>
                </FormContainer>

                <FlexContainer FlexDirection="column" Gap="1rem">
                    {loading ? (
                        <FlexContainer Height="40vh" JustifyContent="center" AlignItems="center">
                            <LoadingSpinner />
                        </FlexContainer>
                    ) : (
                        searchBookData?.books.map((book) => (
                            <BookResult key={book.id} book={book} />
                        ))
                    )}
                </FlexContainer>

                {searchBookData?.books && !loading && (
                    <FlexContainer Gap="1rem" JustifyContent="space-between" AlignItems="center">
                        <Button
                            MaxWidth="120px"
                            onClick={handlePreviousPage}
                            disabled={currentPage === 1 || loading}
                            Gap="0.5rem"
                            AlignItems="center"
                            variant="outline"
                        >
                            <Icon
                                className="fa-solid fa-arrow-left"
                                size="md"
                                FontColor="inherit"
                            />
                            {SEARCH_PAGE.PREVIOUS_BTN}
                        </Button>
                        <Paragraph>{`${SEARCH_PAGE.PAGE} ${currentPage}`}</Paragraph>
                        <Button
                            MaxWidth="120px"
                            onClick={handleNextPage}
                            disabled={isLastPage || loading}
                            Gap="0.5rem"
                            AlignItems="center"
                            variant="outline"
                        >
                            {SEARCH_PAGE.NEXT_BTN}
                            <Icon
                                className="fa-solid fa-arrow-right"
                                size="md"
                                FontColor="inherit"
                            />
                        </Button>
                    </FlexContainer>
                )}
            </FlexContainer>
        </Container>
    );
};
