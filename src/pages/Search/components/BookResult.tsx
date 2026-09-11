import {useNavigate} from 'react-router';
import React from 'react';
import {Button, FlexContainer, Paragraph, RatingStars, TitleH4} from '@components/index';
import {CoverBookImg} from '@pages/Book/components/index';
import {privateRoutes} from '@routes/routes';
import {NAVBAR} from '@components/Navbar/constants';
import {IBookResultProps} from '@pages/Search/components/search.components.interfaces';
import {BOOK_RESULT_TEXTS} from '@pages/Search/components/search.components.constants';

export const BookResult: React.FC<IBookResultProps> = ({book}) => {
    const navigate = useNavigate();
    const navigateToBook = () => {
        const route = privateRoutes.book.replace(':id', String(book.id));
        navigate(route);
    };
    return (
        <FlexContainer
            $padding="1rem"
            $borderRadius="0.75rem"
            backgroundColorVariant="card"
            $gap="1.25rem"
        >
            <CoverBookImg
                imgSrc={book.imageCover}
                width="96px"
                height="144px"
                flex="0 0 auto"
                cursor="pointer"
                onClick={navigateToBook}
            />
            <FlexContainer $flexDirection="column" $backgroundColor="inherit" $gap="0.5rem">
                <TitleH4 Cursor="pointer" onClick={navigateToBook}>
                    {book.title}
                </TitleH4>
                {book.authors && (
                    <Paragraph
                        variant="muted"
                        size="xs"
                        WhiteSpace="nowrap"
                        Width="100%"
                        Overflow="hidden"
                        TextOverflow="ellipsis"
                    >{`${NAVBAR.BY} ${book.authors.join(',')}`}</Paragraph>
                )}
                {book.averageRating !== undefined && (
                    <FlexContainer $gap="0.5rem" $alignItems="center" $backgroundColor="inherit">
                        <RatingStars rating={book.averageRating} size="0.875rem" />
                        <Paragraph variant="muted" size="xs">
                            {book.averageRating.toFixed(1)}
                        </Paragraph>
                        <Paragraph variant="muted" size="xs">
                            ({book.reviewCount ?? 0})
                        </Paragraph>
                    </FlexContainer>
                )}
                <Button variant="secondary" $width="max-content">
                    {BOOK_RESULT_TEXTS.ADD_TO_SHELF}
                </Button>
            </FlexContainer>
        </FlexContainer>
    );
};
