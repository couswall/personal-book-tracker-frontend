import type {Meta, StoryObj} from '@storybook/react-vite';
import styled from 'styled-components';
import {Icon} from './index';

type IconVariantKey =
    | 'primary'
    | 'text'
    | 'light'
    | 'dark'
    | 'muted'
    | 'error'
    | 'success'
    | 'danger';
type IconSizeKey = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const allVariants: IconVariantKey[] = [
    'primary',
    'text',
    'light',
    'dark',
    'muted',
    'error',
    'success',
    'danger',
];
const allSizes: IconSizeKey[] = ['xs', 'sm', 'md', 'lg', 'xl'];

const meta: Meta<typeof Icon> = {
    title: 'Components/Icon',
    component: Icon,
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['primary', 'text', 'light', 'dark', 'muted', 'error', 'success', 'danger'],
        },
        size: {
            control: 'select',
            options: ['xs', 'sm', 'md', 'lg', 'xl'],
        },
        className: {control: 'text'},
    },
    args: {
        className: 'fa-solid fa-star',
        variant: 'primary',
        size: 'md',
    },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Default: Story = {};

const Row = styled.div`
    display: flex;
    align-items: center;
    gap: 24px;
`;

const Swatch = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    color: ${(props) => props.theme.colors.text.light};
`;

export const AllVariants: Story = {
    render: () => (
        <Row>
            {allVariants.map((variant) => (
                <Swatch key={variant}>
                    <Icon className="fa-solid fa-star" variant={variant} size="lg" />
                    {variant}
                </Swatch>
            ))}
        </Row>
    ),
};

export const AllSizes: Story = {
    render: () => (
        <Row>
            {allSizes.map((size) => (
                <Swatch key={size}>
                    <Icon className="fa-solid fa-star" variant="primary" size={size} />
                    {size}
                </Swatch>
            ))}
        </Row>
    ),
};
