import FavoriteOrderCard from "../../components/FavoriteOrderCard";

function Userfavorites() {
  return (
    <div>
      <div className="mb-4">
        <h1 className="text-center text-2xl text-neutral-gray-8">محصولات مورد علاقه</h1>
        <div className="space-y-4 mt-6">
          <FavoriteOrderCard />
          <FavoriteOrderCard />
          <FavoriteOrderCard />
        </div>
      </div>
    </div>
  );
}

export default Userfavorites;
