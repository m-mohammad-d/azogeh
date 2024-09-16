interface BenefitsCardItemProps {
  name: string;
  img: string;
}
function BenefitsCardItem({ name, img }: BenefitsCardItemProps) {
  return (
    <div className="flex justify-center items-center gap-3">
      <img src={`/public/icon/${img}.svg`} className="w-12 h-12" />
      <h3 className="text-base lg:text-xl">{name}</h3>
    </div>
  );
}

export default BenefitsCardItem;
