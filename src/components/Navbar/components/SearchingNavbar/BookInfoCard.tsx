import {useNavigate} from 'react-router';
import {FlexContainer, Text} from '@components/index';
import {CoverBookImg} from '@pages/Book/components/index';
import {NAVBAR} from '@components/Navbar/constants';
import {privateRoutes} from '@routes/routes';
import {IBookInfoCardProps} from '@pages/Search/search.interfaces';

export const BookInfoCard: React.FC<IBookInfoCardProps> = ({
    book,
    onClickOption,
    imageWidth = '50px',
    imageHeight = '70px',
}) => {
    const navigate = useNavigate();
    const handleSelectOption = (bookId: string) => {
        const route = privateRoutes.book.replace(':id', bookId);
        navigate(route);
        if (onClickOption) onClickOption();
    };
    return (
        <FlexContainer
            $gap="0.75rem"
            $padding="0.75rem"
            $cursor="pointer"
            $width="100%"
            onClick={() => handleSelectOption(String(book.id))}
            $borderBottom="1px solid"
            $backgroundColor="inherit"
            hBackgroundColorVariant="muted"
        >
            <CoverBookImg
                imgSrc={book.imageCover}
                width={imageWidth}
                height={imageHeight}
                flex="none"
            />
            <FlexContainer
                $flexDirection="column"
                $justifyContent="center"
                $overflow="hidden"
                $backgroundColor="transparent"
            >
                <Text
                    size="sm"
                    weight="semibold"
                    WhiteSpace="nowrap"
                    Width="100%"
                    Overflow="hidden"
                    TextOverflow="ellipsis"
                >
                    {book.title}
                </Text>
                {book.authors && (
                    <Text
                        variant="muted"
                        size="xs"
                        WhiteSpace="nowrap"
                        Width="100%"
                        Overflow="hidden"
                        TextOverflow="ellipsis"
                    >{`${NAVBAR.BY} ${book.authors.join(',')}`}</Text>
                )}
            </FlexContainer>
        </FlexContainer>
    );
};
