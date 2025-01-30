import type { Meta, StoryObj } from "@storybook/react";
import Input from "../components/Input";

const meta: Meta<typeof Input> = {
  title: "UI/Input",
  component: Input,
  parameters: {
    backgrounds: {
      default: "light",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: "Enter text",
    size: 40,
    disabled: false,
    errorMessage: "",
  },
};

export const ErrorState: Story = {
  args: {
    placeholder: "Enter text",
    size: 40,
    disabled: false,
    errorMessage: "This field is required",
  },
};
export const Password: Story = {
  args: {
    placeholder: "Enter text",
    size: 40,
    disabled: false,
    errorMessage: "",
    type: "password",
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "Enter text",
    size: 40,
    disabled: true,
    errorMessage: "",
  },
};

export const SmallInput: Story = {
  args: {
    placeholder: "Enter text",
    size: 32,
    disabled: false,
    errorMessage: "",
  },
};

export const LargeInput: Story = {
  args: {
    placeholder: "Enter text",
    size: 48,
    disabled: false,
    errorMessage: "",
  },
};
