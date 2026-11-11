import {FlexContainer, Icon, Image, Text} from '@components/index';
import {
    BookContextContainer,
    BookThumbnail,
    CompletedBadge,
} from '@pages/Book/components/AddToBookshelfModal/bookshelfConfirmations.styled';
import {IBookContextCardProps} from '@pages/Book/components/AddToBookshelfModal/addToBookshelfModal.interfaces';

export const BookContextCard: React.FC<IBookContextCardProps> = ({
    title,
    authors,
    coverImageUrl,
    badgeLabel,
}) => (
    <BookContextContainer>
        <BookThumbnail>
            {coverImageUrl ? (
                <Image src={coverImageUrl} alt={title} $objectFit="cover" />
            ) : (
                <Icon className="fa-solid fa-book" variant="muted" size="lg" />
            )}
        </BookThumbnail>
        <FlexContainer
            $flexDirection="column"
            $gap="0.125rem"
            $flex="1"
            $backgroundColor="transparent"
        >
            {badgeLabel && <CompletedBadge>{badgeLabel}</CompletedBadge>}
            <Text weight="bold" $whiteSpace="nowrap" $overflow="hidden" $textOverflow="ellipsis">
                {title}
            </Text>
            <Text
                size="xs"
                variant="muted"
                $whiteSpace="nowrap"
                $overflow="hidden"
                $textOverflow="ellipsis"
            >
                {authors.join(', ')}
            </Text>
        </FlexContainer>
    </BookContextContainer>
);
