import React from "react";

const Pagination: React.FC = () => {
  return (
    <div className="flex justify-center mt-6">
      <button className="px-4 py-2 mx-1 bg-gray-200 text-gray-700 rounded">1</button>
      <button className="px-4 py-2 mx-1 bg-gray-200 text-gray-700 rounded">2</button>
      <button className="px-4 py-2 mx-1 bg-gray-200 text-gray-700 rounded">3</button>
    </div>
  );
};

export default Pagination;
