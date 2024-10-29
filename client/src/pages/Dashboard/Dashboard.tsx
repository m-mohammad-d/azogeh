import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const salesData = [
  { name: "محصول 1", sales: 400 },
  { name: "محصول 2", sales: 300 },
  { name: "محصول 3", sales: 300 },
  { name: "محصول 4", sales: 200 },
  { name: "محصول 5", sales: 100 },
];

const satisfactionData = [
  { name: "محصول 11", satisfaction: 4.9 },
  { name: "محصول 12", satisfaction: 4.7 },
  { name: "محصول 13", satisfaction: 4.9 },
  { name: "محصول 14", satisfaction: 4.6 },
  { name: "محصول 15", satisfaction: 4.1 },
];

const topSatisfactionData = satisfactionData.sort((a, b) => b.satisfaction - a.satisfaction).slice(0, 5);

const dailySalesData = [
  { date: "1402/07/01", sales: 120 },
  { date: "1402/07/02", sales: 150 },
  { date: "1402/07/03", sales: 100 },
  { date: "1402/07/04", sales: 200 },
  { date: "1402/07/05", sales: 180 },
  { date: "1402/07/06", sales: 220 },
  { date: "1402/07/07", sales: 160 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28EEB"];

function Dashboard() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">داشبورد</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="col-span-1">
          <h2 className="text-lg md:text-xl font-semibold mt-6 text-center">محصولات با بیشترین فروش</h2> {/* Adjusted font size */}
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={salesData} dataKey="sales" nameKey="name" cx="50%" cy="50%" outerRadius="80%">
                {salesData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="col-span-1">
          <h2 className="text-lg md:text-xl font-semibold mt-6 text-center">محصولات با بالاترین رضایت مشتریان</h2>{" "}
          {/* Adjusted font size */}
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={topSatisfactionData} dataKey="satisfaction" nameKey="name" cx="50%" cy="50%" outerRadius="80%">
                {topSatisfactionData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="col-span-1 md:col-span-2">
          <h2 className="text-lg md:text-xl font-semibold my-8">تعداد محصولات فروخته شده در هر روز</h2>{" "}
          {/* Adjusted font size */}
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dailySalesData}>
              <XAxis dataKey="date" tick={{ dx: 20, dy: 10 }} />
              <YAxis tick={{ dx: -20, dy: -20 }} />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#FF7300" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;