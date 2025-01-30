import type { Meta, StoryObj } from "@storybook/react";
import SpecialOfferProducts from "../components/SpecialOfferProducts";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../store";

const meta: Meta<typeof SpecialOfferProducts> = {
  title: "UI/SpecialOfferProducts",
  component: SpecialOfferProducts,
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

type Story = StoryObj<typeof SpecialOfferProducts>;

export const Default: Story = {
  args: {},
};
