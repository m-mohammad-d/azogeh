import React from "react";
import CommentCard from "./CommentCard";
import HighlightBar from "./HighlightBar";

const reviews = [
  {
    name: "رضا اسدی",
    text: "بهترین نوشیدنی که خوردم سن ایچ هست",
    buyer: true,
    profileImage: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    name: "علی رحمانی",
    text: "کیفیت خوب اما بسته‌بندی ضعیف",
    buyer: false,
    profileImage: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    name: "فاطمه عباسی",
    text: "خیلی راضی بودم، طعم فوق‌العاده",
    buyer: true,
    profileImage: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    name: "مهدی مرادی",
    text: "قیمت بالا ولی ارزش داره",
    buyer: false,
    profileImage: "https://randomuser.me/api/portraits/men/3.jpg",
  },
];

const ProductComments: React.FC = () => {
  return (
    <div className="container mx-auto flex flex-col md:flex-row gap-6 p-6 mt-16">
      {/* Left Sidebar */}
      <div className="w-full md:w-1/4">
        <div className="border rounded-lg p-4 bg-white shadow-lg">
          <h2 className="text-lg font-semibold">امتیاز و دیدگاه کاربران</h2>
          <p className="mt-4 text-4xl font-bold">4.1</p>
          <p className="text-sm">از 5</p>
          <p className="text-gray-200">بر اساس 40 امتیاز</p>
          <button className="mt-4 bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600">ثبت دیدگاه</button>
        </div>
      </div>

      {/* Comments Section */}
      <div className="flex-1">
        <div className="mb-4">
          <h2 className="text-2xl font-semibold mb-2 text-gray-400">نظرات کاربران</h2>
          <HighlightBar />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reviews.map((review, index) => (
            <CommentCard key={index} review={review} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductComments;
