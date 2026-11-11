import {Table, Th, Td} from './TableParts';

export interface TokenRow {
    name: string;
    value: string;
}

interface TokenTableProps {
    title: string;
    rows: TokenRow[];
}

export const TokenTable = ({title, rows}: TokenTableProps) => (
    <div>
        <h3>{title}</h3>
        <Table>
            <thead>
                <tr>
                    <Th>Token</Th>
                    <Th>Value</Th>
                </tr>
            </thead>
            <tbody>
                {rows.map((row) => (
                    <tr key={row.name}>
                        <Td>
                            <code>{row.name}</code>
                        </Td>
                        <Td>
                            <code>{row.value}</code>
                        </Td>
                    </tr>
                ))}
            </tbody>
        </Table>
    </div>
);
