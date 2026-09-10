import type {Meta, StoryObj} from '@storybook/react-vite';
import {Image} from './index';

const meta: Meta<typeof Image> = {
    title: 'Components/Image',
    component: Image,
    tags: ['autodocs'],
    argTypes: {
        src: {control: 'text'},
        alt: {control: 'text'},
    },
    args: {
        src: '/assets/avatar-robot.jpg',
        alt: 'Placeholder avatar',
        Width: '200px',
        Height: '200px',
    },
};

export default meta;
type Story = StoryObj<typeof Image>;

export const Default: Story = {};

export const Circular: Story = {
    args: {
        BorderRadius: '50%',
        ObjectFit: 'cover',
    },
};

export const Cover: Story = {
    args: {
        Width: '300px',
        Height: '150px',
        ObjectFit: 'cover',
    },
};
