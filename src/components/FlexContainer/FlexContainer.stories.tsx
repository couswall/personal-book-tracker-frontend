import type {Meta, StoryObj} from '@storybook/react-vite';
import styled from 'styled-components';
import {BaseContainer, FlexContainer} from './index';

const meta: Meta<typeof FlexContainer> = {
    title: 'Components/FlexContainer',
    component: FlexContainer,
    tags: ['autodocs'],
    parameters: {
        controls: {disable: true},
    },
};

export default meta;
type Story = StoryObj<typeof FlexContainer>;

const DemoBox = styled.div`
    background-color: ${(props) => props.theme.colors.primaryLight};
    border: 1px solid ${(props) => props.theme.colors.borderColor};
    border-radius: 8px;
    padding: 16px 24px;
    color: ${(props) => props.theme.colors.text.theme};
`;

export const Row: Story = {
    render: () => (
        <FlexContainer Gap="12px">
            <DemoBox>One</DemoBox>
            <DemoBox>Two</DemoBox>
            <DemoBox>Three</DemoBox>
        </FlexContainer>
    ),
};

export const Column: Story = {
    render: () => (
        <FlexContainer FlexDirection="column" Gap="12px">
            <DemoBox>One</DemoBox>
            <DemoBox>Two</DemoBox>
            <DemoBox>Three</DemoBox>
        </FlexContainer>
    ),
};

export const SpaceBetween: Story = {
    render: () => (
        <FlexContainer JustifyContent="space-between" Width="400px">
            <DemoBox>Left</DemoBox>
            <DemoBox>Right</DemoBox>
        </FlexContainer>
    ),
};

type BGColorVariant = 'primary' | 'secondary' | 'tertiary' | 'accent' | 'card';
const allBGVariants: BGColorVariant[] = ['primary', 'secondary', 'tertiary', 'accent', 'card'];

export const BackgroundColorVariants: Story = {
    render: () => (
        <FlexContainer Gap="12px">
            {allBGVariants.map((variant) => (
                <BaseContainer
                    key={variant}
                    BackgroundColorVariant={variant}
                    Padding="16px 24px"
                    BorderRadius="8px"
                    Border="1px solid rgba(128, 128, 128, 0.2)"
                >
                    {variant}
                </BaseContainer>
            ))}
        </FlexContainer>
    ),
    parameters: {
        docs: {
            description: {
                story: "`BaseContainer`'s `BackgroundColorVariant` prop maps to theme colors instead of a raw hex string.",
            },
        },
    },
};

type ShadowVariant = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'inner';
const allShadowVariants: ShadowVariant[] = ['none', 'sm', 'md', 'lg', 'xl', 'inner'];

export const BoxShadowVariants: Story = {
    render: () => (
        <FlexContainer Gap="24px">
            {allShadowVariants.map((variant) => (
                <BaseContainer
                    key={variant}
                    BackgroundColorVariant="card"
                    BoxShadowVariant={variant}
                    Padding="16px 24px"
                    BorderRadius="8px"
                >
                    {variant}
                </BaseContainer>
            ))}
        </FlexContainer>
    ),
};
