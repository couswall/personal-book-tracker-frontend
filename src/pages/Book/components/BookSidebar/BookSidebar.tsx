import {BaseContainer, Button, FlexContainer, RatingStars, Text} from '@components/index';
import * as S from './bookSidebar.styled';
import {
    BOOK_SIDEBAR_TEXTS,
    SIDEBAR_BOOKS,
} from '@pages/Book/components/BookSidebar/bookSidebar.constants';

export const BookSidebar = () => (
    <FlexContainer
        $flexDirection="column"
        backgroundColorVariant="secondary"
        $borderRadius="1rem"
        $padding="2.5rem"
        $border="1px solid"
        $gap="1.5rem"
        $lgPadding="1rem"
    >
        <Text size="lg" FontWeight="bold">
            {BOOK_SIDEBAR_TEXTS.TITLE}
        </Text>
        <BaseContainer $borderBottom="1px solid" $height="1px" />
        <FlexContainer $flexDirection="column" $gap="1.5rem" $backgroundColor="transparent">
            {SIDEBAR_BOOKS.map((book) => (
                <S.MockSidebarItem key={book.title}>
                    <S.MockSidebarItemImg $bgImage={book.image} />
                    <FlexContainer
                        $flexDirection="column"
                        $justifyContent="center"
                        $backgroundColor="inherit"
                    >
                        <S.MockSidebarItemTitle>{book.title}</S.MockSidebarItemTitle>
                        <Text size="xs" variant="muted" FontStyle="italic">
                            {book.author}
                        </Text>
                        <RatingStars rating={book.stars} size="0.75rem" MarginTop="0.25rem" />
                    </FlexContainer>
                </S.MockSidebarItem>
            ))}
        </FlexContainer>
        <Button variant="ghost">{BOOK_SIDEBAR_TEXTS.DISCOVER_MORE}</Button>
    </FlexContainer>
);
