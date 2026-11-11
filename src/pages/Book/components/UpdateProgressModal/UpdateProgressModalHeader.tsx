import {Button, FlexContainer, Icon, Text, TitleH4} from '@components/index';
import {IUpdateProgressModalHeaderProps} from '@pages/Book/components/UpdateProgressModal/updateProgressModal.interfaces';
import {UPDATE_PROGRESS_TEXTS} from '@pages/Book/components/UpdateProgressModal/updateProgressModal.constants';

export const UpdateProgressModalHeader: React.FC<IUpdateProgressModalHeaderProps> = ({
    bookTitle,
    onCloseModal,
}) => (
    <FlexContainer
        $flexDirection="column"
        $gap="0.25rem"
        backgroundColorVariant="tertiary"
        $borderBottom="1px solid rgba(255, 255, 255, 0.05)"
        $padding="1.25rem 1.5rem"
        $width="100%"
    >
        <FlexContainer
            $justifyContent="space-between"
            $alignItems="center"
            $backgroundColor="transparent"
        >
            <TitleH4>{UPDATE_PROGRESS_TEXTS.MODAL_TITLE}</TitleH4>
            <Button
                variant="ghost"
                type="button"
                $borderRadius="50%"
                $width="2.5rem"
                $height="2.5rem"
                $padding="0"
                onClick={onCloseModal}
            >
                <Icon className="fa-solid fa-xmark" size="lg" variant="muted" />
            </Button>
        </FlexContainer>
        <Text
            variant="muted"
            size="xs"
            $whiteSpace="nowrap"
            $textOverflow="ellipsis"
            $overflow="hidden"
            $width="85%"
        >
            {bookTitle}
        </Text>
    </FlexContainer>
);
