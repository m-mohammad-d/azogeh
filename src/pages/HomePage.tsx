import Banner from "../components/Banner";
import CategoriesMenu from "../components/CategoriesMenu";

import BestSellers from "../components/BestSellers";
import BenefitsCard from "../components/BenefitsCard";
import { useGetProductsQuery } from "../services/ApiProduct";
import Spinner from "../components/Spinner";
import SpecialOfferProducts from "../components/SpecialOfferProducts";

function HomePage() {
  const { data, error, isLoading } = useGetProductsQuery();

  if (isLoading) return <Spinner />;
  if (error) return <div>خطایی رخ داده است.</div>;

  return (
    <div>
      <div className="mx-auto mt-8 max-w-screen-xl md:mt-16">
        <Banner/>
        <CategoriesMenu />
        <SpecialOfferProducts products={data?.data.products} />
        <BestSellers products={data?.data.products} />
      </div>
      <BenefitsCard />
    </div>
  );
}

export default HomePage;
