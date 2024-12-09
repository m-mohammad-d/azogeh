import CategoriesItem from "./CategoriesItem";
import HighlightBar from "./HighlightBar";

const categories = [
  { id: "Snacks", name: "تنقلات و خوراکی", img: "snacks" },
  { id: "Dairy", name: "لبنیات", img: "dairy" },
  { id: "Fruits", name: "میوه و سبزیجات", img: "frout" },
  { id: "Canned", name: "محصولات کنسروی", img: "canned" },
  { id: "Cold-beverage", name: "نوشیدنی سرد", img: "cold-beverage" },
  { id: "Hot-beverage", name: "نوشیدنی گرم", img: "hot-beverage" },
  { id: "Bakery", name: "نان و بیکری", img: "bread" },
  { id: "Spices", name: "ادویه جات", img: "spice" },
  { id: "protein", name: "مواد پروتئینی", img: "Protein" },
  { id: "Legumes", name: "حبوبات", img: "Legumes" },
  { id: "Pickles", name: "ترشیجات", img: "pickles" },
  { id: "Sweets", name: "شیرینی جات", img: "sweets" },
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
