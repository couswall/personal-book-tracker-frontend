import styled from 'styled-components';

export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 32px;
    font-size: 14px;
`;

export const Th = styled.th`
    text-align: left;
    padding: 8px 12px;
    border-bottom: 2px solid rgba(128, 128, 128, 0.35);
`;

export const Td = styled.td`
    padding: 8px 12px;
    border-bottom: 1px solid rgba(128, 128, 128, 0.2);
    vertical-align: middle;
`;
