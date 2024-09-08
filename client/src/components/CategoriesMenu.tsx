import CategoriesItem from "./CategoriesItem";

const categories = [
  { name: "تنقلات و خوراکی", img: "snacks" },
  { name: "لبنیات", img: "dairy" },
  { name: "میوه و سبزیجات", img: "frout" },
  { name: "محصولات کنسروی", img: "canned" },
  { name: "نوشیدنی سرد", img: "cold-beverage" },
  { name: "نوشیدنی گرم", img: "hot-beverage" },
  { name: "نان و بیکری", img: "bread" },
  { name: "ادویه جات", img: "spice" },
  { name: "مواد پروتئینی", img: "protein" },
  { name: "حبوبات", img: "Legumes" },
  { name: "ترشیجات", img: "pickles" },
  { name: "شیرینی جات", img: "sweets" },
];

function CategoriesMenu() {
  return (
    <div className="mt-28 mb-6">
      <h2 className="text-3xl">دسته بندی ها</h2>
      <div className="relative w-full min-h-0.5 mt-5 bg-gray-100">
        <div className="absolute right-0 h-1 bg-primary-500 w-2/12"></div>
      </div>
      <div className="grid grid-cols-6 gap-4 gap-y-8 mt-10">
        {categories.map(categorie => (
          <CategoriesItem name={categorie.name} img={categorie.img} />
        ))}
      </div>
    </div>
  );
}

export default CategoriesMenu;
