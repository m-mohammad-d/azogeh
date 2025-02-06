import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Autoplay } from "swiper/modules";
import CategoriesItem from "./CategoriesItem";
import HighlightBar from "./HighlightBar";

const categories = [
  { id: "Snacks", name: "تنقلات و خوراکی", img: "snacks" },
  { id: "Dairy", name: "لبنیات", img: "dairy" },
  { id: "Fruits", name: "میوه و سبزیجات", img: "frout" },
  { id: "Canned", name: "کنسرو و غذای اماده", img: "canned" },
  { id: "Cold-beverage", name: "نوشیدنی سرد", img: "cold-beverage" },
  { id: "Hot-beverage", name: "نوشیدنی گرم", img: "hot-beverage" },
  { id: "Spices", name: "ادویه جات", img: "spice" },
  { id: "Protein", name: "مواد پروتئینی", img: "Protein" },
  { id: "Legumes", name: "حبوبات", img: "Legumes" },
  { id: "Pickles", name: "ترشی جات", img: "pickles" },
  { id: "Sweets", name: "شیرینی جات", img: "sweets" },
];

function CategoriesMenu() {
  return (
    <div className="mb-6 mt-6 px-4 md:mt-20">
      <h2 className="mb-4 text-base font-semibold sm:text-lg md:text-3xl">دسته بندی ها</h2>
      <HighlightBar />

      <Swiper
        modules={[Autoplay]}
        spaceBetween={10}
        slidesPerView={2.2}
        autoplay={{
          delay: 2000,
          pauseOnMouseEnter: true,
          disableOnInteraction: false,
        }}
        loop={true}
        breakpoints={{
          640: { slidesPerView: 4.3, spaceBetween: 15 },
          1024: { slidesPerView: 6, spaceBetween: 20 },
        }}
        className="mt-10"
      >
        {categories.map((categorie) => (
          <SwiperSlide key={categorie.id} className="min-h-56">
            <CategoriesItem id={categorie.id} name={categorie.name} img={categorie.img} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default CategoriesMenu;
