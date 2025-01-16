import type { Meta, StoryObj } from "@storybook/react";
import CategoriesItem from "../components/CategoriesItem";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../store";

const meta: Meta<typeof CategoriesItem> = {
  title: "UI/CategoriesItem",
  component: CategoriesItem,
  parameters: {
    backgrounds: {
      default: "light",
    },
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Provider store={store}>
          <Story />
        </Provider>
      </MemoryRouter>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof CategoriesItem>;

export const Default: Story = {
  args: {
    id: "12",
    name: "تنقلات",
    img: "snacks",
  },
};
