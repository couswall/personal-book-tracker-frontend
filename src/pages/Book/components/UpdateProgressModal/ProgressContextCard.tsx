import {BaseContainer, FlexContainer, Icon, IconWrapper, Text} from '@components/index';
import {IProgressContextCardProps} from '@pages/Book/components/UpdateProgressModal/updateProgressModal.interfaces';
import {UPDATE_PROGRESS_TEXTS} from '@pages/Book/components/UpdateProgressModal/updateProgressModal.constants';

export const ProgressContextCard: React.FC<IProgressContextCardProps> = ({
    hasPageCount,
    currentPage,
    totalPages,
    percentage,
}) => (
    <FlexContainer
        $justifyContent="space-between"
        $alignItems="center"
        $flexWrap="wrap"
        $gap="1rem"
        $padding="1rem"
        $borderRadius="0.75rem"
        backgroundColorVariant="tertiary"
    >
        <FlexContainer $alignItems="center" $gap="0.75rem" $backgroundColor="transparent">
            <IconWrapper>
                <Icon variant="primary" className="fa-solid fa-book-open" />
            </IconWrapper>
            <BaseContainer $backgroundColor="transparent">
                <Text size="xs" variant="muted" weight="bold" $textTransform="uppercase">
                    {UPDATE_PROGRESS_TEXTS.CURRENT_STATE}
                </Text>
                <Text size="sm" weight="medium">
                    {hasPageCount
                        ? UPDATE_PROGRESS_TEXTS.CURRENT_PAGE_PROGRESS(currentPage, totalPages)
                        : UPDATE_PROGRESS_TEXTS.PERCENTAGE_PROGRESS(percentage)}
                </Text>
            </BaseContainer>
        </FlexContainer>
        <Text size="lg" weight="bold" variant="primary">
            {percentage}%
        </Text>
    </FlexContainer>
);
