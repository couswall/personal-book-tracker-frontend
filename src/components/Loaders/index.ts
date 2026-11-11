import styled from 'styled-components';

interface LoadersProps {
    $width?: string;
    $height?: string;
    $margin?: string;
    $padding?: string;
}

export const LoadingSpinner = styled.div<LoadersProps>`
    width: ${(props) => props.$width || '50px'};
    padding: ${(props) => props.$padding || '8px'};
    aspect-ratio: 1;
    border-radius: 50%;
    background: ${(props) => props.theme.colors.primaryColor};
    --_m: conic-gradient(#0000 10%, #000), linear-gradient(#000 0 0) content-box;
    -webkit-mask: var(--_m);
    mask: var(--_m);
    -webkit-mask-composite: source-out;
    mask-composite: subtract;
    animation: l3 1s infinite linear;

    @keyframes l3 {
        to {
            transform: rotate(1turn);
        }
    }
`;
