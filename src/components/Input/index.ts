import styled from 'styled-components';
import {FlexContainer} from '@components/Layout/FlexContainer/index';

interface IInputProps {
    error?: string | boolean;
    lightColor?: boolean;
    $fontSize?: string;
    $fontColor?: string;
    $fontFamily?: string;
    $backgroundColor?: string;
    $width?: string;
    $height?: string;
    $padding?: string;
    $margin?: string;
    $maxWidth?: string;
    $border?: string;
    $borderRadius?: string;
    $outline?: string;
    $mediumWidth?: string;
    $smallWidth?: string;
    $xSmallWidth?: string;
    $phColor?: string;
}

export const Input = styled.input<IInputProps>`
    font-size: ${(props) => props.$fontSize || '1rem'};
    color: ${(props) => props.$fontColor || props.theme.colors.text.theme};
    font-family: ${(props) => props.$fontFamily || props.theme.fonts.lexend};
    width: ${(props) => props.$width || 'auto'};
    height: ${(props) => props.$height || 'auto'};
    background-color: ${(props) =>
        props.$backgroundColor || props.theme.colors.input.inputBackground};
    padding: ${(props) => props.$padding || '0'};
    margin: ${(props) => props.$margin || '0'};
    max-width: ${(props) => props.$maxWidth};
    border: ${(props) => (props.error ? '2px solid red' : props.$border || '1px solid #ccc')};
    border-radius: ${(props) => props.$borderRadius || '4px'};
    box-sizing: border-box;
    outline: ${(props) => props.$outline || 'none'};

    &::placeholder {
        color: ${(props) => (props.lightColor ? props.theme.colors.lightColor : props.$phColor)};
    }

    @media (max-width: ${(props) => props.theme.breakpoints.lg}) {
        width: ${(props) => props.$mediumWidth};
    }

    @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
        width: ${(props) => props.$xSmallWidth};
    }
`;

export const InputContainer = styled(FlexContainer)`
    background-color: ${(props) => props.$backgroundColor || 'transparent'};
    border-bottom: 1px solid
        ${(props) => (props.hasError ? props.theme.colors.input.errorMsgText : '#d9d9d9')};
`;
