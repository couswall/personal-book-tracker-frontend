import {FlexContainer, ButtonOutline, Icon, Text} from '@components/index';
import {CoverBookImg} from '@pages/Book/components/CoverBookImg';
import {BookActivity} from '@pages/Book/components/BookActivity';
import * as S from '@pages/Book/Book.styled';
import {formatIsoDate} from '@pages/Book/Book.utils';
import {IBook} from '@store/books/getBookById/interfaces';

interface BookTopSectionProps {
    book: IBook;
}

export const BookTopSection = ({book}: BookTopSectionProps) => (
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
                            by{' '}
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
                            Published
                        </Text>
                        <Text weight="medium">{formatIsoDate(book.publishedDate)}</Text>
                    </FlexContainer>
                )}
                {book.pageCount && (
                    <FlexContainer FlexDirection="column" Gap="0.25rem">
                        <Text variant="muted" weight="bold" size="xs" TextTransform="uppercase">
                            Page Count
                        </Text>
                        <Text weight="medium">{book.pageCount} pages</Text>
                    </FlexContainer>
                )}
                <FlexContainer FlexDirection="column" Gap="0.25rem">
                    <Text variant="muted" weight="bold" size="xs" TextTransform="uppercase">
                        Global Rating
                    </Text>
                    <FlexContainer AlignItems="center" Gap="0.5rem">
                        <S.StarRating isPrimaryColor>
                            {[...Array(4)].map((_, i) => (
                                <Icon key={i} className="fa-solid fa-star" FontSize="1.125rem" />
                            ))}
                            <Icon className="fa-solid fa-star-half-stroke" FontSize="1.125rem" />
                        </S.StarRating>
                        <Text weight="medium">{book.averageRating || 'N/A'}</Text>
                    </FlexContainer>
                </FlexContainer>
            </FlexContainer>

            <FlexContainer AlignItems="center" Gap="0.5rem" MarginBottom="2rem" FlexWrap="wrap">
                {book.categories?.length > 0 ? (
                    book.categories.map((cat, i) => (
                        <S.CategoryBadge key={i}>{cat}</S.CategoryBadge>
                    ))
                ) : (
                    <S.CategoryBadge>Uncategorized</S.CategoryBadge>
                )}
            </FlexContainer>

            <BookActivity />

            <FlexContainer FlexWrap="wrap" Gap="1rem">
                <ButtonOutline Gap="0.5rem">
                    <Icon className="fa-solid fa-share-nodes" FontColor="inherit" />
                    Share
                </ButtonOutline>
            </FlexContainer>
        </S.InfoColumn>
    </S.TopSectionGrid>
);
