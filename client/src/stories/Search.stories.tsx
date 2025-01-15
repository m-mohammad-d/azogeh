import type { Meta, StoryObj } from "@storybook/react";
import Search from "../components/Search";
import { Provider } from "react-redux";
import store from "../store";
import { MemoryRouter } from "react-router-dom";

const meta: Meta<typeof Search> = {
  title: "UI/Search",
  component: Search,
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

type Story = StoryObj<typeof Search>;

export const Default: Story = {};
