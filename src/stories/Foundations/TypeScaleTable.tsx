import {ThemeProvider} from 'styled-components';
import {Text} from '@components/index';
import {lightTheme} from '@styles/Theme';
import {Table, Th, Td} from './TableParts';

type SizeKey = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';

interface TypeScaleTableProps {
    sizeKeys: SizeKey[];
}

export const TypeScaleTable = ({sizeKeys}: TypeScaleTableProps) => (
    <ThemeProvider theme={lightTheme}>
        <Table>
            <thead>
                <tr>
                    <Th>Token</Th>
                    <Th>Font size</Th>
                    <Th>Line height</Th>
                    <Th>Sample</Th>
                </tr>
            </thead>
            <tbody>
                {sizeKeys.map((key) => {
                    const {fontSize, lineHeight} = lightTheme.typography.sizes[key];
                    return (
                        <tr key={key}>
                            <Td>
                                <code>{key}</code>
                            </Td>
                            <Td>
                                <code>{fontSize}</code>
                            </Td>
                            <Td>
                                <code>{lineHeight}</code>
                            </Td>
                            <Td>
                                <Text size={key} Margin="0" className="sb-unstyled">
                                    The quick brown fox jumps
                                </Text>
                            </Td>
                        </tr>
                    );
                })}
            </tbody>
        </Table>
    </ThemeProvider>
);
