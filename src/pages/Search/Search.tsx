import {
    Button,
    Container,
    FlexContainer,
    FormContainer,
    Icon,
    Input,
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
        <Container $padding="20px 40px" maxWidthVariant="lg" $minHeight="100vh">
            <FlexContainer $gap="1.5rem" $flexDirection="column" $justifyContent="center">
                <TitleH1 Width="100%">{SEARCH_PAGE.TITLE}</TitleH1>

                <FormContainer $gap="0.5rem" onSubmit={handleSubmit(onSubmit)}>
                    <FlexContainer
                        $gap="0.5rem"
                        $flexDirection="column"
                        $width="100%"
                        $alignItems="start"
                    >
                        <SearchInputWrapper
                            $background="unset"
                            $gap="0.5rem"
                            $alignItems="center"
                            $width="100%"
                            $borderRadius="0.75rem"
                            $padding="0px 0px 0px 0.875rem"
                            hasError={!!errorMsg}
                        >
                            <Icon
                                variant="muted"
                                className="fa-solid fa-magnifying-glass"
                                size="md"
                                $cursor="default"
                            />
                            <Input
                                placeholder={SEARCH_PAGE.PLACEHOLDER}
                                $height="100%"
                                $backgroundColor="transparent"
                                $border="unset"
                                $width="100%"
                                $padding="0.875rem 0.5rem 0.875rem 0px"
                                {...register('searchText')}
                                minLength={1}
                                maxLength={50}
                            />
                        </SearchInputWrapper>
                        {errorMsg && <ErrorMessage message={errorMsg} />}
                    </FlexContainer>
                    <Button $maxWidth="100px" $height="50px">
                        {SEARCH_PAGE.SEARCH_BTN}
                    </Button>
                </FormContainer>

                <FlexContainer $flexDirection="column" $gap="1rem">
                    <SearchResults
                        books={searchBookData?.books}
                        loading={loading}
                        hasSearched={!!searchBookData}
                    />
                </FlexContainer>

                {searchBookData?.books && !loading && (
                    <FlexContainer $gap="1rem" $justifyContent="space-between" $alignItems="center">
                        <Button
                            $maxWidth="120px"
                            onClick={handlePreviousPage}
                            disabled={currentPage === 1 || loading}
                            $alignItems="center"
                            variant="outline"
                            leftIcon={
                                <Icon
                                    className="fa-solid fa-arrow-left"
                                    size="md"
                                    $fontColor="inherit"
                                />
                            }
                        >
                            {SEARCH_PAGE.PREVIOUS_BTN}
                        </Button>
                        <Paragraph>{`${SEARCH_PAGE.PAGE} ${currentPage}`}</Paragraph>
                        <Button
                            $maxWidth="120px"
                            onClick={handleNextPage}
                            disabled={isLastPage || loading}
                            $alignItems="center"
                            variant="outline"
                            rightIcon={
                                <Icon
                                    className="fa-solid fa-arrow-right"
                                    size="md"
                                    $fontColor="inherit"
                                />
                            }
                        >
                            {SEARCH_PAGE.NEXT_BTN}
                        </Button>
                    </FlexContainer>
                )}
            </FlexContainer>
        </Container>
    );
};
