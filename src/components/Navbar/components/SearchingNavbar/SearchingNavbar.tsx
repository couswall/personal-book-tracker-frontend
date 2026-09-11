import {useForm} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router';
import {useEffect, useRef, useState} from 'react';
import {AppDispatch, RootState} from '@store/store';
import {yupResolver} from '@hookform/resolvers/yup';
import {useDebounce} from '@components/Navbar/hooks/useDebounce';
import {useClickOutside} from '@components/Navbar/hooks/useClickOutside';
import {FlexContainer, FormContainer, Icon, Input, LoadingSpinner, Text} from '@components/index';
import {SearchInputWrapper} from '@components/Navbar/components/SearchingNavbar/styles';
import {BookInfoCard} from '@components/Navbar/components/SearchingNavbar/BookInfoCard';
import {navbarSearchBook, clearNavbarSearch} from '@store/index';
import {schemaSearchBook, SearchFormValues} from '@pages/Search/search.schema';
import {privateRoutes} from '@routes/routes';
import {NAVBAR, NAVBAR_SEARCH_MIN_LENGTH} from '@components/Navbar/constants';

export const SearchingNavbar = () => {
    const dispatch: AppDispatch = useDispatch();
    const {register, watch, reset, handleSubmit} = useForm<SearchFormValues>({
        defaultValues: {searchText: ''},
        resolver: yupResolver(schemaSearchBook),
    });
    const searchText = watch('searchText');
    const navigate = useNavigate();
    const {token} = useSelector((state: RootState) => state.auth);
    const {searchBookData, loading} = useSelector((state: RootState) => state.navbarSearch);
    const debouncedValue = useDebounce(searchText);
    const truncatedSearchText =
        debouncedValue.length > 18 ? debouncedValue.substring(0, 18) + '...' : debouncedValue;
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);

    useClickOutside([formRef], () => setIsDropdownOpen(false));

    const closeDropdown = () => {
        reset();
        dispatch(clearNavbarSearch());
        setIsDropdownOpen(false);
    };

    const navigateToSearch = (searchTextValue: string) => {
        navigate(`${privateRoutes.search}?${new URLSearchParams({q: searchTextValue})}`);
    };

    const onSubmit = (data: SearchFormValues) => {
        navigateToSearch(data.searchText);
        closeDropdown();
    };

    const handleSeeAllResults = () => {
        navigateToSearch(debouncedValue);
        closeDropdown();
    };

    useEffect(() => {
        if (debouncedValue.length >= NAVBAR_SEARCH_MIN_LENGTH) {
            const params = {searchText: debouncedValue, maxResults: 5};
            dispatch(navbarSearchBook({token, params}));
            setIsDropdownOpen(true);
        } else {
            setIsDropdownOpen(false);
        }
    }, [debouncedValue]);

    return (
        <>
            <FormContainer
                ref={formRef}
                $backgroundColor="inherit"
                $position="relative"
                $width="320px"
                onSubmit={handleSubmit(onSubmit)}
                $mdDisplay="none"
            >
                <SearchInputWrapper
                    $background="unset"
                    $gap="0.5rem"
                    $alignItems="center"
                    $width="100%"
                    $borderRadius="1rem"
                    $height="36px"
                    $padding="0px 0px 0px 0.875rem"
                >
                    {loading ? (
                        <LoadingSpinner $width="1rem" $padding="3px" />
                    ) : (
                        <Icon
                            variant="muted"
                            className="fa-solid fa-magnifying-glass"
                            size="sm"
                            $cursor="default"
                        />
                    )}
                    <Input
                        $fontSize="0.875rem"
                        placeholder="Search books"
                        $height="100%"
                        $backgroundColor="transparent"
                        $border="unset"
                        $width="100%"
                        $padding="0.875rem 0.5rem 0.875rem 0px"
                        onKeyDown={(e) => {
                            if (e.key === 'Escape') setIsDropdownOpen(false);
                        }}
                        {...register('searchText')}
                    />
                </SearchInputWrapper>
                {isDropdownOpen && (
                    <FlexContainer
                        $position="absolute"
                        $width="320px"
                        $top="2.5rem"
                        $flexDirection="column"
                        backgroundColorVariant="card"
                        $border="1px solid"
                        $borderRadius="1rem"
                        $overflow="hidden"
                        boxShadowVariant="md"
                        $zIndex="2"
                    >
                        {!loading && searchBookData?.books.length === 0 ? (
                            <FlexContainer $padding="0.75rem" $justifyContent="center">
                                <Text size="xs" variant="muted">
                                    {NAVBAR.NO_RESULTS}
                                </Text>
                            </FlexContainer>
                        ) : (
                            searchBookData?.books.map((book) => (
                                <BookInfoCard
                                    key={book.id}
                                    book={book}
                                    imageWidth="40px"
                                    imageHeight="56px"
                                    onClickOption={closeDropdown}
                                />
                            ))
                        )}
                        <FlexContainer
                            $padding="0.75rem"
                            $justifyContent="center"
                            $alignItems="center"
                            $backgroundColor="inherit"
                            hBackgroundColorVariant="primary"
                            $cursor="pointer"
                            onClick={handleSeeAllResults}
                        >
                            <Text size="xs" variant="primary" weight="semibold" $cursor="pointer">
                                {`${NAVBAR.SEARCH_ALL_RESULTS} "${truncatedSearchText}"`}
                            </Text>
                        </FlexContainer>
                    </FlexContainer>
                )}
            </FormContainer>
        </>
    );
};
