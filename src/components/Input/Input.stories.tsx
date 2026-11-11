import type {Meta, StoryObj} from '@storybook/react-vite';
import {Input} from './index';

const meta: Meta<typeof Input> = {
    title: 'Components/Input',
    component: Input,
    tags: ['autodocs'],
    argTypes: {
        error: {control: 'boolean'},
        disabled: {control: 'boolean'},
        placeholder: {control: 'text'},
    },
    args: {
        placeholder: 'Enter text...',
        $width: '280px',
        $padding: '10px 12px',
        $borderRadius: '8px',
    },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {};

export const WithError: Story = {
    args: {error: true, placeholder: 'Required field'},
};

export const Disabled: Story = {
    args: {disabled: true, placeholder: "Can't type here"},
};
