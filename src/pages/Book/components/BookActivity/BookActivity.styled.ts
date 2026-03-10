import { Button, FlexContainer } from '@components/index';
import styled from 'styled-components';

export { StarRating } from '@pages/Book/Book.styled';

export const ActivityCard = styled(FlexContainer)`
    background-color: ${({theme}) => theme.colors.backgroundSecondary}80;
`;

export const IconCirclePrimary = styled.div`
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    background-color: ${({theme}) => theme.colors.primaryColor}33;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({theme}) => theme.colors.primaryColor};
`;

export const IconCircleSecondary = styled.div`
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    background-color: ${({theme}) => theme.colors.primaryLight}33;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({theme}) => theme.colors.primaryLight};
`;

export const TextLink = styled(Button)`
    font-size: 0.75rem;
    height: unset;
    padding: unset;
    color: ${({theme}) => theme.colors.primaryColor};
    font-weight: bold;
    background: none;
    border: none;

    &:hover:not(:disabled) {
        text-decoration: underline;
        background: unset;
        color: ${({theme}) => theme.colors.primaryColor};
        background-color: unset;
    }
`;

export const Divider = styled.div`
    height: 2.5rem;
    width: 1px;
    background-color: ${({theme}) => theme.colors.borderColor};
    display: none;
    @media (min-width: ${({theme}) => theme.breakpoints.md || '768px'}) {
        display: block;
    }
`;
