interface CategoriesItemProps {
  name: string;
  img: string;
}

function CategoriesItem({ name, img }: CategoriesItemProps) {
  return (
    <div className="border bg-[#FDFAFB] shadow-md px-4 py-6 flex flex-col items-center text-center">
      <div className="w-auto h-28 mb-2">
        <img src={`/public/category/${img}.png`} alt={name} className="w-full h-full object-cover" />
      </div>
      <div>
        <p className="text-lg font-semibold text-gray-700 mt-4">{name}</p>
      </div>
    </div>
  );
}

export default CategoriesItem;
