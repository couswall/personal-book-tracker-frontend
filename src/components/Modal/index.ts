import styled from 'styled-components';
import {FlexContainer} from '@components/FlexContainer/index';

export const ModalOverlay = styled(FlexContainer)<{$isVisible: boolean}>`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 5;

    background-color: ${(props) => (props.$isVisible ? 'rgb(0 0 0 / 0.6)' : 'rgb(0 0 0 / 0)')};
    backdrop-filter: ${(props) => (props.$isVisible ? 'blur(2px)' : 'blur(0px)')};
    visibility: ${(props) => (props.$isVisible ? 'visible' : 'hidden')};
    pointer-events: ${(props) => (props.$isVisible ? 'auto' : 'none')};

    transition: background-color 0.3s ease-out,
                backdrop-filter 0.3s ease-out,
                visibility 0s ${(props) => (props.$isVisible ? '0s' : '0.3s')};
`;
