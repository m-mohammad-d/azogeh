import React from "react";
import ProductImage from "./ProductImage";

type ProductProps = {
  title: string;
  brand: string;
  category: string;
  sales: number;
  rating: number;
  mainImageUrl: string;
  altText: string;
  imageCarousel: string[];
};

const ProductInfo: React.FC<ProductProps> = ({
  title,
  brand,
  category,
  sales,
  rating,
  mainImageUrl,
  altText,
  imageCarousel,
}) => {
  return (
    <div className="flex px-8 w-2/3 justify-between">
      <ProductImage mainImageUrl={mainImageUrl} altText={altText} imageCarousel={imageCarousel} />
      <div className="space-y-4 mr-11">
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="text-lg mb-1">
          <span className="font-bold">برند:</span> {brand}
        </p>
        <p className="text-lg mb-1">
          <span className="font-bold">دسته بندی:</span> {category}
        </p>
        <p className="text-lg mb-1">
          <span className="font-bold">تعداد فروش:</span> {sales} نفر
        </p>
        <p className="text-lg mb-1">
          <span className="font-bold">امتیاز:</span> {rating}
        </p>
      </div>
    </div>
  );
};

export default ProductInfo;
