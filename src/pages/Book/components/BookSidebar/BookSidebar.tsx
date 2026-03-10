import { BaseContainer, ButtonGhost, FlexContainer, Icon, Text } from '@components/index';
import * as S from './BookSidebar.styled';

const SIDEBAR_BOOKS = [
    {
        title: 'The Hobbit',
        author: 'J.R.R. Tolkien',
        stars: 5,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFwN3woKB5h-WBR270QHC9Q2CTuYhx0UGgdGxa3AYbgzeF08FmCkrKExKuOLjOM3vy1XCjrhhcY1QmDFd1jq7koTcQtM6zKTZyILeAX0JhRpzay8x0dtnEAJwfPTjCZOfTqP4z54H7PLG90AI9sOnd-gMcjKJnId6m7dIlTTlOzuJo0W12TbE9CONb5RFqNwDVdRPqqf3zXLlbh-3DT4MJcJMgTKqu8BkcnFcRSbP7monmcm1Tpz4vui3FRHCGa0GiTTxoe2gckhs',
    },
    {
        title: 'Dune',
        author: 'Frank Herbert',
        stars: 4,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxyC50TZ8uhnVDxMWuWcYDDdeIcuB69o0kAd8EPf494WsxGKJ8WlqWHmMNbNUNMEuk1HHQuLBxBWGJqZBK3Lfi4pqrfQG9PxVnjeMJLGJWxujkyRjE9Vpx_LCK_l52ol52KJIQVZWqK71aqBteLyGuiEZE44CCROXkSz1uhI_sDTUEor9C942HLLfE1jHA-SWjhsVh1_vjeHgIUf9Rw0u4tMeF2iEGxbgKy4jA7vtypxpkB7SiGvt_yVywDDLWRjmeKcMteVdydj0',
    },
    {
        title: 'Shoe Dog',
        author: 'Phil Knight',
        stars: 5,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA503Ym2yKUwxhKeUahaDds_yOeX7ERFyWNGn33hGBmnZFAh4AYLNXLNNS_WWqRX-l1QMYEYCnXfn17ffn0igXXv71VJFCDEsrggvG_WsaEYTIoezaxwcgrvW3_TqI3DbPP74geTFW6pD8FYzCie_eqHh65siBHLNNZGZFr4oeMhJE8FDncjf4FxzbHNmsEMlLFIVP_--3_LK_Vvalps0zqLOhO6WgUeulmpWINdQKLGMZQl1qtQ2BriztsDCthyS2C0kM7K2rmNg8',
    },
];

export const BookSidebar = () => (
    <FlexContainer FlexDirection='column' BackgroundColorVariant='secondary' BorderRadius='1rem' Padding='2.5rem' Border='1px solid' Gap='1.5rem' LgPadding='1rem'>
        <Text size='lg' FontWeight='bold'>You might also like</Text>
        <BaseContainer BorderBottom='1px solid' Height='1px' />
        <FlexContainer FlexDirection='column' Gap='1.5rem' BackgroundColor='transparent'>
            {SIDEBAR_BOOKS.map((book) => (
                <S.MockSidebarItem key={book.title}>
                    <S.MockSidebarItemImg $bgImage={book.image} />
                    <FlexContainer FlexDirection='column' JustifyContent='center' BackgroundColor='inherit'>
                        <S.MockSidebarItemTitle>{book.title}</S.MockSidebarItemTitle>
                        <Text size='xs' variant='muted' FontStyle='italic'>
                            {book.author}
                        </Text>
                        <S.StarRating style={{ marginTop: '0.25rem' }}>
                            {[...Array(5)].map((_, i) => (
                                <Icon key={i}
                                    className={i < book.stars ? 'fa-solid fa-star' : 'fa-regular fa-star'} FontSize='0.75rem' />
                            ))}
                        </S.StarRating>
                    </FlexContainer>
                </S.MockSidebarItem>
            ))}
        </FlexContainer>
        <ButtonGhost>
            Discover more
        </ButtonGhost>
    </FlexContainer>
);
