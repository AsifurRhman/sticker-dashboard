

import { Button, Dropdown, message } from "antd";
import { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa6";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast"; // Import toast for error handling
import { baseUrl } from "../constant/contant";
import { useNavigate } from "react-router-dom";

const DashboardChart = () => {
  const [cartYear, setCartYear] = useState("Select Year");
  const [chartData, setChartData] = useState([]);
  const navigate = useNavigate();
//console.log(chartData,"chartData")
  const handleMenuClick = (year) => {
    setCartYear(year);
    fetchEarnings(year);
  };

  const fetchEarnings = async (year) => {
    const token = Cookies.get("session");
    if (!token) {
      navigate("/auth");
      return message.error("please logged in first")
 }

    try {
      const response = await fetch(`${baseUrl}/user/earnings?year=${year}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Send Bearer token
        },
      });

      if (!response.ok) {
        toast.error("Failed to fetch earnings data");
        return;
      }

      const result = await response.json();
     // console.log(result.data.earnings ,"result from chart")
      setChartData(result.data.earnings.earnings );
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  useEffect(() => {
    // Fetch initial data for the default year or handle initial load
    fetchEarnings("2024");
  }, []);

  const items = [
    { label: <p className="w-full" onClick={() => handleMenuClick("2024")}>2024</p>, key: 1 },
    { label: <p className="w-full" onClick={() => handleMenuClick("2023")}>2023</p>, key: 2 },
    { label: <p className="w-full" onClick={() => handleMenuClick("2022")}>2022</p>, key: 3 },
    { label: <p className="w-full" onClick={() => handleMenuClick("2021")}>2021</p>, key: 4 },
    { label: <p className="w-full" onClick={() => handleMenuClick("2020")}>2020</p>, key: 5 },
    { label: <p className="w-full" onClick={() => handleMenuClick("2019")}>2019</p>, key: 6 },
    { label: <p className="w-full" onClick={() => handleMenuClick("2018")}>2018</p>, key: 7 },
    { label: <p className="w-full" onClick={() => handleMenuClick("2017")}>2017</p>, key: 8 },
  ];

  return (
    <div className="bg-grayground rounded-lg px-[24px] py-[15px]">
      <div className="flex justify-between items-center">
        <h4 className="text-[20px] font-medium">Earnings</h4>
        <Dropdown menu={{ items }} trigger={["click"]}>
          <Button type="text" className="space-x-2 px-2">
            <span className="text-lg">{cartYear}</span>
            <FaChevronDown />
          </Button>
        </Dropdown>
      </div>
      <BarChart
        width={1440}
        height={280}
        data={chartData}
        margin={{ top: 40, left: 5 }}
      >
        <CartesianGrid stroke="#ccc" strokeOpacity={1} strokeWidth={1} vertical={false} />
        <Tooltip />
        <XAxis
          dataKey="name"
          tick={{ stroke: "#464343", strokeWidth: 0.5 }}
          style={{ fontWeight: "350", color: "#464343" }}
        />
        <YAxis
          tick={{ stroke: "#464343", strokeWidth: 0.5 }}
          tickFormatter={(_value) => `$${_value}k`}
          tickCount={12}
          style={{ fontWeight: "350", color: "#464343" }}
        />
        <Bar dataKey="earn" fill="#1D7151" barSize={26} />
      </BarChart>
    </div>
  );
};

export default DashboardChart;
