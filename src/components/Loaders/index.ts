import styled from 'styled-components';

interface LoadersProps {
    Width?: string;
    Height?: string;
    Margin?: string;
    Padding?: string;
}

export const LoadingSpinner = styled.div<LoadersProps>`
    width: ${(props) => props.Width || '50px'};
    padding: ${(props) => props.Padding || '8px'};
    aspect-ratio: 1;
    border-radius: 50%;
    background: ${(props) => props.theme.colors.primaryColor};
    --_m: 
        conic-gradient(#0000 10%,#000),
        linear-gradient(#000 0 0) content-box;
    -webkit-mask: var(--_m);
            mask: var(--_m);
    -webkit-mask-composite: source-out;
            mask-composite: subtract;
    animation: l3 1s infinite linear;
    }
    @keyframes l3 {to{transform: rotate(1turn)}
`;
