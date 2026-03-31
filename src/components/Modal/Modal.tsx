import React from 'react';
import {ModalOverlay} from '@components/Modal/index';
import {IFlexContainerProps} from '@components/index';

export interface ModalProps extends IFlexContainerProps {
    children: React.ReactNode;
    onCloseModal: () => void;
    isOpen: boolean;
}

export const Modal: React.FC<ModalProps> = ({children, onCloseModal, isOpen, ...props}) => {
    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onCloseModal();
        }
    };

    return (
        <ModalOverlay $isVisible={isOpen} onClick={handleOverlayClick} {...props}>
            {children}
        </ModalOverlay>
    );
};
