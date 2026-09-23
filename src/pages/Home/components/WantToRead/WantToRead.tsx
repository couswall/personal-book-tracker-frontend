import {BaseContainer, Button, FlexContainer, Icon, Image, TitleH4} from '@components/index';
import * as S from '@pages/Home/components/WantToRead/wantToRead.styled';
import {IHomeWantToReadBook} from '@pages/Home/home.interfaces';
import {HOME_TEXTS} from '@pages/Home/home.constants';

export const WantToRead: React.FC<{books: IHomeWantToReadBook[]}> = ({books}) => (
    <BaseContainer as="section" $padding="0 0 3rem 0">
        <FlexContainer
            $justifyContent="space-between"
            $alignItems="center"
            $marginBottom="1.5rem"
            $backgroundColor="transparent"
        >
            <FlexContainer $alignItems="center" $gap="0.5rem" $backgroundColor="transparent">
                <Icon variant="primary" className="fa-solid fa-bookmark" size="lg" />
                <TitleH4>{HOME_TEXTS.WANT_TO_READ_TITLE}</TitleH4>
            </FlexContainer>
            <Button
                variant="ghost"
                size="sm"
                rightIcon={<Icon className="fa-solid fa-arrow-right" $fontColor="inherit" />}
            >
                {HOME_TEXTS.VIEW_ALL}
            </Button>
        </FlexContainer>
        <S.ScrollRow $gap="1.5rem" $overflowX="auto" $padding="0 0 0.5rem 0">
            {books.map((book) => (
                <S.ShelfItem
                    key={book.id}
                    $flexDirection="column"
                    $flex="0 0 auto"
                    $width="9.5rem"
                    $lgWidth="8.5rem"
                    $cursor="pointer"
                >
                    <S.ShelfCoverWrapper
                        $width="100%"
                        $aspectRatio="3 / 4"
                        $borderRadius="0.5rem"
                        $border="1px solid"
                        $marginBottom="0.75rem"
                        $overflow="hidden"
                    >
                        <Image src={book.coverImageUrl} alt={book.title} $objectFit="cover" />
                    </S.ShelfCoverWrapper>
                    <S.ShelfTitle
                        size="sm"
                        weight="medium"
                        variant="muted"
                        $whiteSpace="nowrap"
                        $textOverflow="ellipsis"
                        $overflow="hidden"
                    >
                        {book.title}
                    </S.ShelfTitle>
                </S.ShelfItem>
            ))}
        </S.ScrollRow>
    </BaseContainer>
);
