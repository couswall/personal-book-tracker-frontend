import type {Meta, StoryObj} from '@storybook/react-vite';
import {LogoIcon} from './LogoIcon';

const meta: Meta<typeof LogoIcon> = {
    title: 'Components/LogoIcon',
    component: LogoIcon,
    tags: ['autodocs'],
    argTypes: {
        size: {control: 'text'},
        color: {control: 'color'},
        triangleColor: {control: 'color'},
    },
    args: {
        size: '48px',
    },
};

export default meta;
type Story = StoryObj<typeof LogoIcon>;

export const Default: Story = {};
export const Large: Story = {args: {size: '96px'}};
export const CustomColor: Story = {args: {color: '#DA498D'}};
