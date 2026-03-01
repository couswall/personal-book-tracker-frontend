import styled from 'styled-components';

interface IDiamondSVGProps {
    size?: string;
    color?: string;
    triangleColor?: string;
}

export const DiamondSVG = styled.svg<IDiamondSVGProps>`
    width: ${(props) => props.size || '48px'};
    height: ${(props) => props.size || '48px'};
    fill: ${(props) => props.color || props.theme.colors.primaryColor};

    .triangle {
        fill: ${(props) => props.triangleColor || props.color || 'currentColor'};
    }
`;
