import type {Meta, StoryObj} from '@storybook/react-vite';
import {Icon} from '@components/Icon/index';
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
        loading: {control: 'boolean'},
        loadingText: {control: 'text'},
    },
    args: {
        children: 'Button',
        variant: 'primary',
        size: 'md',
        type: 'button',
        fullWidth: false,
        disabled: false,
        loading: false,
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

export const Loading: Story = {args: {loading: true}};
export const LoadingWithText: Story = {args: {loading: true, loadingText: 'Saving...'}};

export const WithLeftIcon: Story = {
    args: {leftIcon: <Icon className="fa-solid fa-plus" FontColor="inherit" />},
};
export const WithRightIcon: Story = {
    args: {rightIcon: <Icon className="fa-solid fa-arrow-right" FontColor="inherit" />},
};
export const WithBothIcons: Story = {
    args: {
        leftIcon: <Icon className="fa-solid fa-download" FontColor="inherit" />,
        rightIcon: <Icon className="fa-solid fa-chevron-down" FontColor="inherit" />,
    },
};
