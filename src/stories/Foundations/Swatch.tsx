import styled from 'styled-components';

interface SwatchProps {
    color: string;
    label: string;
}

const SwatchWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

const SwatchBox = styled.span<{$color: string}>`
    display: inline-block;
    width: 28px;
    height: 28px;
    border-radius: 6px;
    border: 1px solid rgba(128, 128, 128, 0.35);
    background-color: ${(props) => props.$color};
    flex-shrink: 0;
`;

const SwatchCode = styled.code`
    font-size: 12px;
`;

export const Swatch = ({color, label}: SwatchProps) => (
    <SwatchWrapper>
        <SwatchBox $color={color} title={label} />
        <SwatchCode>{color}</SwatchCode>
    </SwatchWrapper>
);
