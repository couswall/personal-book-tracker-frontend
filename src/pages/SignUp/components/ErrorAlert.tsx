import {FlexContainer, Icon, Paragraph} from '@components/index';
import {IErrorAlertProps} from '@pages/SignUp/components/signUp.components.interfaces';

export const ErrorAlert: React.FC<IErrorAlertProps> = ({errorMessage}) => {
    return (
        <FlexContainer
            $gap="0.25rem"
            $backgroundColor="#FEA08B"
            $marginTop="0.5rem"
            $borderRadius="0.5rem"
            $border="0.5px solid #AD2103"
            $padding="0.25rem"
            $alignItems="center"
        >
            <Icon
                className="fa-regular fa-circle-xmark"
                $fontColor="#AD2103"
                $fontSize="0.875rem"
            />
            <Paragraph $textAlign="center" $fontColor="#AD2103" $fontSize="0.875rem">
                {errorMessage}
            </Paragraph>
        </FlexContainer>
    );
};
