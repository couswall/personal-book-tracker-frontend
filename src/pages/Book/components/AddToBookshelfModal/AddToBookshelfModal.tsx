import {Button, FlexContainer, Icon, Modal, Text, TitleH4} from '@components/index';
import {
    BookshelfOptionItem,
    ModalAlert,
    RemoveConfirmationView,
    useBookshelfSelection,
    IAddToBookshelfModalProps,
    ADD_TO_BOOKSHELF_TEXTS,
} from '@pages/Book/components/AddToBookshelfModal/index';

export const AddToBookshelfModal: React.FC<IAddToBookshelfModalProps> = ({
    isOpen,
    onCloseModal,
    bookshelves,
    reads,
    bookTitle,
    bookAuthors,
    coverImageUrl,
    bookId,
    token,
    onRefresh,
}) => {
    const selection = useBookshelfSelection({
        bookshelves,
        reads,
        token,
        bookId,
        onRefresh,
        onCloseModal,
    });
    const {isLoading, alert, currentShelf} = selection;

    return (
        <Modal
            isOpen={isOpen}
            onCloseModal={selection.handleCloseModal}
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
                {selection.isConfirmingRemove && currentShelf ? (
                    <RemoveConfirmationView
                        shelfName={currentShelf.name}
                        bookTitle={bookTitle}
                        bookAuthors={bookAuthors}
                        coverImageUrl={coverImageUrl}
                        isCompleted={currentShelf.type === 'READ'}
                        warningLines={selection.removalWarning}
                        isLoading={isLoading}
                        onCancel={selection.cancelRemove}
                        onConfirm={selection.handleDeleteFromBookshelf}
                        onClose={selection.handleCloseModal}
                    />
                ) : (
                    <>
                        <FlexContainer
                            $justifyContent="space-between"
                            $alignItems="center"
                            backgroundColorVariant="tertiary"
                            $borderBottom="1px solid rgba(255, 255, 255, 0.05)"
                            $padding="1.25rem 1.5rem"
                            $width="100%"
                        >
                            <TitleH4>
                                {selection.isMoveMode
                                    ? ADD_TO_BOOKSHELF_TEXTS.MOVE_MODAL_TITLE
                                    : ADD_TO_BOOKSHELF_TEXTS.MODAL_TITLE}
                            </TitleH4>
                            <Button
                                variant="ghost"
                                $borderRadius="50%"
                                $width="2.5rem"
                                $height="2.5rem"
                                $padding="0"
                                onClick={selection.handleCloseModal}
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
                                <BookshelfOptionItem
                                    key={option.id}
                                    option={option}
                                    isTarget={selection.isTarget(option)}
                                    isLoading={isLoading}
                                    onSelect={selection.handleSelectBookshelf}
                                />
                            ))}
                        </FlexContainer>

                        <FlexContainer $padding="0.5rem 1rem 1.5rem" $backgroundColor="transparent">
                            {currentShelf && (
                                <Text
                                    variant={isLoading ? 'muted' : 'danger'}
                                    size="sm"
                                    $cursor={isLoading ? 'default' : 'pointer'}
                                    $width="100%"
                                    $textAlign="center"
                                    onClick={isLoading ? undefined : selection.handleRequestRemove}
                                >
                                    {ADD_TO_BOOKSHELF_TEXTS.REMOVE_FROM_BOOKSHELF}
                                </Text>
                            )}
                        </FlexContainer>
                    </>
                )}
            </FlexContainer>
            {alert.visible && <ModalAlert message={alert.message} variant={alert.variant} />}
        </Modal>
    );
};
