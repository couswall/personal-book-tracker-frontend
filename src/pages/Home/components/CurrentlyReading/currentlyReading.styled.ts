import styled from 'styled-components';

export const ProgressTrack = styled.div`
    width: 100%;
    height: 0.5rem;
    border-radius: 1rem;
    overflow: hidden;
    background-color: ${({theme}) => theme.colors.background};
`;

export const ProgressFill = styled.div<{$percentage: number}>`
    height: 100%;
    width: ${({$percentage}) => $percentage}%;
    border-radius: 1rem;
    background: linear-gradient(
        to right,
        ${({theme}) => theme.colors.primaryColor},
        ${({theme}) => theme.colors.secondaryColor}
    );
`;
