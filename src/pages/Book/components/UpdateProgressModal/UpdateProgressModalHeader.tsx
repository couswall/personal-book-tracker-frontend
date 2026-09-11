import {Button, FlexContainer, Icon, Text, TitleH4} from '@components/index';
import {IUpdateProgressModalHeaderProps} from '@pages/Book/components/UpdateProgressModal/updateProgressModal.interfaces';
import {UPDATE_PROGRESS_TEXTS} from '@pages/Book/components/UpdateProgressModal/updateProgressModal.constants';

export const UpdateProgressModalHeader: React.FC<IUpdateProgressModalHeaderProps> = ({
    bookTitle,
    onCloseModal,
}) => (
    <FlexContainer
        FlexDirection="column"
        Gap="0.25rem"
        BackgroundColorVariant="tertiary"
        BorderBottom="1px solid rgba(255, 255, 255, 0.05)"
        Padding="1.25rem 1.5rem"
        Width="100%"
    >
        <FlexContainer
            JustifyContent="space-between"
            AlignItems="center"
            BackgroundColor="transparent"
        >
            <TitleH4>{UPDATE_PROGRESS_TEXTS.MODAL_TITLE}</TitleH4>
            <Button
                variant="ghost"
                type="button"
                BorderRadius="50%"
                Width="2.5rem"
                Height="2.5rem"
                Padding="0"
                onClick={onCloseModal}
            >
                <Icon className="fa-solid fa-xmark" size="lg" variant="muted" />
            </Button>
        </FlexContainer>
        <Text
            variant="muted"
            size="xs"
            WhiteSpace="nowrap"
            TextOverflow="ellipsis"
            Overflow="hidden"
            Width="85%"
        >
            {bookTitle}
        </Text>
    </FlexContainer>
);
