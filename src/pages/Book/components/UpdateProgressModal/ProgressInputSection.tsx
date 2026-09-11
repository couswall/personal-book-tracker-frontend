import {BaseContainer, Button, FlexContainer, Text} from '@components/index';
import * as S from '@pages/Book/components/UpdateProgressModal/updateProgressModal.styled';
import {IProgressInputSectionProps} from '@pages/Book/components/UpdateProgressModal/updateProgressModal.interfaces';
import {
    PROGRESS_INPUT_METHODS,
    UPDATE_PROGRESS_TEXTS,
} from '@pages/Book/components/UpdateProgressModal/updateProgressModal.constants';
import {
    handleProgressInputKeyDown,
    handleProgressInputPaste,
} from '@pages/Book/components/UpdateProgressModal/updateProgressModal.utils';

export const ProgressInputSection: React.FC<IProgressInputSectionProps> = ({
    hasPageCount,
    inputMethod,
    onSwitchInputMethod,
    totalPages,
    valueField,
}) => (
    <>
        {hasPageCount && (
            <BaseContainer BackgroundColor="transparent">
                <Text
                    size="xs"
                    variant="muted"
                    weight="bold"
                    TextTransform="uppercase"
                    MarginBottom="0.5rem"
                >
                    {UPDATE_PROGRESS_TEXTS.INPUT_METHOD_LABEL}
                </Text>
                <FlexContainer
                    Gap="0.25rem"
                    Padding="0.25rem"
                    BorderRadius="20px"
                    BackgroundColorVariant="tertiary"
                >
                    <Button
                        type="button"
                        variant={inputMethod === PROGRESS_INPUT_METHODS.PAGE ? 'primary' : 'ghost'}
                        size="sm"
                        $borderRadius="20px"
                        $flex="1"
                        onClick={() => onSwitchInputMethod(PROGRESS_INPUT_METHODS.PAGE)}
                    >
                        {UPDATE_PROGRESS_TEXTS.PAGES_LABEL}
                    </Button>
                    <Button
                        type="button"
                        variant={
                            inputMethod === PROGRESS_INPUT_METHODS.PERCENTAGE ? 'primary' : 'ghost'
                        }
                        size="sm"
                        $borderRadius="20px"
                        $flex="1"
                        onClick={() => onSwitchInputMethod(PROGRESS_INPUT_METHODS.PERCENTAGE)}
                    >
                        {UPDATE_PROGRESS_TEXTS.PERCENTAGE_LABEL}
                    </Button>
                </FlexContainer>
            </BaseContainer>
        )}

        <BaseContainer BackgroundColor="transparent">
            <Text
                size="xs"
                variant="muted"
                weight="bold"
                TextTransform="uppercase"
                MarginBottom="0.5rem"
            >
                {inputMethod === PROGRESS_INPUT_METHODS.PAGE
                    ? UPDATE_PROGRESS_TEXTS.PAGES_READ_LABEL
                    : UPDATE_PROGRESS_TEXTS.PERCENTAGE_COMPLETED_LABEL}
            </Text>
            <BaseContainer Position="relative" BackgroundColor="transparent">
                <S.ProgressInput
                    type="number"
                    min={0}
                    max={inputMethod === PROGRESS_INPUT_METHODS.PAGE ? totalPages : 100}
                    Width="100%"
                    {...valueField}
                    onKeyDown={handleProgressInputKeyDown}
                    onPaste={handleProgressInputPaste}
                />
                <S.InputSuffix variant="muted" weight="bold" size="lg">
                    {inputMethod === PROGRESS_INPUT_METHODS.PAGE ? `/ ${totalPages}` : '%'}
                </S.InputSuffix>
            </BaseContainer>
        </BaseContainer>
    </>
);
