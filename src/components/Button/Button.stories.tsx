import type {Meta, StoryObj} from '@storybook/react-vite';
import {Button} from './index';

const meta: Meta<typeof Button> = {
    title: 'Components/Button',
    component: Button,
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['primary', 'secondary', 'outline', 'ghost', 'danger', 'success'],
        },
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
        },
        fullWidth: {control: 'boolean'},
        disabled: {control: 'boolean'},
    },
    args: {
        children: 'Button',
        variant: 'primary',
        size: 'md',
        type: 'button',
        fullWidth: false,
        disabled: false,
    },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {args: {variant: 'primary'}};
export const Secondary: Story = {args: {variant: 'secondary'}};
export const Outline: Story = {args: {variant: 'outline'}};
export const Ghost: Story = {args: {variant: 'ghost'}};
export const Danger: Story = {args: {variant: 'danger'}};
export const Success: Story = {args: {variant: 'success'}};

export const Small: Story = {args: {size: 'sm'}};
export const Large: Story = {args: {size: 'lg'}};

export const Disabled: Story = {args: {disabled: true}};
export const FullWidth: Story = {args: {fullWidth: true}};
