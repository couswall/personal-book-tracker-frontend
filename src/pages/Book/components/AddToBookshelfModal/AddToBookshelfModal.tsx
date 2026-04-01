import {useBookshelfActions} from '@pages/Book/components/AddToBookshelfModal/useBookshelfActions';
import {
    ButtonGhost,
    ButtonPrimary,
    FlexContainer,
    Icon,
    Modal,
    Text,
    TitleH3,
} from '@components/index';
import {
    BookshelfOptionsContainer,
    ModalAlert,
    IAddToBookshelfModalProps,
} from '@pages/Book/components/AddToBookshelfModal/index';
import {IBookshelfWithStatus} from '@pages/Book/Book.interfaces';

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
        >
            <FlexContainer
                FlexDirection="column"
                Gap="1.5rem"
                BackgroundColorVariant="card"
                Padding="1rem 1.25rem"
                Height="max-content"
                BorderRadius="0.75rem"
                Border="1px solid"
                Width="400px"
            >
                <FlexContainer
                    JustifyContent="space-between"
                    AlignItems="center"
                    BackgroundColor="inherit"
                    Width="100%"
                >
                    <TitleH3>Add to Bookshelf</TitleH3>
                    <ButtonGhost
                        Padding="1rem"
                        Width="1.25rem"
                        Height="1.25rem"
                        onClick={onCloseModal}
                    >
                        <Icon className="fa-solid fa-xmark" size="lg" />
                    </ButtonGhost>
                </FlexContainer>
                <FlexContainer
                    FlexDirection="column"
                    Gap="0.5rem"
                    BackgroundColor="inherit"
                    MaxHeight="300px"
                    OverflowY="auto"
                >
                    {bookshelves.map((option) => (
                        <BookshelfOptionsContainer
                            key={option.id}
                            isSelected={option.isSelected}
                            $isLoading={isLoading}
                            onClick={() => handleSelectBookshelf(option)}
                        >
                            <FlexContainer
                                Gap="1.25rem"
                                AlignItems="center"
                                BackgroundColor="transparent"
                            >
                                <Icon
                                    variant={option.isSelected ? 'primary' : 'muted'}
                                    className={
                                        option.isCustom
                                            ? 'fa-solid fa-book-bookmark'
                                            : 'fa-solid fa-book'
                                    }
                                    size="lg"
                                />
                                <FlexContainer
                                    FlexDirection="column"
                                    Gap="0.25rem"
                                    BackgroundColor="transparent"
                                >
                                    <Text
                                        size="lg"
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
                                <Icon variant="primary" className="fa-solid fa-check" size="lg" />
                            )}
                        </BookshelfOptionsContainer>
                    ))}
                </FlexContainer>
                <ButtonPrimary>Create a new bookshelf</ButtonPrimary>
                {bookshelves.some((shelf) => shelf.isSelected) && (
                    <Text
                        variant={isLoading ? 'muted' : 'danger'}
                        size="xs"
                        Cursor={isLoading ? 'default' : 'pointer'}
                        Width="100%"
                        TextAlign="center"
                        onClick={isLoading ? undefined : handleDeleteFromBookshelf}
                    >
                        Remove from Bookshelf
                    </Text>
                )}
            </FlexContainer>
            {alert.visible && <ModalAlert message={alert.message} variant={alert.variant} />}
        </Modal>
    );
};
