import CategoriesItem from "./CategoriesItem";
import HighlightBar from "./HighlightBar";

const categories = [
  { id: "snacks", name: "تنقلات و خوراکی", img: "snacks" },
  { id: "dairy", name: "لبنیات", img: "dairy" },
  { id: "frout", name: "میوه و سبزیجات", img: "frout" },
  { id: "canned", name: "محصولات کنسروی", img: "canned" },
  { id: "cold-beverage", name: "نوشیدنی سرد", img: "cold-beverage" },
  { id: "hot-beverage", name: "نوشیدنی گرم", img: "hot-beverage" },
  { id: "bread", name: "نان و بیکری", img: "bread" },
  { id: "spice", name: "ادویه جات", img: "spice" },
  { id: "protein", name: "مواد پروتئینی", img: "protein" },
  { id: "legumes", name: "حبوبات", img: "Legumes" },
  { id: "pickles", name: "ترشیجات", img: "pickles" },
  { id: "sweets", name: "شیرینی جات", img: "sweets" },
];

function CategoriesMenu() {
  return (
    <div className="mt-28 mb-6 px-4">
      <h2 className="text-lg md:text-3xl font-semibold mb-4">دسته بندی ها</h2>
      <HighlightBar />
      <div className="grid grid-cols-2  md:grid-cols-4 lg:grid-cols-6 gap-4 gap-y-6 mt-10">
        {categories.map(categorie => (
          <CategoriesItem id={categorie.id} key={categorie.name} name={categorie.name} img={categorie.img} />
        ))}
      </div>
    </div>
  );
}

export default CategoriesMenu;
