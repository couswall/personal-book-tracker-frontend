import {BaseContainer, FlexContainer, Icon, Text} from '@components/index';
import * as S from '@pages/Book/components/BookActivity/bookActivity.styled';

interface IBookActivityProps {
    onOpenAddToBookshelfModal: () => void;
    onUpdateProgress?: () => void;
    bookshelfLabel?: string;
    progressPercentage?: number;
}

export const BookActivity: React.FC<IBookActivityProps> = ({
    onOpenAddToBookshelfModal,
    onUpdateProgress,
    bookshelfLabel,
    progressPercentage,
}) => {
    const isCurrentlyReading = bookshelfLabel?.toLowerCase() === 'currently reading';
    const progressLabel =
        typeof progressPercentage === 'number'
            ? `You are ${progressPercentage}% done`
            : 'Track your reading progress';

    return (
        <S.ActivityCard
            FlexDirection="column"
            BorderRadius="1rem"
            Padding="1.5rem"
            Border="1px solid"
            Gap="1rem"
            MarginBottom="2rem"
        >
            <Text variant="muted" weight="bold" size="xs" TextTransform="uppercase">
                Your Activity
            </Text>
            <FlexContainer
                FlexWrap="wrap"
                Gap="2rem"
                AlignItems="center"
                BackgroundColor="transparent"
            >
                <FlexContainer AlignItems="center" Gap="1rem" BackgroundColor="inherit">
                    <S.IconCircleActivity>
                        <i className="fa-solid fa-book"></i>
                    </S.IconCircleActivity>
                    <BaseContainer BackgroundColor="inherit">
                        <Text size="xs" variant="muted" weight="medium">
                            Bookshelf
                        </Text>
                        <FlexContainer AlignItems="center" Gap="0.75rem" BackgroundColor="inherit">
                            <Text size="sm" weight="bold">
                                {bookshelfLabel}
                            </Text>
                            <S.TextLink onClick={onOpenAddToBookshelfModal}>
                                Move to another shelf
                            </S.TextLink>
                        </FlexContainer>
                    </BaseContainer>
                </FlexContainer>

                {isCurrentlyReading && (
                    <>
                        <S.Divider />
                        <FlexContainer AlignItems="center" Gap="1rem" BackgroundColor="transparent">
                            <S.IconCircleActivity>
                                <i className="fa-solid fa-bookmark"></i>
                            </S.IconCircleActivity>
                            <BaseContainer BackgroundColor="inherit">
                                <Text size="xs" variant="muted" weight="medium">
                                    {progressLabel}
                                </Text>
                                <S.TextLink onClick={onUpdateProgress}>Update progress</S.TextLink>
                            </BaseContainer>
                        </FlexContainer>
                    </>
                )}

                <S.Divider />

                <FlexContainer AlignItems="center" Gap="1rem" BackgroundColor="transparent">
                    <S.IconCircleActivity>
                        <i className="fa-solid fa-star"></i>
                    </S.IconCircleActivity>
                    <BaseContainer BackgroundColor="inherit">
                        <Text size="xs" variant="muted" weight="medium">
                            Your Rating
                        </Text>
                        <FlexContainer AlignItems="center" Gap="0.75rem" BackgroundColor="inherit">
                            <S.StarRating>
                                {[...Array(5)].map((_, i) => (
                                    <Icon key={i} className="fa-solid fa-star" />
                                ))}
                            </S.StarRating>
                            <S.TextLink>Edit rating</S.TextLink>
                        </FlexContainer>
                    </BaseContainer>
                </FlexContainer>
            </FlexContainer>
        </S.ActivityCard>
    );
};
