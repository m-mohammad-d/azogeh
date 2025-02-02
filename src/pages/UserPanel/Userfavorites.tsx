import FavoriteOrderCard from "../../components/FavoriteOrderCard";
import MetaTags from "../../components/MetaTag";

function Userfavorites() {
  return (
    <div>
      <MetaTags title="علاقه‌مندی‌ها | پنل کاربری" description="محصولات مورد علاقه شما." />

      <div className="mb-4">
        <h1 className="text-center text-2xl text-neutral-gray-8">محصولات مورد علاقه</h1>
        <div className="mt-6 space-y-4">
          <FavoriteOrderCard />
          <FavoriteOrderCard />
          <FavoriteOrderCard />
        </div>
      </div>
    </div>
  );
}

export default Userfavorites;
