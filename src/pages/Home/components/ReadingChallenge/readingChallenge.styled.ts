import styled from 'styled-components';

export const RingWrapper = styled.div`
    position: relative;
    width: 12rem;
    height: 12rem;
`;

export const RingSvg = styled.svg`
    width: 100%;
    height: 100%;
    transform: rotate(-90deg);
`;

export const RingTrack = styled.circle`
    fill: none;
    stroke: ${({theme}) => theme.colors.background};
    stroke-width: 8;
`;

export const RingFill = styled.circle`
    fill: none;
    stroke: ${({theme}) => theme.colors.primaryColor};
    stroke-width: 8;
    stroke-linecap: round;
    transition: stroke-dashoffset 0.5s ease;
`;
