import React from "react";
import { Product } from "../types/product";

interface FilterProps {
  products: Product[] | undefined;
  availableOnly: boolean;
  priceRange: { min: number; max: number };
  brand: string;
  category: string;
  handleSetAvailableOnly: () => void;
  handlePriceChange: (e: React.ChangeEvent<HTMLInputElement>, category: "min" | "max") => void;
  handleBrandChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleCategoryChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  resetFilters: () => void;
}
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
const brands = [
  "خوشبخت",
  "مهرام",
  "کاریبو",
  "کامبیز",
  "لواسانی",
  "بدر",
  "اصالت",
  "بیژن",
  "سلامت",
  "بهروز",
  "چین چین",
  "نادری",
  "کاپو",
  "کینوفیت",
  "رشد",
  "خشکپاک",
  "سوربن",
  "پگاه",
  "مهیا پروتئین",
  "تلاونگ",
  "فرش",
  "ترخون بانو",
  "سیمرغ",
  "همیشک",
  "گلها",
  "گرین فیلد",
  "هانی",
  "متفرقه",
  "دستچین کالا",
  "سرمد",
  "دلپذیر",
  "رعنا",
  "گلدن گیت",
  "الیت",
  "مه پروتئین",
  "گلستان",
  "طبیعت",
  "روژین",
  "اروم آدا",
  "هایلی",
  "پیک",
  "دنت",
  "کاله",
  "کالین",
  "مانداسوی",
  "پارمیدا",
  "جمانه",
  "کوپا",
  "فرمند",
  "سایرو",
  "تواضع",
  "مینو",
  "باراکا",
  "لوکوما",
  "هراز",
  "دالیا",
  "رامک",
  "میهن",
  "رانی",
  "موریس",
  "سان استار",
  "لایف استار",
  "واتا",
  "سن ایچ",
  "هوفنبرگ",
  "تیمز",
  "کلاسنو",
  "الگادو",
  "مصطفوی",
  "کیوب لند",
  "شاتل",
  "باربیکن",
  "سپرایت",
  "نیکا",
  "مولتی کوکو",
  "چای احمد",
  "گل کیس",
  "مولتی کافه",
  "مولتی میت",
  "نسکافه",
  "دو غزال",
  "بن مانو",
  "_",
  "چی توز",
  "مزمز",
];
const Filter: React.FC<FilterProps> = ({ availableOnly, priceRange, brand, category, handleSetAvailableOnly, handlePriceChange, handleBrandChange, handleCategoryChange, resetFilters }) => {
  return (
    <div className="mx-4 mb-4 rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="mb-4 text-xl font-semibold text-neutral-gray-8">فیلتر ها</h3>
        <button onClick={resetFilters}>حذف فیلتر</button>
      </div>

      {/* Brand Filter */}
      <div className="mb-4">
        <label className="mb-2 block">برند</label>
        <select value={brand} onChange={handleBrandChange} className="w-full rounded-md border border-neutral-gray-3 p-2">
          <option value="all">همه</option>
          {brands.map((brand) => (
            <option value={brand}>{brand}</option>
          ))}
        </select>
      </div>

      {/* Category Filter */}
      <div className="mb-4">
        <label className="mb-2 block">نوع</label>
        <select value={category} onChange={handleCategoryChange} className="w-full rounded-md border border-neutral-gray-3 p-2">
          <option value="all">همه</option>
          {categories.map((category) => (
            <option value={category.name}>{category.name}</option>
          ))}
        </select>
      </div>

      {/* Availability Filter */}
      <div className="mb-4 flex justify-between">
        <label className="mb-2">فقط محصولات موجود</label>
        <div className="flex items-center">
          <label className="relative inline-flex cursor-pointer items-center">
            <input type="checkbox" checked={availableOnly} onChange={handleSetAvailableOnly} className="peer sr-only" />
            <div className="peer-focus:ring-primary-300 peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 dark:border-gray-600 dark:bg-gray-700"></div>
          </label>
        </div>
      </div>
      {/* Price Filter */}
      <div className="mb-4">
        <label className="mb-2 block">رنج قیمت</label>
        <div className="mb-2 flex items-center">
          <input type="number" value={priceRange.min} min="0" max="10000000" onChange={(e) => handlePriceChange(e, "min")} className="mr-2 w-1/2 rounded-md border border-neutral-gray-3 p-2" />
          <span className="mx-2">تا</span>
          <input type="number" value={priceRange.max} min="0" max="10000000" onChange={(e) => handlePriceChange(e, "max")} className="w-1/2 rounded-md border border-neutral-gray-3 p-2" />
        </div>
        <div className="mt-2 text-sm">حداکثر قیمت: {priceRange.max.toLocaleString()} تومان</div>
      </div>
    </div>
  );
};

export default Filter;
