import {
    ButtonGhost,
    ButtonPrimary,
    FlexContainer,
    LightIcon,
    Modal,
    Text,
    TitleH3,
} from '@components/index';
import {BookshelfOptionsContainer} from './AddToBookshelfModal.styled';

const bookshelfOptions = [
    {
        id: 1,
        name: 'Currently Reading',
        icon: 'fa-solid fa-book-open',
        isSelected: true,
        bookCount: 1,
        isCustom: false,
    },
    {
        id: 2,
        name: 'Want to Read',
        icon: 'fa-solid fa-book',
        isSelected: false,
        bookCount: 1,
        isCustom: false,
    },
    {
        id: 3,
        name: 'Read',
        icon: 'fa-solid fa-book-bookmark',
        isSelected: false,
        bookCount: 1,
        isCustom: false,
    },
    {
        id: 4,
        name: 'Custom Bookshelf',
        icon: 'fa-solid fa-book-bookmark',
        isSelected: false,
        bookCount: 1,
        isCustom: true,
    },
];

export interface IAddToBookshelfModalProps {
    isOpen: boolean;
    onCloseModal: () => void;
}

export const AddToBookshelfModal: React.FC<IAddToBookshelfModalProps> = ({
    isOpen,
    onCloseModal,
}) => {
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
                        <LightIcon className="fa-solid fa-xmark" size="lg" />
                    </ButtonGhost>
                </FlexContainer>
                <FlexContainer
                    FlexDirection="column"
                    Gap="0.5rem"
                    BackgroundColor="inherit"
                    MaxHeight="300px"
                    OverflowY="auto"
                    Overflow="hidden"
                >
                    {bookshelfOptions.map((option) => (
                        <BookshelfOptionsContainer key={option.id} isSelected={option.isSelected}>
                            <FlexContainer
                                Gap="1.25rem"
                                AlignItems="center"
                                BackgroundColor="transparent"
                            >
                                <LightIcon className={option.icon} size="lg" />
                                <FlexContainer
                                    FlexDirection="column"
                                    Gap="0.25rem"
                                    BackgroundColor="transparent"
                                >
                                    <Text size="lg">{option.name}</Text>
                                    <Text variant="muted" size="xs">
                                        {option.bookCount}{' '}
                                        {option.bookCount === 1 ? 'BOOK' : 'BOOKS'}
                                    </Text>
                                </FlexContainer>
                            </FlexContainer>
                            {option.isSelected && (
                                <LightIcon className="fa-solid fa-check" size="lg" />
                            )}
                        </BookshelfOptionsContainer>
                    ))}
                </FlexContainer>
                <ButtonPrimary>Create a new bookshelf</ButtonPrimary>
                <Text variant="danger" size="xs" Cursor="pointer" Width="100%" TextAlign="center">
                    Remove from Bookshelf
                </Text>
            </FlexContainer>
        </Modal>
    );
};
