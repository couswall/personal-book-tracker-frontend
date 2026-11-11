import styled from 'styled-components';

export const ReviewCard = styled.div`
    background-color: ${({theme}) => theme.colors.backgroundSecondary};
    padding: 1.5rem;
    border-radius: 1rem;
    border: 1px solid ${({theme}) => theme.colors.borderColor};
    transition:
        border-color 0.3s ease,
        box-shadow 0.3s ease;

    &:hover {
        border-color: ${({theme}) => theme.colors.primaryColor};
        box-shadow: 0 0 15px ${({theme}) => theme.colors.primaryColor}26;
    }

    @media (min-width: ${({theme}) => theme.breakpoints.lg ?? '1024px'}) {
        padding: 2rem;
    }
`;

export const VerifiedBadge = styled.span`
    display: flex;
    align-items: center;
    gap: 0.25rem;
    background-color: ${({theme}) => theme.colors.secondaryColor}1A;
    color: ${({theme}) => theme.colors.secondaryColor};
    font-size: 10px;
    padding: 2px 8px;
    border-radius: 9999px;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    border: 1px solid ${({theme}) => theme.colors.secondaryColor}33;
`;

export const InteractionBtn = styled.button`
    display: flex;
    font-family: inherit;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    font-weight: bold;
    color: ${({theme}) => theme.colors.text.light};
    background: none;
    border: none;
    cursor: pointer;
    transition: color 0.2s;

    &:hover {
        color: ${({theme}) => theme.colors.text.theme};
    }

    &.helpful:hover {
        color: ${({theme}) => theme.colors.primaryColor};
    }

    &.helpful:hover div {
        background-color: ${({theme}) => theme.colors.primaryColor}1A;
    }
`;

export const HelpfulIconWrapper = styled.div`
    width: 2rem;
    height: 2rem;
    border-radius: 0.5rem;
    background-color: ${({theme}) => theme.colors.borderColor}4D;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s;
`;

export const MoreOptionsBtn = styled.button`
    color: ${({theme}) => theme.colors.text.light};
    background: none;
    border: none;
    cursor: pointer;
    transition: color 0.2s;

    &:hover {
        color: ${({theme}) => theme.colors.text.theme};
    }
`;

export const LoadMoreBtn = styled.button`
    width: 100%;
    margin-top: 2rem;
    padding: 1rem 0;
    background-color: ${({theme}) => theme.colors.borderColor}4D;
    border: 1px solid ${({theme}) => theme.colors.borderColor};
    border-radius: 0.75rem;
    color: ${({theme}) => theme.colors.text.light};
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        background-color: ${({theme}) => theme.colors.borderColor};
        color: ${({theme}) => theme.colors.text.theme};
    }
`;
