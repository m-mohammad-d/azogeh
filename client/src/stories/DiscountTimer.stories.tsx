import type { Meta, StoryObj } from "@storybook/react";
import DiscountTimer from "../components/DiscountTimer";

const meta: Meta<typeof DiscountTimer> = {
  title: "UI/DiscountTimer",
  component: DiscountTimer,
  parameters: {
    backgrounds: {
      default: "light",
    },
  },
};

export default meta;

type Story = StoryObj<typeof DiscountTimer>;

export const Default: Story = {
  args: {
    state: "active",
    initialendDate: new Date().getTime() + 10 * 60 * 60 * 1000,
  },
};
export const Disable: Story = {
  args: {
    state: "disable",
    initialendDate: new Date().getTime() + 10 * 60 * 60 * 1000,
  },
};
