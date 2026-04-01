import {useBookshelfActions} from '@pages/Book/components/AddToBookshelfModal/useBookshelfActions';
import {
    ButtonGhost,
    ButtonPrimary,
    FlexContainer,
    Icon,
    Modal,
    Text,
    TitleH4,
} from '@components/index';
import {
    BookshelfOptionsContainer,
    ShelfIconWrapper,
    ModalAlert,
    IAddToBookshelfModalProps,
} from '@pages/Book/components/AddToBookshelfModal/index';
import {IBookshelfWithStatus} from '@pages/Book/book.interfaces';

const DEFAULT_SHELF_ICONS: Record<string, string> = {
    'to be read': 'fa-solid fa-hourglass-half',
    'currently reading': 'fa-solid fa-book-open',
    read: 'fa-solid fa-check-double',
};

const getShelfIcon = (name: string, isCustom: boolean): string => {
    if (isCustom) return 'fa-solid fa-book-bookmark';
    return DEFAULT_SHELF_ICONS[name.toLowerCase()] ?? 'fa-solid fa-book';
};

export const AddToBookshelfModal: React.FC<IAddToBookshelfModalProps> = ({
    isOpen,
    onCloseModal,
    bookshelves,
    bookId,
    token,
    onRefresh,
}) => {
    const {isLoading, alert, add, update, remove} = useBookshelfActions({token, bookId, onRefresh});

    const handleSelectBookshelf = async (bookshelf: IBookshelfWithStatus) => {
        if (isLoading || bookshelf.isSelected) return;
        const selectedBookshelf = bookshelves.find((shelf) => shelf.isSelected);
        if (selectedBookshelf?.bookshelfBookId) {
            await update(selectedBookshelf.bookshelfBookId, bookshelf.id, bookshelf.name);
            return;
        }
        await add(bookshelf.id, bookshelf.name);
    };

    const handleDeleteFromBookshelf = async () => {
        if (isLoading) return;
        const selectedBookshelf = bookshelves.find((shelf) => shelf.isSelected);
        if (!selectedBookshelf?.bookshelfBookId) return;
        await remove(selectedBookshelf.bookshelfBookId, selectedBookshelf.name);
    };

    return (
        <Modal
            isOpen={isOpen}
            onCloseModal={onCloseModal}
            JustifyContent="center"
            AlignItems="center"
            Padding="1rem"
        >
            <FlexContainer
                FlexDirection="column"
                BackgroundColorVariant="card"
                BorderRadius="0.75rem"
                Border="1px solid rgba(255, 255, 255, 0.05)"
                Width="100%"
                MaxWidth="440px"
                Overflow="hidden"
                BoxShadow="0 32px 64px -12px rgba(0, 0, 0, 0.6)"
            >
                <FlexContainer
                    JustifyContent="space-between"
                    AlignItems="center"
                    BackgroundColorVariant="tertiary"
                    BorderBottom="1px solid rgba(255, 255, 255, 0.05)"
                    Padding="1.25rem 1.5rem"
                    Width="100%"
                >
                    <TitleH4>Add to bookshelf</TitleH4>
                    <ButtonGhost
                        BorderRadius="50%"
                        Width="2.5rem"
                        Height="2.5rem"
                        Padding="0"
                        onClick={onCloseModal}
                    >
                        <Icon className="fa-solid fa-xmark" size="lg" variant="muted" />
                    </ButtonGhost>
                </FlexContainer>

                <FlexContainer
                    FlexDirection="column"
                    Gap="0.5rem"
                    BackgroundColor="transparent"
                    MaxHeight="240px"
                    OverflowY="auto"
                    Padding="1rem"
                >
                    {bookshelves.map((option) => (
                        <BookshelfOptionsContainer
                            key={option.id}
                            isSelected={option.isSelected}
                            $isLoading={isLoading}
                            onClick={() => handleSelectBookshelf(option)}
                        >
                            <FlexContainer
                                Gap="1rem"
                                AlignItems="center"
                                BackgroundColor="transparent"
                            >
                                <ShelfIconWrapper isSelected={option.isSelected}>
                                    <Icon
                                        variant={option.isSelected ? 'primary' : 'muted'}
                                        className={getShelfIcon(option.name, option.isCustom)}
                                        size="md"
                                    />
                                </ShelfIconWrapper>
                                <FlexContainer
                                    FlexDirection="column"
                                    Gap="0.2rem"
                                    BackgroundColor="transparent"
                                >
                                    <Text
                                        size="md"
                                        weight="semibold"
                                        variant={option.isSelected ? 'primary' : 'default'}
                                    >
                                        {option.name}
                                    </Text>
                                    <Text variant="muted" size="xs">
                                        {option.bookCount}{' '}
                                        {option.bookCount === 1 ? 'BOOK' : 'BOOKS'}
                                    </Text>
                                </FlexContainer>
                            </FlexContainer>
                            {option.isSelected && (
                                <Icon
                                    variant="primary"
                                    className="fa-solid fa-circle-check"
                                    size="xl"
                                />
                            )}
                        </BookshelfOptionsContainer>
                    ))}
                </FlexContainer>

                <FlexContainer
                    FlexDirection="column"
                    Gap="0.75rem"
                    Padding="0.5rem 1rem 1.5rem"
                    BackgroundColor="transparent"
                >
                    <ButtonPrimary fullWidth Gap="0.5rem">
                        <Icon className="fa-solid fa-plus" size="md" FontColor="inherit" />
                        <Text
                            size="xs"
                            weight="bold"
                            TextTransform="uppercase"
                            LetterSpacing="0.1em"
                            FontColor="inherit"
                        >
                            Create new shelf
                        </Text>
                    </ButtonPrimary>
                    {bookshelves.some((shelf) => shelf.isSelected) && (
                        <Text
                            variant={isLoading ? 'muted' : 'danger'}
                            size="sm"
                            Cursor={isLoading ? 'default' : 'pointer'}
                            Width="100%"
                            TextAlign="center"
                            onClick={isLoading ? undefined : handleDeleteFromBookshelf}
                        >
                            Remove from Bookshelf
                        </Text>
                    )}
                </FlexContainer>
            </FlexContainer>
            {alert.visible && <ModalAlert message={alert.message} variant={alert.variant} />}
        </Modal>
    );
};
