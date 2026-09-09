import {
    Button,
    Container,
    FlexContainer,
    FormContainer,
    Icon,
    Input,
    MutedIcon,
    Paragraph,
    TitleH1,
} from '@components/index';
import {ErrorMessage} from '@pages/Login/components/ErrorMessage';
import {SEARCH_PAGE} from '@pages/Search/search.constants';
import {SearchInputWrapper} from '@components/Navbar/components/SearchingNavbar/styles';
import {SearchResults} from '@pages/Search/components/SearchResults';
import {useSearchForm} from '@pages/Search/hooks/useSearchForm';

export const Search = () => {
    const {
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
    } = useSearchForm();

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
                    <SearchResults
                        books={searchBookData?.books}
                        loading={loading}
                        hasSearched={!!searchBookData}
                    />
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
