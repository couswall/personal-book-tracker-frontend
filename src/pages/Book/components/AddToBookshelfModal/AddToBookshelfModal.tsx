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
            $justifyContent="center"
            $alignItems="center"
            $padding="1rem"
        >
            <FlexContainer
                $flexDirection="column"
                backgroundColorVariant="card"
                $borderRadius="0.75rem"
                $border="1px solid rgba(255, 255, 255, 0.05)"
                $width="100%"
                $maxWidth="440px"
                $overflow="hidden"
                $boxShadow="0 32px 64px -12px rgba(0, 0, 0, 0.6)"
            >
                <FlexContainer
                    $justifyContent="space-between"
                    $alignItems="center"
                    backgroundColorVariant="tertiary"
                    $borderBottom="1px solid rgba(255, 255, 255, 0.05)"
                    $padding="1.25rem 1.5rem"
                    $width="100%"
                >
                    <TitleH4>{ADD_TO_BOOKSHELF_TEXTS.MODAL_TITLE}</TitleH4>
                    <Button
                        variant="ghost"
                        $borderRadius="50%"
                        $width="2.5rem"
                        $height="2.5rem"
                        $padding="0"
                        onClick={onCloseModal}
                    >
                        <Icon className="fa-solid fa-xmark" size="lg" variant="muted" />
                    </Button>
                </FlexContainer>

                <FlexContainer
                    $flexDirection="column"
                    $gap="0.5rem"
                    $backgroundColor="transparent"
                    $overflowY="auto"
                    $padding="1rem"
                >
                    {bookshelves.map((option) => (
                        <BookshelfOptionsContainer
                            key={option.id}
                            isSelected={option.isSelected}
                            $isLoading={isLoading}
                            onClick={() => handleSelectBookshelf(option)}
                        >
                            <FlexContainer
                                $gap="1rem"
                                $alignItems="center"
                                $backgroundColor="transparent"
                            >
                                <IconWrapper shape="square" isActive={option.isSelected}>
                                    <Icon
                                        variant={option.isSelected ? 'primary' : 'muted'}
                                        className={getShelfIcon(option.name)}
                                        size="md"
                                    />
                                </IconWrapper>
                                <FlexContainer
                                    $flexDirection="column"
                                    $gap="0.2rem"
                                    $backgroundColor="transparent"
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

                <FlexContainer $padding="0.5rem 1rem 1.5rem" $backgroundColor="transparent">
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
