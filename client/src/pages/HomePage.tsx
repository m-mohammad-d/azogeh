import { useEffect, useState } from "react";
import Banner from "../components/Banner";
import CategoriesMenu from "../components/CategoriesMenu";
import SpecialOffers from "../components/SpecialOffers";
import BestSellers from "../components/BestSellers";
import { FetchResponse, Product } from "../types/product";
import BenefitsCard from "../components/BenefitsCard";

function HomePage() {
  const [data, setData] = useState<FetchResponse<Product>>();

  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then(data => setData(data));
  }, []);

  return (
    <div className="max-w-screen-2xl mx-auto mt-16">
      <Banner img="banner" />
      <CategoriesMenu />
      <SpecialOffers />
      <BestSellers products={data?.data.products} />
      <BenefitsCard />
    </div>
  );
}

export default HomePage;
