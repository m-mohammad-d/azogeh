import React from "react";
import BestSallersProduct from "./BestSallersProduct";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface ProductGridProps {
  products: Product[] | undefined;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products?.map(product => (
        <BestSallersProduct key={product.id} name={product.name} price={product.price} img={product.image} />
      ))}
    </div>
  );
};

export default ProductGrid;
