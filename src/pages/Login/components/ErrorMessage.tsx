import {Icon, FlexContainer, Text} from '@components/index';
import {IErrorMessageProps} from '@pages/Login/components/login.components.interfaces';

export const ErrorMessage = ({message = ''}: IErrorMessageProps) => {
    return (
        <FlexContainer Gap="0.5rem" AlignItems="center" BackgroundColor="inherit">
            <Icon variant="error" className="fa-solid fa-x" $fontSize="0.625rem" />
            <Text size="xs" variant="danger">
                {message}
            </Text>
        </FlexContainer>
    );
};
