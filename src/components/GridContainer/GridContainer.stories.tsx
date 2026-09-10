import type {Meta, StoryObj} from '@storybook/react-vite';
import styled from 'styled-components';
import {GridContainer} from './index';

const DemoCell = styled.div`
    background-color: ${(props) => props.theme.colors.primaryLight};
    border: 1px solid ${(props) => props.theme.colors.borderColor};
    border-radius: 8px;
    padding: 16px;
    text-align: center;
    color: ${(props) => props.theme.colors.text.theme};
`;

const meta: Meta<typeof GridContainer> = {
    title: 'Components/GridContainer',
    component: GridContainer,
    tags: ['autodocs'],
    parameters: {
        controls: {disable: true},
    },
};

export default meta;
type Story = StoryObj<typeof GridContainer>;

export const ThreeColumns: Story = {
    render: () => (
        <GridContainer TemplateColumns="repeat(3, 1fr)" Gap="16px">
            <DemoCell>1</DemoCell>
            <DemoCell>2</DemoCell>
            <DemoCell>3</DemoCell>
            <DemoCell>4</DemoCell>
            <DemoCell>5</DemoCell>
            <DemoCell>6</DemoCell>
        </GridContainer>
    ),
};

export const ResponsiveColumns: Story = {
    render: () => (
        <GridContainer
            TemplateColumns="repeat(4, 1fr)"
            MdTemplateColumns="repeat(2, 1fr)"
            Gap="16px"
            MdGap="8px"
        >
            <DemoCell>1</DemoCell>
            <DemoCell>2</DemoCell>
            <DemoCell>3</DemoCell>
            <DemoCell>4</DemoCell>
        </GridContainer>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Shrink the viewport below the `md` breakpoint to see the column count and gap collapse.',
            },
        },
    },
};
