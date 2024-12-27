import BenefitsCardItem from "./BenefitsCardItem";

const items = [
  { name: "ارسال رایگان", img: "free-send-icon" },
  { name: "پرداخت در محل", img: "cart-icon" },
  { name: "سلامت کالا", img: "like" },
  { name: "بهترین قیمت", img: "dollar" },
];
function BenefitsCard() {
  return (
    <div className="w-full bg-neutral-200 mt-16 py-10 rounded-lg">
      <div className="mx-auto w-1/2" >
        <div className="grid grid-cols-2 items-center gap-5 lg:grid-cols-4">
          {items.map((item) => (
            <BenefitsCardItem name={item.name} img={item.img} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default BenefitsCard;
