import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const AllocationChart = () => {
  const data = [
    { name: "BTC", allocation: 30 },
    { name: "ETH", allocation: 20 },
    { name: "DOGE", allocation: 10 },
    { name: "SOL", allocation: 15 },
    { name: "BNB", allocation: 25 },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="allocation" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default AllocationChart;
