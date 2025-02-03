import BenefitsCardItem from "./BenefitsCardItem";

const items = [
  { name: "ارسال رایگان", img: "free-send-icon" },
  { name: "پرداخت در محل", img: "cart-icon" },
  { name: "سلامت کالا", img: "like" },
  { name: "بهترین قیمت", img: "dollar" },
];

function BenefitsCard() {
  return (
    <div className="mt-16 w-full rounded-lg bg-neutral-gray-1 px-4 py-10">
      <div className="mx-auto max-w-4xl">
        <div className="grid items-center gap-5 text-center grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => (
            <BenefitsCardItem key={index} name={item.name} img={item.img} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default BenefitsCard;
