import { useState } from "react";
import { useGetProductsQuery } from "../../services/ApiProduct";

function NotificationPage() {
  const [activeTab, setActiveTab] = useState<"nonUrgent" | "urgent">("nonUrgent");
  const { data: productList, isLoading } = useGetProductsQuery();

  if (isLoading) {
    return <p className="text-center text-lg">در حال بارگذاری...</p>;
  }

  const products = productList?.data?.products || [];

  const lowStockProducts = products.filter(product => product.countInStock > 0 && product.countInStock <= 30);
  const outOfStockProducts = products.filter(product => product.countInStock === 0);

  return (
    <div className="p-6">
      <div className="flex gap-5 mb-6 border-b-2 border-gray-400 pb-2">
        <div
          className={`cursor-pointer pb-2 font-bold text-lg ${
            activeTab === "urgent" ? "text-blue-500 border-b-4 border-blue-500" : "text-gray-600 hover:text-gray-900"
          }`}
          onClick={() => setActiveTab("urgent")}
        >
          ضروری
        </div>
        <div
          className={`cursor-pointer pb-2 font-bold text-lg ${
            activeTab === "nonUrgent" ? "text-blue-500 border-b-4 border-blue-500" : "text-gray-600 hover:text-gray-900"
          }`}
          onClick={() => setActiveTab("nonUrgent")}
        >
          غیر ضروری
        </div>
      </div>

      <div className="space-y-4">
        {activeTab === "nonUrgent" && (
          <>
            {lowStockProducts.length > 0 ? (
              lowStockProducts.map(product => (
                <div key={product.id} className="relative p-4 rounded-lg shadow-md bg-green-100">
                  <p className="text-lg">
                    موجودی محصول <strong>{product.name}</strong> رو به اتمام است:{" "}
                    <strong>{product.countInStock}</strong>
                  </p>
                  <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-3 h-3 bg-black rounded-full shadow-xl"></div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">همه محصولات موجودی کافی دارند.</p>
            )}
          </>
        )}

        {activeTab === "urgent" && (
          <>
            {outOfStockProducts.length > 0 ? (
              outOfStockProducts.map(product => (
                <div key={product.id} className="relative p-4 rounded-lg shadow-md bg-red-100">
                  <p className="text-lg">
                    محصول <strong>{product.name}</strong> موجودی ندارد.
                  </p>
                  <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-3 h-3 bg-black rounded-full shadow-xl"></div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">هیچ محصولی تمام نشده است.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default NotificationPage;
