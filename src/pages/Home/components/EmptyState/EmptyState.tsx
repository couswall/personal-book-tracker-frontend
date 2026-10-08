import {Button, FlexContainer, Icon, Text, TitleH4} from '@components/index';
import * as S from '@pages/Home/components/EmptyState/emptyState.styled';
import {IEmptyStateProps} from '@pages/Home/components/EmptyState/emptyState.interfaces';

export const EmptyState: React.FC<IEmptyStateProps> = ({
    iconClassName,
    iconTone = 'primary',
    ringed = false,
    title,
    description,
    buttonLabel,
    buttonIconClassName,
    buttonVariant = 'primary',
    buttonFullWidth = false,
    onButtonClick,
}) => {
    const iconCircle = (
        <S.ToneIconWrapper
            $tone={iconTone}
            $width="4rem"
            $height="4rem"
            $marginBottom={ringed ? '0' : '1.25rem'}
        >
            <S.ToneIcon className={iconClassName} size="lg" $tone={iconTone} />
        </S.ToneIconWrapper>
    );

    return (
        <FlexContainer
            $flexDirection="column"
            $alignItems="center"
            $gap="0.5rem"
            $backgroundColor="transparent"
        >
            {ringed ? (
                <S.RingedIconWrapper $marginBottom="1.5rem">{iconCircle}</S.RingedIconWrapper>
            ) : (
                iconCircle
            )}
            <TitleH4 $textAlign="center">{title}</TitleH4>
            <Text variant="muted" size="sm" $textAlign="center">
                {description}
            </Text>
            <Button
                variant={buttonVariant}
                fullWidth={buttonFullWidth}
                $marginTop="1rem"
                onClick={onButtonClick}
                leftIcon={<Icon className={buttonIconClassName} $fontColor="inherit" size="sm" />}
            >
                {buttonLabel}
            </Button>
        </FlexContainer>
    );
};
