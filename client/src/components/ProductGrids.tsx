import React from "react";
import BestSallersProduct from "./BestSallersProduct";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  slug: string;
  discount: number | undefined;
  discountedPrice: number;
}

interface ProductGridProps {
  products: Product[] | undefined;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  console.log(products);

  return (
    <div className="grid mx-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
      {products?.map(product => (
        <BestSallersProduct key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
