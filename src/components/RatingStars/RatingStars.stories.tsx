import type {Meta, StoryObj} from '@storybook/react-vite';
import {RatingStars} from './index';

const meta: Meta<typeof RatingStars> = {
    title: 'Components/RatingStars',
    component: RatingStars,
    tags: ['autodocs'],
    argTypes: {
        rating: {control: {type: 'range', min: 0, max: 5, step: 0.5}},
        size: {control: 'text'},
    },
    args: {
        rating: 3.5,
    },
};

export default meta;
type Story = StoryObj<typeof RatingStars>;

export const Default: Story = {};
export const Empty: Story = {args: {rating: 0}};
export const FullyRated: Story = {args: {rating: 5}};
export const Large: Story = {args: {rating: 4, size: '1.5rem'}};
