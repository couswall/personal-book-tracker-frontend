import type {Meta, StoryObj} from '@storybook/react-vite';
import styled from 'styled-components';
import {
    Text,
    TitleH1,
    TitleH2,
    TitleH3,
    TitleH4,
    TitleH5,
    TitleH6,
    Paragraph,
    Label,
    Small,
    Caption,
} from './index';

type VariantKey =
    | 'default'
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'muted'
    | 'white'
    | 'error'
    | 'success'
    | 'danger';

const allVariants: VariantKey[] = [
    'default',
    'primary',
    'secondary',
    'accent',
    'muted',
    'white',
    'error',
    'success',
    'danger',
];

const meta: Meta<typeof Text> = {
    title: 'Components/Typography',
    component: Text,
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: allVariants,
        },
        size: {
            control: 'select',
            options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'],
        },
        weight: {
            control: 'select',
            options: ['normal', 'medium', 'semibold', 'bold'],
        },
    },
    args: {
        children: 'The quick brown fox jumps over the lazy dog',
        variant: 'default',
        size: 'md',
        weight: 'normal',
    },
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Default: Story = {};

const VariantList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const AllVariants: Story = {
    render: () => (
        <VariantList>
            {allVariants.map((variant) => (
                <Text key={variant} variant={variant} size="lg">
                    {variant} — The quick brown fox
                </Text>
            ))}
        </VariantList>
    ),
    parameters: {
        docs: {
            description: {
                story: '`white` is meant for dark/colored backgrounds — it will look blank here on a light background.',
            },
        },
    },
};

const PresetStack = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

export const Presets: Story = {
    render: () => (
        <PresetStack>
            <TitleH1>TitleH1</TitleH1>
            <TitleH2>TitleH2</TitleH2>
            <TitleH3>TitleH3</TitleH3>
            <TitleH4>TitleH4</TitleH4>
            <TitleH5>TitleH5</TitleH5>
            <TitleH6>TitleH6</TitleH6>
            <Paragraph>Paragraph — used for body copy throughout the app.</Paragraph>
            <Label>Label — used above form inputs</Label>
            <Small>Small — used for fine print</Small>
            <Caption>Caption — muted, used for metadata</Caption>
        </PresetStack>
    ),
    parameters: {
        docs: {
            description: {
                story: 'See the Foundations → Typography page for the full size/weight mapping behind each preset.',
            },
        },
    },
};
