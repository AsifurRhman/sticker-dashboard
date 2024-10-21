
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import DashboardChart from "../../../Components/DashboardCahrt";
import DashboardHomeTable from "../../../Components/DashboardHomeTable";
import { toast } from "react-hot-toast"; // Import toast for error handling
import { baseUrl } from "../../../constant/contant";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

const DashboardHome = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalEarnings: 0,
    totalStickers: 0,
  });
 
  const navigate = useNavigate();
  // Fetch dashboard stats
  useEffect(() => {
    const fetchDashboardStats = async () => {
      const token = Cookies.get("session");
    //  console.log(token,"token")
    if (!token) {
      navigate("/auth");
      return message.error("please logged in first")
 }
      try {
        const response = await fetch(`${baseUrl}/user/dashboard-stats`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Send Bearer token
          },
        });

        if (!response.ok) {
          toast.error("Failed to fetch dashboard stats");
        }

        const result = await response.json();
       // console.log(result);
        
        setStats({
          totalUsers: result.data?.totalUsers ,
          totalEarnings: result.data?.totalEarnings,
          totalStickers: result.data?.totalStickers,
        });
      } catch (error) {
        toast.error(error.message || "Something went wrong");
      }
    };

    fetchDashboardStats();
  }, []);
  // console.log(process.env.REACT_APP_PUBLIC_BASE_URL)

  return (
    <div className="space-y-[24px]">
      <div className="grid grid-cols-12 gap-x-[22px]">
        <div className="col-span-4 bg-grayground px-[24px] py-[16px] rounded-2xl space-y-3">
          <h3 className="text-[20px]">{"Total Earnings"}</h3>
          <h3 className="text-[30px] font-medium text-primary">
            $ {`${stats?.totalEarnings || 0} `}K
          </h3>
        </div>
        <div className="col-span-4 bg-grayground px-[24px] py-[16px] rounded-2xl space-y-3">
          <h3 className="text-[20px]">{"Total Users"}</h3>
          <h3 className="text-[30px] font-medium text-primary">{stats?.totalUsers || 0}</h3>
        </div>
        <div className="col-span-4 bg-grayground px-[24px] py-[16px] rounded-2xl space-y-3">
          <h3 className="text-[20px]">{"Total Stickers"}</h3>
          <h3 className="text-[30px] font-medium text-primary">{stats?.totalStickers || 0}</h3>
        </div>
      </div>
      <DashboardChart />
      <DashboardHomeTable />
    </div>
  );
};

export default DashboardHome;
