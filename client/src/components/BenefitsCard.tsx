import BenefitsCardItem from "./BenefitsCardItem";

const items = [
  { name: "ارسال رایگان", img: "free-send-icon" },
  { name: "پرداخت در محل", img: "cart-icon" },
  { name: "سلامت کالا", img: "like" },
  { name: "بهترین قیمت", img: "dollar" },
];
function BenefitsCard() {
  return (
    <div className="w-2/3 mx-auto mt-16">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5  items-center">
        {items.map(item => (
          <BenefitsCardItem name={item.name} img={item.img} />
        ))}
      </div>
    </div>
  );
}

export default BenefitsCard;
