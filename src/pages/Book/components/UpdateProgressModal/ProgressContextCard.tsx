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
        JustifyContent="space-between"
        AlignItems="center"
        FlexWrap="wrap"
        Gap="1rem"
        Padding="1rem"
        BorderRadius="0.75rem"
        BackgroundColorVariant="tertiary"
    >
        <FlexContainer AlignItems="center" Gap="0.75rem" BackgroundColor="transparent">
            <IconWrapper>
                <Icon variant="primary" className="fa-solid fa-book-open" />
            </IconWrapper>
            <BaseContainer BackgroundColor="transparent">
                <Text size="xs" variant="muted" weight="bold" TextTransform="uppercase">
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
