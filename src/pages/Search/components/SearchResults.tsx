import React from 'react';
import {FlexContainer, LoadingSpinner, Paragraph} from '@components/index';
import {BookResult} from '@pages/Search/components/BookResult';
import {ISearchResultsProps} from '@pages/Search/components/search.components.interfaces';
import {SEARCH_PAGE} from '@pages/Search/search.constants';

export const SearchResults: React.FC<ISearchResultsProps> = ({books, loading, hasSearched}) => {
    if (loading) {
        return (
            <FlexContainer $height="40vh" $justifyContent="center" $alignItems="center">
                <LoadingSpinner />
            </FlexContainer>
        );
    }

    if (books?.length) {
        return books.map((book) => <BookResult key={book.id} book={book} />);
    }

    if (hasSearched) {
        return <Paragraph>{SEARCH_PAGE.NO_RESULTS}</Paragraph>;
    }

    return null;
};
