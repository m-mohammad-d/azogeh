import Banner from "./Banner";
import HighlightBar from "./HighlightBar";

const banners = [{ img: "category-1" }, { img: "category-2" }, { img: "category-3" }];

function SpecialOffers() {
  return (
    <div className="mt-16 px-4 md:px-6 lg:px-8">
      <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-6 md:mb-8">تخفیف های مارکتی</h2>
      <HighlightBar />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-8 gap-6">
        {banners.map((banner, index) => (
          <Banner key={index} img={banner.img} />
        ))}
      </div>
    </div>
  );
}

export default SpecialOffers;
