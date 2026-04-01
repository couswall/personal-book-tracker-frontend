import React, {useEffect} from 'react';
import {ModalOverlay} from '@components/Modal/index';
import {IFlexContainerProps} from '@components/index';

export interface ModalProps extends IFlexContainerProps {
    children: React.ReactNode;
    onCloseModal: () => void;
    isOpen: boolean;
}

export const Modal: React.FC<ModalProps> = ({children, onCloseModal, isOpen, ...props}) => {
    useEffect(() => {
        if (isOpen) {
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = `${scrollbarWidth}px`;
        } else {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        }
        return () => {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        };
    }, [isOpen]);

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
