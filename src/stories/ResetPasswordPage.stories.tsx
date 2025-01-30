import type { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";
import store from "../store";
import { MemoryRouter } from "react-router-dom";
import ResetPasswordPage from "../pages/ResetPasswordPage";

const meta: Meta<typeof ResetPasswordPage> = {
  title: "UI/ResetPasswordPage",
  component: ResetPasswordPage,
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

type Story = StoryObj<typeof ResetPasswordPage>;

export const Default: Story = {};
