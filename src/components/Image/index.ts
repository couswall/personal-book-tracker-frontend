import styled from 'styled-components';

interface ImageProps {
    $width?: string;
    $height?: string;
    $objectFit?: string;
    $borderRadius?: string;
    $margin?: string;
    $padding?: string;
}

export const Image = styled.img<ImageProps>`
    width: ${(props) => props.$width || '100%'};
    height: ${(props) => props.$height || '100%'};
    object-fit: ${(props) => props.$objectFit || 'unset'};
    border-radius: ${(props) => props.$borderRadius || 'unset'};
    margin: ${(props) => props.$margin || 'unset'};
    padding: ${(props) => props.$padding || 'unset'};
`;
