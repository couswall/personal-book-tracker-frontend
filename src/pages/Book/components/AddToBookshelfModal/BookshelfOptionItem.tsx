import {FlexContainer, Icon, IconWrapper, Text} from '@components/index';
import {
    BookshelfOptionsContainer,
    CurrentBadge,
} from '@pages/Book/components/AddToBookshelfModal/addToBookshelfModal.styled';
import {IBookshelfOptionItemProps} from '@pages/Book/components/AddToBookshelfModal/addToBookshelfModal.interfaces';
import {ADD_TO_BOOKSHELF_TEXTS} from '@pages/Book/components/AddToBookshelfModal/addToBookshelfModal.constants';
import {getShelfIcon} from '@pages/Book/components/AddToBookshelfModal/addToBookshelfModal.utils';

/**
 * Two distinct states: the shelf the book is on now (`option.isSelected`, muted + "Current"
 * badge) and the shelf the user just picked (`isTarget`, primary + spinner while it saves).
 * Once saved, the refresh makes the picked shelf the current one.
 */
export const BookshelfOptionItem: React.FC<IBookshelfOptionItemProps> = ({
    option,
    isTarget,
    isLoading,
    onSelect,
}) => {
    const isCurrent = option.isSelected;
    return (
        <BookshelfOptionsContainer
            role="button"
            aria-current={isCurrent || undefined}
            aria-busy={isTarget || undefined}
            $isCurrent={isCurrent}
            $isTarget={isTarget}
            $isLoading={isLoading}
            onClick={() => onSelect(option)}
        >
            <FlexContainer $gap="1rem" $alignItems="center" $backgroundColor="transparent">
                <IconWrapper shape="square" isActive={isTarget}>
                    <Icon
                        variant={isTarget ? 'primary' : 'muted'}
                        className={getShelfIcon(option.type)}
                        size="md"
                    />
                </IconWrapper>
                <FlexContainer $flexDirection="column" $gap="0.2rem" $backgroundColor="transparent">
                    <FlexContainer
                        $gap="0.5rem"
                        $alignItems="center"
                        $backgroundColor="transparent"
                    >
                        <Text
                            size="md"
                            weight="semibold"
                            variant={isTarget ? 'primary' : 'default'}
                        >
                            {option.name}
                        </Text>
                        {isCurrent && (
                            <CurrentBadge>{ADD_TO_BOOKSHELF_TEXTS.CURRENT_BADGE}</CurrentBadge>
                        )}
                    </FlexContainer>
                    <Text variant="muted" size="xs">
                        {option.bookCount}{' '}
                        {option.bookCount === 1
                            ? ADD_TO_BOOKSHELF_TEXTS.BOOK_SINGULAR
                            : ADD_TO_BOOKSHELF_TEXTS.BOOK_PLURAL}
                    </Text>
                </FlexContainer>
            </FlexContainer>
            {isTarget && (
                <Icon variant="primary" className="fa-solid fa-spinner fa-spin" size="xl" />
            )}
        </BookshelfOptionsContainer>
    );
};
