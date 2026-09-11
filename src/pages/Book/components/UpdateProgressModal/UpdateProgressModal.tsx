import {useUpdateProgress} from '@pages/Book/components/UpdateProgressModal/useUpdateProgress';
import {UpdateProgressModalHeader} from '@pages/Book/components/UpdateProgressModal/UpdateProgressModalHeader';
import {ProgressContextCard} from '@pages/Book/components/UpdateProgressModal/ProgressContextCard';
import {ProgressInputSection} from '@pages/Book/components/UpdateProgressModal/ProgressInputSection';
import {FinishedToggleRow} from '@pages/Book/components/UpdateProgressModal/FinishedToggleRow';
import {ModalAlert} from '@pages/Book/components/AddToBookshelfModal/index';
import {Button, FlexContainer, FormContainer, Modal} from '@components/index';
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
            $justifyContent="center"
            $alignItems="center"
            $padding="1rem"
        >
            <FormContainer
                $flexDirection="column"
                backgroundColorVariant="card"
                $borderRadius="0.75rem"
                $border="1px solid rgba(255, 255, 255, 0.05)"
                $width="100%"
                $maxWidth="440px"
                $overflow="hidden"
                $boxShadow="0 32px 64px -12px rgba(0, 0, 0, 0.6)"
                onSubmit={submit}
            >
                <UpdateProgressModalHeader bookTitle={bookTitle} onCloseModal={onCloseModal} />

                <FlexContainer
                    $flexDirection="column"
                    $gap="1.75rem"
                    $padding="1.5rem"
                    $backgroundColor="transparent"
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
                    $justifyContent="flex-end"
                    $gap="0.75rem"
                    $padding="1rem 1.5rem 1.5rem"
                    backgroundColorVariant="tertiary"
                >
                    <Button
                        variant="ghost"
                        type="button"
                        onClick={onCloseModal}
                        disabled={isLoading}
                    >
                        {UPDATE_PROGRESS_TEXTS.CANCEL}
                    </Button>
                    <Button
                        variant="primary"
                        type="submit"
                        loading={isLoading}
                        loadingText={UPDATE_PROGRESS_TEXTS.SAVING}
                    >
                        {UPDATE_PROGRESS_TEXTS.SAVE_PROGRESS}
                    </Button>
                </FlexContainer>
            </FormContainer>
            {alert.visible && <ModalAlert message={alert.message} variant={alert.variant} />}
        </Modal>
    );
};
