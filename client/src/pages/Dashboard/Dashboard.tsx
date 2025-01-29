import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import Spinner from "../../components/Spinner";
import { useGetProductsQuery } from "../../services/ApiProduct";
import { useGetAllUserQuery, useGetUsersCountQuery } from "../../services/UsersApi";
import moment from "moment-jalaali";
import { useState } from "react";
import CountUp from "react-countup";
import { useTopSellingProductsQuery } from "../../services/OrderApi";
import { FaChartSimple } from "react-icons/fa6";
import { PiUsersThree } from "react-icons/pi";

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
  const { data: AllUsers, isLoading: isLoadingUsers } = useGetAllUserQuery({});
  const viewCount = 8543;
  const productsList = products?.data?.products.slice(0);
  const userCountList = usersCount?.data;
  const topSellingProductList = topSellingProduct?.data;

  const userCountListWithJalaliDates = userCountList?.map((item) => ({
    ...item,
    date: moment(item.date).format("jYYYY/jMM/jDD"),
  }));

  const sortedProductsByRating = productsList?.sort((a, b) => b.rating - a.rating);

  if (isLoading || isLoadingUser || isLoadingTopSellingProduct || isLoadingUsers) return <Spinner />;

  return (
    <div className="p-4">
      <h1 className="mb-4 text-center text-2xl font-bold">داشبورد</h1>

      <div className="mx-auto mb-6 grid w-full grid-cols-1 gap-6 md:grid-cols-2">
        <div className="col-span-1">
          <div className="flex h-32 w-full max-w-2xl items-center justify-between rounded-lg bg-green-500 p-4 shadow-md">
            <div className="flex flex-col gap-4 text-white">
              <h2 className="text-lg font-semibold">تعداد بازدید</h2>
              <p className="text-center text-3xl font-bold">
                <CountUp end={viewCount} duration={5} />
              </p>
            </div>
            <div>
              <FaChartSimple size={40} className="text-white" />
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="flex h-32 w-full max-w-2xl items-center justify-between rounded-lg bg-yellow-500 p-4 shadow-md">
            <div className="flex flex-col gap-4 text-white">
              <h2 className="text-lg font-semibold">تعداد کل کاربران</h2>
              <p className="text-center text-3xl font-bold">
                <CountUp end={AllUsers?.data.users.length as number} duration={5} />
              </p>
            </div>
            <div>
              <PiUsersThree size={40} className="text-white" />
            </div>
          </div>
        </div>
      </div>
      <div>
        <div>
          <h2 className="mt-6 text-lg font-semibold md:text-xl">محصولات با بیشترین فروش</h2>
          <div className="flex w-full flex-col-reverse items-center justify-between gap-6 md:flex-row">
            <div className="flex flex-col gap-2">
              {topSellingProductList?.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div
                    className="h-4 w-4"
                    style={{
                      backgroundColor: salesChartColors[index % salesChartColors.length],
                    }}
                  ></div>
                  <span className="text-sm">{item.product[0]?.name}</span>
                </div>
              ))}
            </div>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie data={topSellingProductList} dataKey="totalSold" nameKey="product[0].name" cx="50%" cy="50%" outerRadius="80%">
                  {topSellingProductList?.map((_, index) => <Cell key={`cell-${index}`} fill={salesChartColors[index % salesChartColors.length]} />)}
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
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex-1">
            <h2 className="mt-6 text-lg font-bold md:text-xl">محصولات با بالاترین رضایت مشتریان</h2>
            <div className="flex w-full flex-col-reverse items-center justify-between gap-6 md:flex-row">
              <div className="flex flex-col gap-2">
                {sortedProductsByRating?.slice(0, 5).map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div
                      className="h-4 w-4"
                      style={{
                        backgroundColor: ratingChartColors[index % ratingChartColors.length],
                      }}
                    ></div>
                    <span className="text-sm">{item.name}</span>
                  </div>
                ))}
              </div>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie data={sortedProductsByRating?.slice(0, 5)} dataKey="rating" nameKey="name" cx="50%" cy="50%" outerRadius="80%">
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
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="mb-6 hidden lg:flex lg:gap-4">
          <button className={`hover:text-primary-400 text-neutral-gray-8 ${period === "week" ? "border-b border-primary-shade2 font-bold text-primary" : ""}`} onClick={() => setPeriod("week")}>
            هفته
          </button>
          <button className={`hover:text-primary-400 text-neutral-gray-8 ${period === "month" ? "border-b border-primary-shade2 font-bold text-primary" : ""}`} onClick={() => setPeriod("month")}>
            ماه
          </button>
          <button className={`hover:text-primary-400 text-neutral-gray-8 ${period === "year" ? "border-b border-primary-shade2 font-bold text-primary" : ""}`} onClick={() => setPeriod("year")}>
            سال
          </button>
        </div>

        <div className="my-6 flex items-center gap-4 lg:hidden">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value as "week" | "month" | "year")}
            className="w-full rounded-lg border border-gray-300 p-3 text-gray-700 transition duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary-tint5"
          >
            <option value="week">هفته</option>
            <option value="month">ماه</option>
            <option value="year">سال</option>
          </select>
        </div>

        <div className="col-span-1 md:col-span-2">
          <h2 className="my-8 text-lg font-semibold md:text-xl">تعداد کاربران ثبت نام کرده در هر روز</h2>
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
