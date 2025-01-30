import type { Meta, StoryObj } from "@storybook/react";
import ProductCard from "../components/ProductCard";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../store";

const meta: Meta<typeof ProductCard> = {
  title: "UI/ProductCard",
  component: ProductCard,
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

type Story = StoryObj<typeof ProductCard>;

export const Default: Story = {
  args: {
    product: {
      _id: "67378aeb46a5bb2e6dc1303a",
      name: "ماست سون پر چرب کاله مقدار 900 گرم",
      description:
        "ماست سون پرچرب کاله، یک انتخاب عالی برای علاقه‌مندان به طعم غنی و خامه‌ای ماست است. این محصول با کیفیت بالا و در وزن 900 گرم عرضه می‌شود، که برای مصرف خانوادگی و تهیه انواع غذاها و دسرها بسیار مناسب است. ماست سون کاله با داشتن درصد چربی بیشتر، طعمی دلپذیر و ارزش غذایی بالایی دارد و می‌تواند به‌عنوان یک همراه سالم و خوشمزه در وعده‌های غذایی شما قرار گیرد.\n\n\n\n\n\n\n",
      image: "https://res.cloudinary.com/dk1j8lhuv/image/upload/v1731693289/Azooghe/cqleorbcit2pvipwczmm.webp",
      images: ["https://res.cloudinary.com/dk1j8lhuv/image/upload/v1731693289/Azooghe/cqleorbcit2pvipwczmm.webp"],
      countInStock: 366,
      isAvailable: true,
      brand: "کاله",
      category: "لبنیات",
      rating: 0,
      numReviews: 0,
      price: 70000,
      discount: 0,
      createdAt: "2024-11-15T17:54:51.769Z",
      updatedAt: "2024-12-20T11:28:34.096Z",
      slug: "mast-swn-pr-chrb-kalh-mqdar-900-grm",
      discountedPrice: 0,
      qty: 12,
      id: "67378aeb46a5bb2e6dc1303a",
    },
  },
};

export const DiscountedPrice : Story = {
  args: {
    product: {
      _id: "67378aeb46a5bb2e6dc1303a",
      name: "ماست سون پر چرب کاله مقدار 900 گرم",
      description:
        "ماست سون پرچرب کاله، یک انتخاب عالی برای علاقه‌مندان به طعم غنی و خامه‌ای ماست است. این محصول با کیفیت بالا و در وزن 900 گرم عرضه می‌شود، که برای مصرف خانوادگی و تهیه انواع غذاها و دسرها بسیار مناسب است. ماست سون کاله با داشتن درصد چربی بیشتر، طعمی دلپذیر و ارزش غذایی بالایی دارد و می‌تواند به‌عنوان یک همراه سالم و خوشمزه در وعده‌های غذایی شما قرار گیرد.\n\n\n\n\n\n\n",
      image: "https://res.cloudinary.com/dk1j8lhuv/image/upload/v1731693289/Azooghe/cqleorbcit2pvipwczmm.webp",
      images: ["https://res.cloudinary.com/dk1j8lhuv/image/upload/v1731693289/Azooghe/cqleorbcit2pvipwczmm.webp"],
      countInStock: 366,
      isAvailable: true,
      brand: "کاله",
      category: "لبنیات",
      rating: 0,
      numReviews: 0,
      price: 70000,
      discount: 40,
      createdAt: "2024-11-15T17:54:51.769Z",
      updatedAt: "2024-12-20T11:28:34.096Z",
      slug: "mast-swn-pr-chrb-kalh-mqdar-900-grm",
      discountedPrice: 45000,
      qty: 12,
      id: "67378aeb46a5bb2e6dc1303a",
    },
  },
};
