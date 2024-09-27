import Banner from "../components/Banner";
import CategoriesMenu from "../components/CategoriesMenu";
import SpecialOffers from "../components/SpecialOffers";
import BestSellers from "../components/BestSellers";
import BenefitsCard from "../components/BenefitsCard";
import { useGetProductsQuery } from "../services/ApiProduct";
import Spinner from "../components/Spinner";

function HomePage() {
  const { data, error, isLoading } = useGetProductsQuery();

  if (isLoading) return <Spinner />;
  if (error) return <div>خطایی رخ داده است.</div>;

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
