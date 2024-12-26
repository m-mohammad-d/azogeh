import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Navigation } from "swiper/modules";
import CategoriesItem from "./CategoriesItem";
import HighlightBar from "./HighlightBar";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";

const categories = [
  { id: "Snacks", name: "تنقلات و خوراکی", img: "snacks" },
  { id: "Dairy", name: "لبنیات", img: "dairy" },
  { id: "Fruits", name: "میوه و سبزیجات", img: "frout" },
  { id: "Canned", name: "محصولات کنسروی", img: "canned" },
  { id: "Cold-beverage", name: "نوشیدنی سرد", img: "cold-beverage" },
  { id: "Hot-beverage", name: "نوشیدنی گرم", img: "hot-beverage" },
  { id: "Bakery", name: "نان و بیکری", img: "bread" },
  { id: "Spices", name: "ادویه جات", img: "spice" },
  { id: "Protein", name: "مواد پروتئینی", img: "Protein" },
  { id: "Legumes", name: "حبوبات", img: "Legumes" },
  { id: "Pickles", name: "ترشیجات", img: "pickles" },
  { id: "Sweets", name: "شیرینی جات", img: "sweets" },
];

function CategoriesMenu() {
  return (
    <div className="mb-6 mt-6 px-4 md:mt-20">
      <h2 className="mb-4 text-lg font-semibold md:text-3xl">دسته بندی ها</h2>
      <HighlightBar />

      <div className="mt-4 flex items-center justify-between">
        <button id="prevBtn" className="rounded-full border-2 bg-white p-4 text-neutral-300 shadow-md hover:text-neutral-500">
          <FaLongArrowAltRight size={20} />
        </button>
        <button id="nextBtn" className="rounded-full border-2 bg-white p-4 text-neutral-300 shadow-md hover:text-neutral-500">
          <FaLongArrowAltLeft size={20} />
        </button>
      </div>

      <Swiper
        modules={[Navigation]}
        spaceBetween={10}
        slidesPerView={2}
        breakpoints={{
          640: { slidesPerView: 3, spaceBetween: 15 },
          1024: { slidesPerView: 6, spaceBetween: 20 },
        }}
        navigation={{
          prevEl: `#prevBtn`,
          nextEl: `#nextBtn`,
        }}
        className="mt-10"
      >
        {categories.map((categorie, index) => (
          <SwiperSlide key={categorie.id} className="h-56">
            <CategoriesItem id={categorie.id} name={categorie.name} img={categorie.img} className={index % 2 === 0 ? "bg-primary-1000" : "bg-secondary-1000"} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default CategoriesMenu;
