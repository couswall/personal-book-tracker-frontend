import {useNavigate} from 'react-router';
import {BaseContainer, FlexContainer, Icon, TitleH4} from '@components/index';
import * as S from '@pages/Home/components/WantToRead/wantToRead.styled';
import {EmptyState} from '@pages/Home/components/EmptyState/EmptyState';
import {CoverBookImg} from '@pages/Book/components/CoverBookImg';
import {IWantToReadBook} from '@pages/Home/home.interfaces';
import {HOME_TEXTS, getBookDetailPath} from '@pages/Home/home.constants';
import {privateRoutes} from '@routes/routes';

export const WantToRead: React.FC<{books: IWantToReadBook[]}> = ({books}) => {
    const navigate = useNavigate();

    return (
        <BaseContainer as="section" $padding="0 0 3rem 0">
            <FlexContainer
                $alignItems="center"
                $gap="0.5rem"
                $marginBottom="1.5rem"
                $backgroundColor="transparent"
            >
                <Icon variant="primary" className="fa-solid fa-bookmark" size="lg" />
                <TitleH4>{HOME_TEXTS.WANT_TO_READ_TITLE}</TitleH4>
            </FlexContainer>
            {books.length === 0 ? (
                <FlexContainer
                    $flexDirection="column"
                    $alignItems="center"
                    $justifyContent="center"
                    $minHeight="14rem"
                    $padding="3rem 2rem"
                    $border="1px solid"
                    backgroundColorVariant="secondary"
                    $borderRadius="0.75rem"
                    hBorderColorVariant="primary"
                    hBoxShadowVariant="glow"
                >
                    <EmptyState
                        iconClassName="fa-solid fa-bookmark"
                        iconTone="secondary"
                        buttonVariant="secondary"
                        title={HOME_TEXTS.WANT_TO_READ_EMPTY_TITLE}
                        description={HOME_TEXTS.WANT_TO_READ_EMPTY_DESCRIPTION}
                        buttonLabel={HOME_TEXTS.WANT_TO_READ_EMPTY_BUTTON}
                        buttonIconClassName="fa-solid fa-magnifying-glass"
                        onButtonClick={() => navigate(privateRoutes.search)}
                    />
                </FlexContainer>
            ) : (
                <S.ScrollRow $gap="1.5rem" $overflowX="auto" $padding="0 0 0.5rem 0">
                    {books.map((book) => (
                        <S.ShelfItem
                            key={book.bookshelfBookId}
                            to={getBookDetailPath(book.apiBookId)}
                        >
                            <S.ShelfCoverWrapper
                                $width="100%"
                                $aspectRatio="3 / 4"
                                $borderRadius="0.5rem"
                                $border="1px solid"
                                $marginBottom="0.75rem"
                                $overflow="hidden"
                            >
                                <CoverBookImg
                                    imgSrc={book.coverImageUrl}
                                    alt={book.title}
                                    objectFit="cover"
                                    width="100%"
                                    height="100%"
                                />
                            </S.ShelfCoverWrapper>
                            <S.ShelfTitle
                                size="sm"
                                weight="medium"
                                variant="muted"
                                $whiteSpace="nowrap"
                                $textOverflow="ellipsis"
                                $overflow="hidden"
                            >
                                {book.title}
                            </S.ShelfTitle>
                        </S.ShelfItem>
                    ))}
                </S.ScrollRow>
            )}
        </BaseContainer>
    );
};
