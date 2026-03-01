import {ErrorIcon, FlexContainer, Text} from '@components/index';

export const ErrorMessage = ({message = ''}) => {
    return (
        <FlexContainer Gap="0.5rem" AlignItems="center" BackgroundColor="inherit">
            <ErrorIcon className="fa-solid fa-x" FontSize="0.625rem" />
            <Text size="xs" variant="danger">
                {message}
            </Text>
        </FlexContainer>
    );
};
