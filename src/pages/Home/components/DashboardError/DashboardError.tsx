import {Button, FlexContainer, Icon, Text, TitleH4} from '@components/index';
import {HOME_TEXTS} from '@pages/Home/home.constants';

export const DashboardError: React.FC<{onRetry: () => void}> = ({onRetry}) => (
    <FlexContainer
        role="alert"
        $flexDirection="column"
        $alignItems="center"
        $justifyContent="center"
        $gap="0.75rem"
        $minHeight="95vh"
        $padding="2rem"
        $backgroundColor="transparent"
    >
        <Icon variant="primary" className="fa-solid fa-triangle-exclamation" size="lg" />
        <TitleH4 $textAlign="center">{HOME_TEXTS.ERROR_TITLE}</TitleH4>
        <Text variant="muted" size="sm" $textAlign="center">
            {HOME_TEXTS.ERROR_DESCRIPTION}
        </Text>
        <Button
            variant="primary"
            $marginTop="0.5rem"
            onClick={onRetry}
            leftIcon={<Icon className="fa-solid fa-rotate-right" $fontColor="inherit" size="sm" />}
        >
            {HOME_TEXTS.RETRY}
        </Button>
    </FlexContainer>
);
