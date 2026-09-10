import {Swatch} from './Swatch';
import {Table, Th, Td} from './TableParts';

export interface ColorToken {
    name: string;
    description: string;
    light: string;
    dark: string;
}

interface ColorTableProps {
    title: string;
    tokens: ColorToken[];
}

export const ColorTable = ({title, tokens}: ColorTableProps) => (
    <div>
        <h3>{title}</h3>
        <Table>
            <thead>
                <tr>
                    <Th>Token</Th>
                    <Th>Description</Th>
                    <Th>Light</Th>
                    <Th>Dark</Th>
                </tr>
            </thead>
            <tbody>
                {tokens.map((token) => (
                    <tr key={token.name}>
                        <Td>
                            <code>{token.name}</code>
                        </Td>
                        <Td>{token.description}</Td>
                        <Td>
                            <Swatch color={token.light} label={`${token.name} (light)`} />
                        </Td>
                        <Td>
                            <Swatch color={token.dark} label={`${token.name} (dark)`} />
                        </Td>
                    </tr>
                ))}
            </tbody>
        </Table>
    </div>
);
