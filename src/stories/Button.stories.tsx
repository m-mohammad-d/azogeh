import type { Meta, StoryObj } from "@storybook/react";
import Button from "../components/Button";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  parameters: {
    backgrounds: {
      default: "light", 
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Click me",
    disabled: false, 
    size: "medium", 
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Click me",
    disabled: false,
    size: "medium",
  },
};

export const Tertiary: Story = {
  args: {
    variant: "tertiary",
    children: "Click me",
    disabled: false,
    size: "medium",
  },
};


export const Disabled: Story = {
  args: {
    variant: "primary",
    children: "Disabled Button",
    disabled: true, 
  },
};

export const SmallButton: Story = {
  args: {
    variant: "primary",
    children: "Small Button",
    size: "small", 
    disabled: false,
  },
};

export const LargeButton: Story = {
  args: {
    variant: "primary",
    children: "Large Button",
    size: "large", 
    disabled: false,
  },
};
