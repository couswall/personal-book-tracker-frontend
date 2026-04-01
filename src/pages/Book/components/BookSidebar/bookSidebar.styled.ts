import {FlexContainer, Text} from '@components/index';
import styled from 'styled-components';

export {StarRating} from '@pages/Book/book.styled';

export const MockSidebarItemImg = styled.div<{$bgImage?: string}>`
    width: 5rem;
    height: 5rem;
    flex-shrink: 0;
    background-size: cover;
    background-position: center;
    border-radius: 0.5rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    border: 1px solid ${({theme}) => theme.colors.borderColor};
    background-image: url(${({$bgImage}) => $bgImage || ''});
    transition: border-color 0.2s;
`;

export const MockSidebarItem = styled(FlexContainer)`
    background-color: inherit;
    gap: 1rem;
    cursor: pointer;
    &:hover ${MockSidebarItemImg} {
        border-color: ${({theme}) => theme.colors.primaryColor}80;
    }
`;

export const MockSidebarItemTitle = styled(Text)`
    font-size: 0.875rem;
    font-weight: bold;
    transition: color 0.2s;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;

    ${MockSidebarItem}:hover & {
        color: ${({theme}) => theme.colors.primaryColor};
    }
`;
