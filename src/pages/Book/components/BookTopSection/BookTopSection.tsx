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
            <FlexContainer FlexDirection="column" Gap="0.5rem" MarginBottom="1.5rem">
                <S.BookTitle>{book.title}</S.BookTitle>
                <FlexContainer FlexDirection="column">
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
                FlexWrap="wrap"
                AlignItems="center"
                BorderTop="1px solid"
                BorderBottom="1px solid"
                Padding="1.5rem 0"
                MarginBottom="1rem"
                Gap="2rem"
            >
                {book.publishedDate && (
                    <FlexContainer FlexDirection="column" Gap="0.25rem">
                        <Text variant="muted" weight="bold" size="xs" TextTransform="uppercase">
                            {BOOK_TOP_SECTION_TEXTS.PUBLISHED}
                        </Text>
                        <Text weight="medium">{formatIsoDate(book.publishedDate)}</Text>
                    </FlexContainer>
                )}
                {book.pageCount && (
                    <FlexContainer FlexDirection="column" Gap="0.25rem">
                        <Text variant="muted" weight="bold" size="xs" TextTransform="uppercase">
                            {BOOK_TOP_SECTION_TEXTS.PAGE_COUNT}
                        </Text>
                        <Text weight="medium">
                            {book.pageCount} {BOOK_TOP_SECTION_TEXTS.PAGES_SUFFIX}
                        </Text>
                    </FlexContainer>
                )}
                <FlexContainer FlexDirection="column" Gap="0.25rem">
                    <Text variant="muted" weight="bold" size="xs" TextTransform="uppercase">
                        {BOOK_TOP_SECTION_TEXTS.GLOBAL_RATING}
                    </Text>
                    <FlexContainer AlignItems="center" Gap="0.5rem">
                        <RatingStars rating={book.averageRating} size="1.125rem" />
                        <Text weight="medium">
                            {book.averageRating || BOOK_TOP_SECTION_TEXTS.NO_RATING}
                        </Text>
                    </FlexContainer>
                </FlexContainer>
            </FlexContainer>

            <FlexContainer AlignItems="center" Gap="0.5rem" MarginBottom="2rem" FlexWrap="wrap">
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

            <FlexContainer FlexWrap="wrap" Gap="1rem">
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
