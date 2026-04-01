import {Icon, Text} from '@components/index';
import {AlertContainer} from '@pages/Book/components/AddToBookshelfModal/addToBookshelfModal.styled';
import {IModalAlertProps} from '@pages/Book/components/AddToBookshelfModal/addToBookshelfModal.interfaces';

export const ModalAlert: React.FC<IModalAlertProps> = ({message, variant}) => {
    const isSuccess = variant === 'success';
    return (
        <AlertContainer
            Gap="1rem"
            AlignItems="center"
            Position="absolute"
            Bottom="100px"
            Padding="1rem"
            BorderRadius="1.25rem"
            BackgroundColorVariant="card"
            Border="1px solid"
        >
            <Icon
                variant={isSuccess ? 'success' : 'danger'}
                className={isSuccess ? 'fa-solid fa-check' : 'fa-solid fa-circle-exclamation'}
            />
            <Text variant={isSuccess ? 'success' : 'danger'}>{message}</Text>
        </AlertContainer>
    );
};
