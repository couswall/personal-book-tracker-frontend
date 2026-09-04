import {useUpdateProgress} from '@pages/Book/components/UpdateProgressModal/useUpdateProgress';
import {UpdateProgressModalHeader} from '@pages/Book/components/UpdateProgressModal/UpdateProgressModalHeader';
import {ProgressContextCard} from '@pages/Book/components/UpdateProgressModal/ProgressContextCard';
import {ProgressInputSection} from '@pages/Book/components/UpdateProgressModal/ProgressInputSection';
import {FinishedToggleRow} from '@pages/Book/components/UpdateProgressModal/FinishedToggleRow';
import {ModalAlert} from '@pages/Book/components/AddToBookshelfModal/index';
import {
    ButtonGhost,
    ButtonPrimary,
    FlexContainer,
    FormContainer,
    LoadingSpinner,
    Modal,
} from '@components/index';
import {IUpdateProgressModalProps} from '@pages/Book/components/UpdateProgressModal/updateProgressModal.interfaces';
import {UPDATE_PROGRESS_TEXTS} from '@pages/Book/components/UpdateProgressModal/updateProgressModal.constants';

export const UpdateProgressModal: React.FC<IUpdateProgressModalProps> = ({
    isOpen,
    onCloseModal,
    bookTitle,
    totalPages,
    bookshelfBookId,
    currentPage: initialCurrentPage,
    readingProgress: initialReadingProgress,
    token,
    onRefresh,
}) => {
    const {
        hasPageCount,
        inputMethod,
        switchInputMethod,
        currentPage,
        percentage,
        isLoading,
        alert,
        valueField,
        control,
        submit,
    } = useUpdateProgress({
        token,
        bookshelfBookId,
        totalPages,
        initialCurrentPage,
        initialReadingProgress,
        isOpen,
        onRefresh,
    });

    return (
        <Modal
            isOpen={isOpen}
            onCloseModal={onCloseModal}
            JustifyContent="center"
            AlignItems="center"
            Padding="1rem"
        >
            <FormContainer
                FlexDirection="column"
                BackgroundColorVariant="card"
                BorderRadius="0.75rem"
                Border="1px solid rgba(255, 255, 255, 0.05)"
                Width="100%"
                MaxWidth="440px"
                Overflow="hidden"
                BoxShadow="0 32px 64px -12px rgba(0, 0, 0, 0.6)"
                onSubmit={submit}
            >
                <UpdateProgressModalHeader bookTitle={bookTitle} onCloseModal={onCloseModal} />

                <FlexContainer
                    FlexDirection="column"
                    Gap="1.75rem"
                    Padding="1.5rem"
                    BackgroundColor="transparent"
                >
                    <ProgressContextCard
                        hasPageCount={hasPageCount}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        percentage={percentage}
                    />
                    <ProgressInputSection
                        hasPageCount={hasPageCount}
                        inputMethod={inputMethod}
                        onSwitchInputMethod={switchInputMethod}
                        totalPages={totalPages}
                        valueField={valueField}
                    />
                    <FinishedToggleRow control={control} />
                </FlexContainer>

                <FlexContainer
                    JustifyContent="flex-end"
                    Gap="0.75rem"
                    Padding="1rem 1.5rem 1.5rem"
                    BackgroundColorVariant="tertiary"
                >
                    <ButtonGhost type="button" onClick={onCloseModal} disabled={isLoading}>
                        {UPDATE_PROGRESS_TEXTS.CANCEL}
                    </ButtonGhost>
                    <ButtonPrimary type="submit" disabled={isLoading} Gap="0.5rem">
                        {isLoading && (
                            <FlexContainer
                                Width="100%"
                                BackgroundColor="transparent"
                                JustifyContent="center"
                            >
                                <LoadingSpinner Width="25px" Padding="5px" />
                            </FlexContainer>
                        )}

                        {isLoading
                            ? UPDATE_PROGRESS_TEXTS.SAVING
                            : UPDATE_PROGRESS_TEXTS.SAVE_PROGRESS}
                    </ButtonPrimary>
                </FlexContainer>
            </FormContainer>
            {alert.visible && <ModalAlert message={alert.message} variant={alert.variant} />}
        </Modal>
    );
};
