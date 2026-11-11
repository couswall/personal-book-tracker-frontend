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
        $width: '200px',
        $height: '200px',
    },
};

export default meta;
type Story = StoryObj<typeof Image>;

export const Default: Story = {};

export const Circular: Story = {
    args: {
        $borderRadius: '50%',
        $objectFit: 'cover',
    },
};

export const Cover: Story = {
    args: {
        $width: '300px',
        $height: '150px',
        $objectFit: 'cover',
    },
};
