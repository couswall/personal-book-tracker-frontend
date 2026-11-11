import type {Meta, StoryObj} from '@storybook/react-vite';
import {Icon} from './index';
import {IconWrapper} from './IconWrapper';

const meta: Meta<typeof IconWrapper> = {
    title: 'Components/IconWrapper',
    component: IconWrapper,
    tags: ['autodocs'],
    argTypes: {
        shape: {control: 'select', options: ['circle', 'square']},
        isActive: {control: 'boolean'},
    },
    args: {
        shape: 'circle',
        isActive: true,
    },
    render: (args) => (
        <IconWrapper {...args}>
            <Icon variant="primary" className="fa-solid fa-book" />
        </IconWrapper>
    ),
};

export default meta;
type Story = StoryObj<typeof IconWrapper>;

export const Circle: Story = {args: {shape: 'circle'}};
export const Square: Story = {args: {shape: 'square'}};
export const Inactive: Story = {
    args: {shape: 'square', isActive: false},
    render: (args) => (
        <IconWrapper {...args}>
            <Icon variant="muted" className="fa-solid fa-book" />
        </IconWrapper>
    ),
};
