import type { Meta, StoryObj } from "@storybook/react";
import Rating from "../components/Rating";

const meta: Meta<typeof Rating> = {
  title: "UI/Rating",
  component: Rating,
  parameters: {
    backgrounds: {
      default: "light",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Rating>;

export const Default: Story = {
  args: {
    totalStars: 5,
    filledStars: 2,
  },
};

export const AllEmptyStars: Story = {
  args: {
    totalStars: 5,
    filledStars: 0,
  },
};

export const AllFilledStars: Story = {
  args: {
    totalStars: 5,
    filledStars: 5,
  },
};
