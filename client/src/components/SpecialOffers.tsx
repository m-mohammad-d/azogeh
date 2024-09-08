import Banner from "./Banner";
import HighlightBar from "./HighlightBar";
const banners = [{ img: "category-1" }, { img: "category-2" }, { img: "category-3" }];
function SpecialOffers() {
  return (
    <div className="mt-16">
      <h2 className="text-3xl">تخفیف های مارکتی</h2>
      <HighlightBar />
      <div className="grid grid-cols-3 gap-6 mt-8">
        {banners.map(banner => (
          <Banner img={banner.img} />
        ))}
      </div>
    </div>
  );
}

export default SpecialOffers;
