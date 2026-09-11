import {useBookshelfActions} from '@pages/Book/components/AddToBookshelfModal/useBookshelfActions';
import {Button, FlexContainer, Icon, IconWrapper, Modal, Text, TitleH4} from '@components/index';
import {
    BookshelfOptionsContainer,
    ModalAlert,
    IAddToBookshelfModalProps,
    getShelfIcon,
    ADD_TO_BOOKSHELF_TEXTS,
} from '@pages/Book/components/AddToBookshelfModal/index';
import {IBookshelfWithStatus} from '@pages/Book/book.interfaces';

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
                    <TitleH4>{ADD_TO_BOOKSHELF_TEXTS.MODAL_TITLE}</TitleH4>
                    <Button
                        variant="ghost"
                        BorderRadius="50%"
                        Width="2.5rem"
                        Height="2.5rem"
                        Padding="0"
                        onClick={onCloseModal}
                    >
                        <Icon className="fa-solid fa-xmark" size="lg" variant="muted" />
                    </Button>
                </FlexContainer>

                <FlexContainer
                    FlexDirection="column"
                    Gap="0.5rem"
                    BackgroundColor="transparent"
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
                                <IconWrapper shape="square" isActive={option.isSelected}>
                                    <Icon
                                        variant={option.isSelected ? 'primary' : 'muted'}
                                        className={getShelfIcon(option.name)}
                                        size="md"
                                    />
                                </IconWrapper>
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
                                        {option.bookCount === 1
                                            ? ADD_TO_BOOKSHELF_TEXTS.BOOK_SINGULAR
                                            : ADD_TO_BOOKSHELF_TEXTS.BOOK_PLURAL}
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

                <FlexContainer Padding="0.5rem 1rem 1.5rem" BackgroundColor="transparent">
                    {bookshelves.some((shelf) => shelf.isSelected) && (
                        <Text
                            variant={isLoading ? 'muted' : 'danger'}
                            size="sm"
                            Cursor={isLoading ? 'default' : 'pointer'}
                            Width="100%"
                            TextAlign="center"
                            onClick={isLoading ? undefined : handleDeleteFromBookshelf}
                        >
                            {ADD_TO_BOOKSHELF_TEXTS.REMOVE_FROM_BOOKSHELF}
                        </Text>
                    )}
                </FlexContainer>
            </FlexContainer>
            {alert.visible && <ModalAlert message={alert.message} variant={alert.variant} />}
        </Modal>
    );
};
