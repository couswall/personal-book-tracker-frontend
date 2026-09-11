import {FlexContainer, Button, Icon, RatingStars, Text} from '@components/index';
import {CoverBookImg} from '@pages/Book/components/CoverBookImg';
import {BookActivity} from '@pages/Book/components/BookActivity';
import * as S from '@pages/Book/book.styled';
import {formatIsoDate} from '@pages/Book/components/BookTopSection/bookTopSection.utils';
import {IBookTopSectionProps} from '@pages/Book/components/BookTopSection/bookTopSection.interfaces';
import {BOOK_TOP_SECTION_TEXTS} from '@pages/Book/components/BookTopSection/bookTopSection.constants';

export const BookTopSection: React.FC<IBookTopSectionProps> = ({
    book,
    onOpenAddToBookshelfModal,
    onUpdateProgress,
    isOwned,
    bookshelfLabel,
    progressPercentage,
}) => (
    <S.TopSectionGrid>
        <S.ImageColumn>
            <S.ImageWrapper>
                <CoverBookImg width="100%" height="100%" imgSrc={book.coverImageUrl} />
            </S.ImageWrapper>
        </S.ImageColumn>

        <S.InfoColumn>
            <FlexContainer $flexDirection="column" $gap="0.5rem" $marginBottom="1.5rem">
                <S.BookTitle>{book.title}</S.BookTitle>
                <FlexContainer $flexDirection="column">
                    {book.authors?.length > 0 && (
                        <S.AuthorText variant="muted" FontSize="1.25rem" LgFontSize="1.125rem">
                            {BOOK_TOP_SECTION_TEXTS.BY_PREFIX}{' '}
                            {book.authors.map((author, index) => (
                                <span key={index}>
                                    {author}
                                    {index < book.authors.length - 1 ? ', ' : ''}
                                </span>
                            ))}
                        </S.AuthorText>
                    )}
                    {book.subtitle && (
                        <Text
                            variant="muted"
                            FontSize="1.25rem"
                            LgFontSize="1.125rem"
                            MarginTop="0.25rem"
                        >
                            {book.subtitle}
                        </Text>
                    )}
                </FlexContainer>
            </FlexContainer>

            <FlexContainer
                $flexWrap="wrap"
                $alignItems="center"
                $borderTop="1px solid"
                $borderBottom="1px solid"
                $padding="1.5rem 0"
                $marginBottom="1rem"
                $gap="2rem"
            >
                {book.publishedDate && (
                    <FlexContainer $flexDirection="column" $gap="0.25rem">
                        <Text variant="muted" weight="bold" size="xs" TextTransform="uppercase">
                            {BOOK_TOP_SECTION_TEXTS.PUBLISHED}
                        </Text>
                        <Text weight="medium">{formatIsoDate(book.publishedDate)}</Text>
                    </FlexContainer>
                )}
                {book.pageCount && (
                    <FlexContainer $flexDirection="column" $gap="0.25rem">
                        <Text variant="muted" weight="bold" size="xs" TextTransform="uppercase">
                            {BOOK_TOP_SECTION_TEXTS.PAGE_COUNT}
                        </Text>
                        <Text weight="medium">
                            {book.pageCount} {BOOK_TOP_SECTION_TEXTS.PAGES_SUFFIX}
                        </Text>
                    </FlexContainer>
                )}
                <FlexContainer $flexDirection="column" $gap="0.25rem">
                    <Text variant="muted" weight="bold" size="xs" TextTransform="uppercase">
                        {BOOK_TOP_SECTION_TEXTS.GLOBAL_RATING}
                    </Text>
                    <FlexContainer $alignItems="center" $gap="0.5rem">
                        <RatingStars rating={book.averageRating} size="1.125rem" />
                        <Text weight="medium">
                            {book.averageRating || BOOK_TOP_SECTION_TEXTS.NO_RATING}
                        </Text>
                    </FlexContainer>
                </FlexContainer>
            </FlexContainer>

            <FlexContainer $alignItems="center" $gap="0.5rem" $marginBottom="2rem" $flexWrap="wrap">
                {book.categories?.length > 0 ? (
                    book.categories.map((cat, i) => (
                        <S.CategoryBadge key={i}>{cat}</S.CategoryBadge>
                    ))
                ) : (
                    <S.CategoryBadge>{BOOK_TOP_SECTION_TEXTS.UNCATEGORIZED}</S.CategoryBadge>
                )}
            </FlexContainer>

            {isOwned && (
                <BookActivity
                    onOpenAddToBookshelfModal={onOpenAddToBookshelfModal}
                    onUpdateProgress={onUpdateProgress}
                    bookshelfLabel={bookshelfLabel}
                    progressPercentage={progressPercentage}
                />
            )}

            <FlexContainer $flexWrap="wrap" $gap="1rem">
                {!isOwned && (
                    <Button
                        variant="primary"
                        onClick={onOpenAddToBookshelfModal}
                        leftIcon={<Icon className="fa-solid fa-plus" $fontColor="inherit" />}
                    >
                        {BOOK_TOP_SECTION_TEXTS.ADD_TO_BOOKSHELF}
                    </Button>
                )}
                <Button
                    variant="outline"
                    leftIcon={<Icon className="fa-solid fa-share-nodes" $fontColor="inherit" />}
                >
                    {BOOK_TOP_SECTION_TEXTS.SHARE}
                </Button>
            </FlexContainer>
        </S.InfoColumn>
    </S.TopSectionGrid>
);
