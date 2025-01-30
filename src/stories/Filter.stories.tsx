import type { Meta, StoryObj } from "@storybook/react";
import Filter from "../components/Filter";

const meta: Meta<typeof Filter> = {
  title: "UI/Filter",
  component: Filter,
  parameters: {
    backgrounds: {
      default: "light",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Filter>;

export const Default: Story = {
  args: {
    brand: "maz maz",
    availableOnly: true,
    priceRange: { min: 1, max: 124 },
    category: "",
  },
};
