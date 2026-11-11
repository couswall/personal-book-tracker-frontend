import styled from 'styled-components';
import {Button, FlexContainer} from '@components/index';

export const CalloutContainer = styled(FlexContainer)`
    align-items: flex-start;
    gap: 0.75rem;
    padding: 0.875rem 1rem;
    border-radius: 0.75rem;
    color: ${({theme}) => theme.colors.primaryColor};
    background-color: ${({theme}) => `${theme.colors.primaryColor}1A`};
    border: 1px solid ${({theme}) => `${theme.colors.primaryColor}4D`};
`;

export const BookContextContainer = styled(FlexContainer)`
    align-items: center;
    gap: 1rem;
    padding: 0.75rem;
    border-radius: 0.75rem;
    background-color: ${({theme}) => `${theme.colors.backgroundTertiary}80`};
    border: 1px solid rgba(255, 255, 255, 0.05);

    & > *:last-child {
        min-width: 0;
    }
`;

export const BookThumbnail = styled(FlexContainer)`
    flex-shrink: 0;
    width: 3rem;
    height: 4rem;
    overflow: hidden;
    align-items: center;
    justify-content: center;
    border-radius: 0.375rem;
    background-color: ${({theme}) => theme.colors.backgroundSecondary};
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
`;

export const CompletedBadge = styled.span`
    align-self: flex-start;
    padding: 0 0.5rem;
    border-radius: 0.25rem;
    font-family: ${({theme}) => theme.fonts.lexend};
    font-size: 0.625rem;
    line-height: 1rem;
    font-weight: ${({theme}) => theme.typography.weights.bold};
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: ${({theme}) => theme.colors.primaryColor};
    background-color: ${({theme}) => `${theme.colors.primaryColor}33`};
`;

export const CancelButton = styled(Button)`
    border: 1px solid ${({theme}) => theme.colors.borderColor};
    font-size: ${({theme}) => theme.typography.sizes.sm.fontSize};
    font-weight: ${({theme}) => theme.typography.weights.semibold};
`;
