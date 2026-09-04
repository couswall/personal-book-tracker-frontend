import {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {updateReadingProgress} from '@pages/Book/components/UpdateProgressModal/updateProgressModal.api';
import {
    IConfirmedProgress,
    IUpdateProgressFormValues,
    IUseUpdateProgressParams,
    ProgressInputMethod,
} from '@pages/Book/components/UpdateProgressModal/updateProgressModal.interfaces';
import {useModalAlert} from '@pages/Book/hooks/useModalAlert';
import {GENERAL_ERROR_MSGS} from '@constants/errorMessages';
import {
    PROGRESS_INPUT_METHODS,
    UPDATE_PROGRESS_TEXTS,
} from '@pages/Book/components/UpdateProgressModal/updateProgressModal.constants';

export const useUpdateProgress = ({
    token,
    bookshelfBookId,
    totalPages,
    initialCurrentPage,
    initialReadingProgress,
    isOpen,
    onRefresh,
}: IUseUpdateProgressParams) => {
    const hasPageCount = totalPages > 0;
    const [inputMethod, setInputMethod] = useState<ProgressInputMethod>(
        hasPageCount ? PROGRESS_INPUT_METHODS.PAGE : PROGRESS_INPUT_METHODS.PERCENTAGE
    );
    const [progress, setProgress] = useState<IConfirmedProgress>({
        currentPage: initialCurrentPage ?? 0,
        readingProgress: initialReadingProgress ?? 0,
    });
    const [isLoading, setIsLoading] = useState(false);
    const {alert, showAlert} = useModalAlert();

    const {register, control, setValue, reset, handleSubmit} = useForm<IUpdateProgressFormValues>({
        defaultValues: {
            value: hasPageCount ? (initialCurrentPage ?? 0) : (initialReadingProgress ?? 0),
            isFinished: (initialReadingProgress ?? 0) >= 100,
        },
    });

    useEffect(() => {
        if (!isOpen) return;
        const method = hasPageCount
            ? PROGRESS_INPUT_METHODS.PAGE
            : PROGRESS_INPUT_METHODS.PERCENTAGE;
        const confirmedProgress = {
            currentPage: initialCurrentPage ?? 0,
            readingProgress: initialReadingProgress ?? 0,
        };
        setInputMethod(method);
        setProgress(confirmedProgress);
        reset({
            value:
                method === PROGRESS_INPUT_METHODS.PAGE
                    ? confirmedProgress.currentPage
                    : confirmedProgress.readingProgress,
            isFinished: confirmedProgress.readingProgress >= 100,
        });
    }, [isOpen, initialCurrentPage, initialReadingProgress, hasPageCount, reset]);

    const switchInputMethod = (method: ProgressInputMethod) => {
        if (method === inputMethod) return;
        setInputMethod(method);
        const progressValue =
            method === PROGRESS_INPUT_METHODS.PAGE
                ? progress.currentPage
                : progress.readingProgress;
        setValue('value', progressValue);
    };

    const valueField = register('value', {valueAsNumber: true});

    const submit = handleSubmit(async (data) => {
        if (!token || !bookshelfBookId) return;
        try {
            setIsLoading(true);
            const bookshelfBook = await updateReadingProgress({
                token,
                bookshelfBookId,
                progressType: inputMethod,
                value: Number.isNaN(data.value) ? 0 : data.value,
                isFinished: data.isFinished,
                onSuccess: onRefresh,
            });
            setProgress({
                currentPage: bookshelfBook.currentPage ?? 0,
                readingProgress: bookshelfBook.readingProgress,
            });
            // TODO: implement logic for finishing the book and reviewing it
            showAlert(UPDATE_PROGRESS_TEXTS.PROGRESS_UPDATED, 'success');
        } catch (error) {
            const message =
                error instanceof Error ? error.message : GENERAL_ERROR_MSGS.SOMETHING_WENT_WRONG;
            showAlert(message, 'danger');
        } finally {
            setIsLoading(false);
        }
    });

    return {
        hasPageCount,
        inputMethod,
        switchInputMethod,
        currentPage: progress.currentPage,
        percentage: progress.readingProgress,
        isLoading,
        alert,
        valueField,
        control,
        submit,
    };
};
