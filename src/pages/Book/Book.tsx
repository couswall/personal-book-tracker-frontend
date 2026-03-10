import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { AppDispatch, RootState } from '@store/store';
import { BaseContainer, ButtonOutline, FlexContainer, GridContainer, Icon, LoadingSpinner, Text, TitleH4 } from '@components/index';
import {
    CoverBookImg,
    NoBookFound,
    BookActivity,
    BookReviews,
    BookSidebar,
} from '@pages/Book/components/index';
import * as S from '@pages/Book/Book.styled';
import { getBookById } from '@store/index';
import { formatIsoDate } from '@pages/Book/Book.utils';

export const Book = () => {
    const { id } = useParams();
    const dispatch: AppDispatch = useDispatch();
    const { token } = useSelector((state: RootState) => state.auth);
    const { book, loading } = useSelector((state: RootState) => state.getBookById);
    const [showMoreDescription, setShowMoreDescription] = useState<boolean>(false);

    useEffect(() => {
        if (!id || !token) return;
        dispatch(getBookById({ token, id }));
    }, [id, token, dispatch]);

    if (loading) {
        return (
            <FlexContainer JustifyContent="center" AlignItems="center" MinHeight="100vh">
                <LoadingSpinner />
            </FlexContainer>
        );
    }

    if (!book) return <NoBookFound />;

    return (
        <S.LayoutContainer>
            {/* ── Top Section ── */}
            <S.TopSectionGrid>
                <S.ImageColumn>
                    <S.ImageWrapper>
                        <CoverBookImg width="100%" height="100%" imgSrc={book.coverImageUrl} />
                    </S.ImageWrapper>
                </S.ImageColumn>

                <S.InfoColumn>
                    <FlexContainer FlexDirection='column' Gap='0.5rem' MarginBottom='1.5rem'>
                        <S.BookTitle>{book.title}</S.BookTitle>
                        <FlexContainer FlexDirection='column'>
                            {book.authors?.length > 0 && (
                                <S.AuthorText variant='muted' FontSize='1.25rem' LgFontSize='1.125rem'>
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
                                <Text variant='muted' FontSize='1.25rem' LgFontSize='1.125rem' MarginTop='0.25rem'>
                                    {book.subtitle}
                                </Text>
                            )}
                        </FlexContainer>
                    </FlexContainer>

                    <FlexContainer FlexWrap='wrap' AlignItems='center' BorderTop='1px solid' BorderBottom='1px solid' Padding='1.5rem 0' MarginBottom='1rem' Gap='2rem'>
                        {book.publishedDate && (
                            <FlexContainer FlexDirection='column' Gap='0.25rem'>
                                <Text variant='muted' weight='bold' size='xs' TextTransform='uppercase' >
                                    Published
                                </Text>
                                <Text weight='medium'>{formatIsoDate(book.publishedDate)}</Text>
                            </FlexContainer>
                        )}
                        {book.pageCount && (
                            <FlexContainer FlexDirection='column' Gap='0.25rem'>
                                <Text variant='muted' weight='bold' size='xs' TextTransform='uppercase' >
                                    Page Count
                                </Text>
                                <Text weight='medium'>{book.pageCount} pages</Text>
                            </FlexContainer>
                        )}
                        <FlexContainer FlexDirection='column' Gap='0.25rem'>
                            <Text variant='muted' weight='bold' size='xs' TextTransform='uppercase' >
                                Global Rating
                            </Text>
                            <FlexContainer AlignItems='center' Gap='0.5rem'>
                                <S.StarRating isPrimaryColor>
                                    {[...Array(4)].map((_, i) => (
                                        <Icon key={i} className="fa-solid fa-star" FontSize='1.125rem' />
                                    ))}
                                    <Icon className="fa-solid fa-star-half-stroke" FontSize='1.125rem' />
                                </S.StarRating>
                                <Text weight='medium'>{book.averageRating || 'N/A'}</Text>
                            </FlexContainer>
                        </FlexContainer>
                    </FlexContainer>

                    <FlexContainer
                        AlignItems="center"
                        Gap="0.5rem"
                        MarginBottom="2rem"
                        FlexWrap="wrap"
                    >
                        {book.categories?.length > 0 ? (
                            book.categories.map((cat, i) => (
                                <S.CategoryBadge key={i}>{cat}</S.CategoryBadge>
                            ))
                        ) : (
                            <S.CategoryBadge>Uncategorized</S.CategoryBadge>
                        )}
                    </FlexContainer>

                    <BookActivity />

                    <FlexContainer FlexWrap='wrap' Gap='1rem'>
                        <ButtonOutline Gap='0.5rem'>
                            <Icon className="fa-solid fa-share-nodes" FontColor='inherit' />
                            Share
                        </ButtonOutline>
                    </FlexContainer>
                </S.InfoColumn>
            </S.TopSectionGrid>

            {/* ── Bottom Section ── */}
            <GridContainer TemplateColumns='repeat(12, minmax(0, 1fr))' Gap='3rem' LgTemplateColumns='1fr' LgGap='2rem'>
                <FlexContainer FlexDirection='column' Gap='3rem' GridColumn='span 8 / span 8' LgGridColumn='unset'>
                    <section>
                        <TitleH4 MarginBottom='1rem'>
                            Description
                        </TitleH4>
                        {book.description ? (
                            <>
                                <S.DescriptionText
                                    $showMore={showMoreDescription}
                                    dangerouslySetInnerHTML={{ __html: book.description }}
                                />

                                <S.ShowMoreBtn
                                    onClick={() => setShowMoreDescription(!showMoreDescription)}
                                >
                                    {showMoreDescription ? 'Show less' : 'Show more'}
                                    <Icon FontColor='inherit' className={
                                        showMoreDescription
                                            ? 'fa-solid fa-chevron-up'
                                            : 'fa-solid fa-chevron-down'
                                    } />

                                </S.ShowMoreBtn>
                            </>
                        ) : (
                            <S.DescriptionText $showMore={true}>
                                No description available.
                            </S.DescriptionText>
                        )}
                    </section>

                    <BookReviews />
                </FlexContainer>

                <BaseContainer GridColumn='span 4 / span 4' LgGridColumn='unset'>
                    <BookSidebar />
                </BaseContainer>
            </GridContainer>
        </S.LayoutContainer>
    );
};
