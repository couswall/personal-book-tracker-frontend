import React from 'react';
import {Button, FlexContainer, Paragraph, TitleH4} from '@components/index';
import {CoverBookImg} from '@pages/Book/components/index';
import {StarRating} from '@pages/Search/StarRating';
import {NAVBAR} from '@components/Navbar/constants';
import {ISearchBook} from '@store/books/searchBook/interfaces';

export interface IBookResultProps {
    book: ISearchBook;
}

export const BookResult: React.FC<IBookResultProps> = ({book}) => {
    return (
        <FlexContainer
            Padding="1rem"
            BorderRadius="0.75rem"
            BackgroundColorVariant="card"
            Gap="1.25rem"
        >
            <CoverBookImg imgSrc={book.imageCover} width="96px" height="144px" flex="0 0 auto" />
            <FlexContainer FlexDirection="column" BackgroundColor="inherit" Gap="0.5rem">
                <TitleH4>{book.title}</TitleH4>
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
                    <FlexContainer Gap="0.5rem" AlignItems="center" BackgroundColor="inherit">
                        <StarRating rating={book.averageRating} size="0.875rem" />
                        <Paragraph variant="muted" size="xs">
                            {book.averageRating.toFixed(1)}
                        </Paragraph>
                    </FlexContainer>
                )}
                <Button variant="secondary" Width="max-content">
                    Add to Shelf
                </Button>
            </FlexContainer>
        </FlexContainer>
    );
};
