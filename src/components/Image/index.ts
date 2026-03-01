import styled from 'styled-components';

interface ImageProps {
    Width?: string;
    Height?: string;
    ObjectFit?: string;
    BorderRadius?: string;
    Margin?: string;
    Padding?: string;
}

export const Image = styled.img<ImageProps>`
    width: ${(props) => props.Width || '100%'};
    height: ${(props) => props.Height || '100%'};
    object-fit: ${(props) => props.ObjectFit || 'unset'};
    border-radius: ${(props) => props.BorderRadius || 'unset'};
    margin: ${(props) => props.Margin || 'unset'};
    padding: ${(props) => props.Padding || 'unset'};
`;
