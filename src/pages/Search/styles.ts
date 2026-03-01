import styled from 'styled-components';

export const StarContainer = styled.div<{$size: string}>`
    display: inline-flex;
    gap: 0.125rem;
    font-size: ${({$size}) => $size};
`;

export const StarWrapper = styled.span`
    position: relative;
    display: inline-block;
    color: ${({theme}) => theme.colors.borderColor};
`;

export const StarFill = styled.span<{$fillPercent: number}>`
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
    width: ${({$fillPercent}) => $fillPercent}%;
    color: ${({theme}) => theme.colors.tertiaryColor};
`;
