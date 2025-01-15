import type { Meta, StoryObj } from "@storybook/react";
import Header from "../components/Header";
import { Provider } from "react-redux";
import store from "../store";
import { MemoryRouter } from "react-router-dom";

const meta: Meta<typeof Header> = {
  title: "UI/Header",
  component: Header,
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

type Story = StoryObj<typeof Header>;

export const Default: Story = {};
