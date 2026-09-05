import {BaseContainer, ButtonGhost, FlexContainer, Icon, Text} from '@components/index';
import * as S from './bookSidebar.styled';
import {
    BOOK_SIDEBAR_TEXTS,
    SIDEBAR_BOOKS,
} from '@pages/Book/components/BookSidebar/bookSidebar.constants';

export const BookSidebar = () => (
    <FlexContainer
        FlexDirection="column"
        BackgroundColorVariant="secondary"
        BorderRadius="1rem"
        Padding="2.5rem"
        Border="1px solid"
        Gap="1.5rem"
        LgPadding="1rem"
    >
        <Text size="lg" FontWeight="bold">
            {BOOK_SIDEBAR_TEXTS.TITLE}
        </Text>
        <BaseContainer BorderBottom="1px solid" Height="1px" />
        <FlexContainer FlexDirection="column" Gap="1.5rem" BackgroundColor="transparent">
            {SIDEBAR_BOOKS.map((book) => (
                <S.MockSidebarItem key={book.title}>
                    <S.MockSidebarItemImg $bgImage={book.image} />
                    <FlexContainer
                        FlexDirection="column"
                        JustifyContent="center"
                        BackgroundColor="inherit"
                    >
                        <S.MockSidebarItemTitle>{book.title}</S.MockSidebarItemTitle>
                        <Text size="xs" variant="muted" FontStyle="italic">
                            {book.author}
                        </Text>
                        <S.StarRating style={{marginTop: '0.25rem'}}>
                            {[...Array(5)].map((_, i) => (
                                <Icon
                                    key={i}
                                    className={
                                        i < book.stars ? 'fa-solid fa-star' : 'fa-regular fa-star'
                                    }
                                    FontSize="0.75rem"
                                />
                            ))}
                        </S.StarRating>
                    </FlexContainer>
                </S.MockSidebarItem>
            ))}
        </FlexContainer>
        <ButtonGhost>{BOOK_SIDEBAR_TEXTS.DISCOVER_MORE}</ButtonGhost>
    </FlexContainer>
);
