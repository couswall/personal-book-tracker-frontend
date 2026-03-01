import styled from 'styled-components';
import {FlexContainer} from '@components/FlexContainer/index';

interface IInputProps {
    error?: string | boolean;
    FontSize?: string;
    FontColor?: string;
    FontFamily?: string;
    BackgroundColor?: string;
    Width?: string;
    Height?: string;
    Padding?: string;
    Margin?: string;
    MaxWidth?: string;
    Border?: string;
    BorderRadius?: string;
    Outline?: string;
    MediumWidth?: string;
    SmallWidth?: string;
    XSmallWidth?: string;
    LightColor?: boolean;
    PHColor?: string;
}

export const Input = styled.input<IInputProps>`
    font-size: ${(props) => props.FontSize || '1rem'};
    color: ${(props) => props.theme.colors.text.theme || props.FontColor};
    font-family: ${(props) => props.FontFamily || props.theme.fonts.lexend};
    width: ${(props) => props.Width || 'auto'};
    height: ${(props) => props.Height || 'auto'};
    background-color: ${(props) => props.BackgroundColor || props.theme.colors.inputBackground};
    padding: ${(props) => props.Padding || '0'};
    margin: ${(props) => props.Margin || '0'};
    max-width: ${(props) => props.MaxWidth};
    border: ${(props) => (props.error ? '2px solid red' : props.Border || '1px solid #ccc')};
    border-radius: ${(props) => props.BorderRadius || '4px'};
    box-sizing: border-box;
    outline: ${(props) => props.Outline || 'none'};

    &::placeholder {
        color: ${(props) => (props.LightColor ? props.theme.colors.lightColor : props.PHColor)};
    }

    @media (max-width: ${(props) => props.theme.breakpoints.lg}) {
        width: ${(props) => props.MediumWidth};
    }

    @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
        width: ${(props) => props.XSmallWidth};
    }
`;

export const InputContainer = styled(FlexContainer)`
    background-color: ${(props) => props.BackgroundColor || 'transparent'};
    border-bottom: 1px solid
        ${(props) => (props.hasError ? props.theme.colors.input.errorMsgText : '#d9d9d9')};
`;
