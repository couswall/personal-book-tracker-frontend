import {FieldValues, useForm} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router';
import {useEffect} from 'react';
import {AppDispatch, RootState} from '@store/store';
import {yupResolver} from '@hookform/resolvers/yup';
import {useDebounce} from '@components/Navbar/hooks/useDebounce';
import {
    FlexContainer,
    FormContainer,
    Input,
    LoadingSpinner,
    MutedIcon,
    Text,
} from '@components/index';
import {SearchInputWrapper} from '@components/Navbar/components/SearchingNavbar/styles';
import {BookInfoCard} from '@components/Navbar/components/SearchingNavbar/BookInfoCard';
import {searchBook} from '@store/index';
import {schemaSearchBook} from '@pages/Search/schemaSearchBook';
import {privateRoutes} from '@routes/routes';
import {NAVBAR} from '@components/Navbar/constants';

export const SearchingNavbar = () => {
    const dispatch: AppDispatch = useDispatch();
    const {register, watch, reset, handleSubmit} = useForm({
        defaultValues: {searchText: ''},
        resolver: yupResolver(schemaSearchBook),
    });
    const searchText = watch('searchText');
    const navigate = useNavigate();
    const {token} = useSelector((state: RootState) => state.auth);
    const {searchBookData, loading} = useSelector((state: RootState) => state.searchBook);
    const debouncedValue = useDebounce(searchText);
    const truncatedSearchText =
        debouncedValue.length > 18 ? debouncedValue.substring(0, 18) + '...' : debouncedValue;

    const onSubmit = (data: FieldValues) => {
        navigate(privateRoutes.search, {state: data});
        reset();
    };

    useEffect(() => {
        if (debouncedValue.length > 2) {
            const params = {searchText: debouncedValue, maxResults: 5};
            dispatch(searchBook({token, params}));
        }
    }, [debouncedValue]);

    return (
        <>
            <FormContainer
                BackgroundColor="inherit"
                Position="relative"
                Width="320px"
                onSubmit={handleSubmit(onSubmit)}
                MdDisplay="none"
            >
                <SearchInputWrapper
                    Background="unset"
                    Gap="0.5rem"
                    AlignItems="center"
                    Width="100%"
                    BorderRadius="1rem"
                    Height="36px"
                    Padding="0px 0px 0px 0.875rem"
                >
                    {loading ? (
                        <LoadingSpinner Width="1rem" Padding="3px" />
                    ) : (
                        <MutedIcon
                            className="fa-solid fa-magnifying-glass"
                            size="sm"
                            Cursor="default"
                        />
                    )}
                    <Input
                        FontSize="0.875rem"
                        placeholder="Search books"
                        Height="100%"
                        BackgroundColor="transparent"
                        Border="unset"
                        Width="100%"
                        Padding="0.875rem 0.5rem 0.875rem 0px"
                        {...register('searchText')}
                    />
                </SearchInputWrapper>
                {debouncedValue.length > 3 && (
                    <FlexContainer
                        Position="absolute"
                        Width="320px"
                        Top="2.5rem"
                        FlexDirection="column"
                        BackgroundColorVariant="card"
                        Border="1px solid"
                        BorderRadius="1rem"
                        Overflow="hidden"
                        BoxShadowVariant="md"
                        ZIndex="2"
                    >
                        {searchBookData?.books.map((book) => (
                            <BookInfoCard
                                key={book.id}
                                book={book}
                                imageWidth="40px"
                                imageHeight="56px"
                                onClickOption={() => reset()}
                            />
                        ))}
                        <FlexContainer
                            Padding="0.75rem"
                            JustifyContent="center"
                            AlignItems="center"
                            BackgroundColor="inherit"
                            HBackgroundColorVariant="primary"
                            Cursor="pointer"
                        >
                            <Text size="xs" variant="primary" weight="semibold" Cursor="pointer">
                                {`${NAVBAR.SEARCH_ALL_RESULTS} "${truncatedSearchText}"`}
                            </Text>
                        </FlexContainer>
                    </FlexContainer>
                )}
            </FormContainer>
        </>
    );
};
