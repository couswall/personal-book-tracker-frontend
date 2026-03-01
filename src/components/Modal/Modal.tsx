import React from 'react';
import {ModalOverlay} from '@components/Modal/index';

export interface ModalProps {
    children: React.ReactNode;
    onCloseModal: () => void;
    isOpen: boolean;
}

export const Modal: React.FC<ModalProps> = ({children, onCloseModal, isOpen}) => {
    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onCloseModal();
        }
    };

    return (
        <ModalOverlay $isVisible={isOpen} onClick={handleOverlayClick}>
            {children}
        </ModalOverlay>
    );
};
