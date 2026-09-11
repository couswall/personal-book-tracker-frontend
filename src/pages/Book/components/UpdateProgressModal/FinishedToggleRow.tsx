import {Controller} from 'react-hook-form';
import {FlexContainer, Icon, Text, ToggleSwitch} from '@components/index';
import {IFinishedToggleRowProps} from '@pages/Book/components/UpdateProgressModal/updateProgressModal.interfaces';
import {UPDATE_PROGRESS_TEXTS} from '@pages/Book/components/UpdateProgressModal/updateProgressModal.constants';

export const FinishedToggleRow: React.FC<IFinishedToggleRowProps> = ({control}) => (
    <FlexContainer
        as="label"
        $justifyContent="space-between"
        $alignItems="center"
        $padding="1rem"
        $borderRadius="0.75rem"
        $border="1px solid rgba(255, 255, 255, 0.05)"
        hBackgroundColorVariant="muted"
        $cursor="pointer"
    >
        <FlexContainer $alignItems="center" $gap="0.75rem" $backgroundColor="transparent">
            <Icon className="fa-solid fa-flag-checkered" variant="primary" size="lg" />
            <Text size="sm" weight="medium">
                {UPDATE_PROGRESS_TEXTS.FINISHED_BOOK}
            </Text>
        </FlexContainer>
        <Controller
            name="isFinished"
            control={control}
            render={({field: {value, onChange, name, ref}}) => (
                <ToggleSwitch checked={value} onChange={onChange} name={name} ref={ref} />
            )}
        />
    </FlexContainer>
);
