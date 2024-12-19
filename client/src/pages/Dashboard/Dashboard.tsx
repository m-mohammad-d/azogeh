import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import Spinner from "../../components/Spinner";
import { useGetProductsQuery } from "../../services/ApiProduct";
import { useGetUsersCountQuery } from "../../services/UsersApi";
import moment from "moment-jalaali";
import { useState } from "react";
import { useTopSellingProductsQuery } from "../../services/OrderApi";

// // Data for daily product sales
// const dailyProductSales = [
//   { date: "1402/07/01", sales: 120 },
//   { date: "1402/07/02", sales: 150 },
//   { date: "1402/07/03", sales: 100 },
//   { date: "1402/07/04", sales: 200 },
//   { date: "1402/07/05", sales: 180 },
//   { date: "1402/07/06", sales: 220 },
//   { date: "1402/07/07", sales: 160 },
// ];

// Chart colors
const salesChartColors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40", "#E7E9ED"];
const ratingChartColors = ["#8E44AD", "#3498DB", "#E74C3C", "#1ABC9C", "#F1C40F", "#2ECC71", "#E67E22"];

function Dashboard() {
  const { data: products, isLoading } = useGetProductsQuery({});
  const limitTopProduct = 5;
  const { data: topSellingProduct, isLoading: isLoadingTopSellingProduct } = useTopSellingProductsQuery({
    limit: limitTopProduct,
  });
  const [period, setPeriod] = useState<"week" | "month" | "year">("week");
  const { data: usersCount, isLoading: isLoadingUser } = useGetUsersCountQuery({ period });

  const productsList = products?.data?.products.slice(0);
  const userCountList = usersCount?.data;
  const topSellingProductList = topSellingProduct?.data;

  const userCountListWithJalaliDates = userCountList?.map(item => ({
    ...item,
    date: moment(item.date).format("jYYYY/jMM/jDD"),
  }));

  const sortedProductsByRating = productsList?.sort((a, b) => b.rating - a.rating);

  if (isLoading || isLoadingUser || isLoadingTopSellingProduct) return <Spinner />;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">داشبورد</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="col-span-1">
          <h2 className="text-lg md:text-xl font-semibold mt-6 text-center">محصولات با بیشترین فروش</h2>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={topSellingProductList}
                dataKey="totalSold"
                nameKey="product[0].name"
                cx="50%"
                cy="50%"
                outerRadius="80%"
              >
                {topSellingProductList?.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={salesChartColors[index % salesChartColors.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "10px",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                }}
                itemStyle={{
                  color: "#333",
                  fontSize: "14px",
                }}
                labelStyle={{
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
              />
              <Legend
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{
                  marginTop: "10px",
                  textWrap: "wrap",
                  overflow: "hidden",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="col-span-1">
          <h2 className="text-lg md:text-xl font-bold mt-6 text-center text-blue-600">
            محصولات با بالاترین رضایت مشتریان
          </h2>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={sortedProductsByRating?.slice(0, 5)}
                dataKey="rating"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius="80%"
              >
                {sortedProductsByRating?.slice(0, 5).map((_, index) => {
                  return <Cell key={`cell-${index}`} fill={ratingChartColors[index % ratingChartColors.length]} />;
                })}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "10px",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                }}
                itemStyle={{
                  color: "#333",
                  fontSize: "14px",
                }}
                labelStyle={{
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
              />
              <Legend
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{
                  marginTop: "10px",
                  textWrap: "wrap",
                  overflow: "hidden",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Daily product sales line chart */}
        <div className="hidden lg:flex lg:gap-4 mb-6">
          <button
            className={`text-gray-300 hover:text-primary-400 ${
              period === "week" ? "font-bold border-b border-primary-700 text-primary-500" : ""
            }`}
            onClick={() => setPeriod("week")}
          >
            هفته
          </button>
          <button
            className={`text-gray-300 hover:text-primary-400 ${
              period === "month" ? "font-bold border-b border-primary-700 text-primary-500" : ""
            }`}
            onClick={() => setPeriod("month")}
          >
            ماه
          </button>
          <button
            className={`text-gray-300 hover:text-primary-400 ${
              period === "year" ? "font-bold border-b border-primary-700 text-primary-500" : ""
            }`}
            onClick={() => setPeriod("year")}
          >
            سال
          </button>
        </div>

        <div className="lg:hidden flex items-center gap-4 mb-6">
          <select
            value={period}
            onChange={e => setPeriod(e.target.value as "week" | "month" | "year")}
            className="w-full rounded-lg p-3 text-gray-700 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-500 transition duration-200"
          >
            <option value="week">هفته</option>
            <option value="month">ماه</option>
            <option value="year">سال</option>
          </select>
        </div>

        {/* <div className="col-span-1 md:col-span-2">
          <h2 className="text-lg md:text-xl font-semibold my-8">تعداد محصولات فروخته شده در هر روز</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dailyProductSales}>
              <XAxis dataKey="date" tick={{ dx: 20, dy: 10 }} />
              <YAxis tick={{ dx: -20, dy: -20 }} />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#FF7300" />
            </LineChart>
          </ResponsiveContainer>
        </div> */}

        {/* Daily user registrations line chart */}
        <div className="col-span-1 md:col-span-2">
          <h2 className="text-lg md:text-xl font-semibold my-8">تعداد کاربران ثبت نام کرده در هر روز</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={userCountListWithJalaliDates}>
              <XAxis dataKey="date" tick={{ dx: 20, dy: 10 }} />
              <YAxis tick={{ dx: -20, dy: -20 }} />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
