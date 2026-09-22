import styled from 'styled-components';
import {FlexContainer} from '@components/Layout/FlexContainer/index';

export const ModalOverlay = styled(FlexContainer)`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 5;

    background-color: ${(props) => `${props.theme.colors.background}CC`};
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
`;
