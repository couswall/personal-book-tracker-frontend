import {BaseContainer, Button, FlexContainer, Text, TitleH2, TitleH4} from '@components/index';
import * as S from '@pages/Home/components/ReadingChallenge/readingChallenge.styled';
import {
    RING_CIRCUMFERENCE,
    getRingOffset,
} from '@pages/Home/components/ReadingChallenge/readingChallenge.utils';
import {EmptyState} from '@pages/Home/components/EmptyState/EmptyState';
import {IReadingChallenge} from '@pages/Home/home.interfaces';
import {HOME_TEXTS} from '@pages/Home/home.constants';

interface IReadingChallengeProps {
    challenge: IReadingChallenge;
}

export const ReadingChallenge: React.FC<IReadingChallengeProps> = ({challenge}) => (
    <FlexContainer
        $flexDirection="column"
        $border="1px solid"
        backgroundColorVariant="secondary"
        $borderRadius="0.75rem"
        $padding="1.5rem"
        $gap="1.5rem"
        hBorderColorVariant="primary"
        hBoxShadowVariant="glow"
    >
        <BaseContainer
            $borderBottom="1px solid"
            $padding="0 0 1rem 0"
            $backgroundColor="transparent"
        >
            <TitleH4>{HOME_TEXTS.CHALLENGE_TITLE(challenge.year)}</TitleH4>
        </BaseContainer>
        {challenge.booksGoal === 0 ? (
            <EmptyState
                ringed
                iconTone="secondary"
                iconClassName="fa-solid fa-trophy"
                title={HOME_TEXTS.CHALLENGE_EMPTY_TITLE}
                description={HOME_TEXTS.CHALLENGE_EMPTY_DESCRIPTION}
                buttonLabel={HOME_TEXTS.CHALLENGE_EMPTY_BUTTON}
                buttonIconClassName="fa-solid fa-list-check"
                buttonFullWidth
            />
        ) : (
            <>
                <FlexContainer $justifyContent="center" $backgroundColor="transparent">
                    <S.RingWrapper>
                        <S.RingSvg viewBox="0 0 100 100">
                            <S.RingTrack cx="50" cy="50" r="40" />
                            <S.RingFill
                                cx="50"
                                cy="50"
                                r="40"
                                strokeDasharray={RING_CIRCUMFERENCE}
                                strokeDashoffset={getRingOffset(
                                    challenge.booksRead,
                                    challenge.booksGoal
                                )}
                            />
                        </S.RingSvg>
                        <FlexContainer
                            $position="absolute"
                            $top="0"
                            $right="0"
                            $bottom="0"
                            $left="0"
                            $flexDirection="column"
                            $alignItems="center"
                            $justifyContent="center"
                            $backgroundColor="transparent"
                        >
                            <TitleH2 $margin="0">{challenge.booksRead}</TitleH2>
                            <Text
                                size="xs"
                                variant="muted"
                                weight="bold"
                                $textTransform="uppercase"
                            >
                                {HOME_TEXTS.BOOKS_GOAL_LABEL(challenge.booksGoal)}
                            </Text>
                        </FlexContainer>
                    </S.RingWrapper>
                </FlexContainer>
                <Text weight="semibold" variant="secondary" $textAlign="center">
                    {challenge.message}
                </Text>
                <Button variant="outline" fullWidth>
                    {HOME_TEXTS.VIEW_CHALLENGE_DETAILS}
                </Button>
            </>
        )}
    </FlexContainer>
);
