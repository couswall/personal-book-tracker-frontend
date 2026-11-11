import type {Meta, StoryObj} from '@storybook/react-vite';
import styled from 'styled-components';
import {Container} from './index';

const meta: Meta<typeof Container> = {
    title: 'Components/Container',
    component: Container,
    tags: ['autodocs'],
    parameters: {
        controls: {disable: true},
    },
};

export default meta;
type Story = StoryObj<typeof Container>;

const Frame = styled.div`
    background-color: ${(props) => props.theme.colors.backgroundSecondary};
    border: 1px dashed ${(props) => props.theme.colors.borderColor};
`;

type MaxWidthVariantKey = 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'full';
const allMaxWidths: MaxWidthVariantKey[] = ['sm', 'md', 'lg', 'xl', 'xxl', 'full'];

export const MaxWidthVariants: Story = {
    render: () => (
        <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
            {allMaxWidths.map((variant) => (
                <Frame key={variant}>
                    <Container
                        maxWidthVariant={variant}
                        $padding="12px 16px"
                        backgroundColorVariant="card"
                    >
                        maxWidthVariant=&quot;{variant}&quot;
                    </Container>
                </Frame>
            ))}
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'The dashed frame is the viewport edge — `Container` centers itself and caps its own width at each variant while always filling 100% up to that cap. This docs canvas is narrower than the `lg`/`xl`/`xxl` breakpoints, so those three (and `full`) render identically here — their max-width never actually kicks in below ~1000px. Open this story on its own (the "Open canvas in new tab" icon above) and widen the browser to see them diverge.',
            },
        },
    },
};
