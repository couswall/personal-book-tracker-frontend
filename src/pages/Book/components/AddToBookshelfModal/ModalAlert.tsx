import {Icon, Text} from '@components/index';
import {AlertContainer} from '@pages/Book/components/AddToBookshelfModal/addToBookshelfModal.styled';
import {IModalAlertProps} from '@pages/Book/components/AddToBookshelfModal/addToBookshelfModal.interfaces';

export const ModalAlert: React.FC<IModalAlertProps> = ({message, variant}) => {
    const isSuccess = variant === 'success';
    return (
        <AlertContainer
            $gap="1rem"
            $alignItems="center"
            $position="absolute"
            $bottom="100px"
            $padding="1rem"
            $borderRadius="1.25rem"
            backgroundColorVariant="card"
            $border="1px solid"
        >
            <Icon
                variant={isSuccess ? 'success' : 'danger'}
                className={isSuccess ? 'fa-solid fa-check' : 'fa-solid fa-circle-exclamation'}
            />
            <Text variant={isSuccess ? 'success' : 'danger'}>{message}</Text>
        </AlertContainer>
    );
};
