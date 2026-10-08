import {Button, FlexContainer, Icon, IconWrapper, Text, TitleH5} from '@components/index';
import {BookContextCard} from '@pages/Book/components/AddToBookshelfModal/BookContextCard';
import {WarningCallout} from '@pages/Book/components/AddToBookshelfModal/WarningCallout';
import {CancelButton} from '@pages/Book/components/AddToBookshelfModal/bookshelfConfirmations.styled';
import {IRemoveConfirmationViewProps} from '@pages/Book/components/AddToBookshelfModal/addToBookshelfModal.interfaces';
import {REMOVE_CONFIRMATION_TEXTS} from '@pages/Book/components/AddToBookshelfModal/addToBookshelfModal.constants';

export const RemoveConfirmationView: React.FC<IRemoveConfirmationViewProps> = ({
    shelfName,
    bookTitle,
    bookAuthors,
    coverImageUrl,
    isCompleted,
    warningLines,
    isLoading,
    onCancel,
    onConfirm,
    onClose,
}) => (
    <>
        <FlexContainer
            $justifyContent="space-between"
            $alignItems="center"
            backgroundColorVariant="tertiary"
            $borderBottom="1px solid rgba(255, 255, 255, 0.05)"
            $padding="1.25rem 1.5rem"
            $width="100%"
        >
            <FlexContainer $gap="0.75rem" $alignItems="center" $backgroundColor="transparent">
                <IconWrapper shape="square" $width="2.25rem" $height="2.25rem">
                    <Icon className="fa-solid fa-trash-can" variant="primary" size="md" />
                </IconWrapper>
                <FlexContainer $flexDirection="column" $backgroundColor="transparent">
                    <TitleH5 $lineHeight="1.25">{REMOVE_CONFIRMATION_TEXTS.TITLE}</TitleH5>
                    <Text size="xs" variant="muted" weight="medium">
                        {REMOVE_CONFIRMATION_TEXTS.SHELF_LABEL}{' '}
                        <Text as="span" size="xs" variant="primary" weight="semibold">
                            {shelfName}
                        </Text>
                    </Text>
                </FlexContainer>
            </FlexContainer>
            <Button
                variant="ghost"
                $borderRadius="50%"
                $width="2.5rem"
                $height="2.5rem"
                $padding="0"
                aria-label={REMOVE_CONFIRMATION_TEXTS.CLOSE}
                disabled={isLoading}
                onClick={onClose}
            >
                <Icon className="fa-solid fa-xmark" size="lg" variant="muted" />
            </Button>
        </FlexContainer>

        <FlexContainer
            $flexDirection="column"
            $gap="1.25rem"
            $padding="1.5rem"
            $backgroundColor="transparent"
        >
            <BookContextCard
                title={bookTitle}
                authors={bookAuthors}
                coverImageUrl={coverImageUrl}
                badgeLabel={isCompleted ? REMOVE_CONFIRMATION_TEXTS.COMPLETED_BADGE : undefined}
            />
            {warningLines && <WarningCallout lines={warningLines} />}
        </FlexContainer>

        <FlexContainer $gap="0.75rem" $padding="0 1.5rem 1.5rem" $backgroundColor="transparent">
            <CancelButton
                type="button"
                variant="ghost"
                $flex="1"
                disabled={isLoading}
                onClick={onCancel}
            >
                {REMOVE_CONFIRMATION_TEXTS.CANCEL}
            </CancelButton>
            <Button
                type="button"
                variant="primary"
                $flex="1"
                $fontWeight="700"
                $fontSize="0.875rem"
                loading={isLoading}
                leftIcon={<Icon className="fa-solid fa-trash" $fontColor="inherit" />}
                onClick={onConfirm}
            >
                {REMOVE_CONFIRMATION_TEXTS.CONFIRM}
            </Button>
        </FlexContainer>
    </>
);
