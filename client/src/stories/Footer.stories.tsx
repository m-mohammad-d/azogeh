import type { Meta, StoryObj } from "@storybook/react";
import Footer from "../components/Footer";
import { Provider } from "react-redux";
import store from "../store";
import { MemoryRouter } from "react-router-dom";

const meta: Meta<typeof Footer> = {
  title: "UI/Footer",
  component: Footer,
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

type Story = StoryObj<typeof Footer>;

export const Default: Story = {};
