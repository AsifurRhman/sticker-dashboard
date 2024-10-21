import React, { useEffect, useState } from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import { baseUrl } from "../../../constant/contant";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { message, Pagination } from "antd";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalNotifications, setTotalNotifications] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const navigate = useNavigate();

  // Fetch notifications from the API
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = Cookies.get("session");
        if (!token) {
          navigate("/auth");
          return message.error("Please log in first");
        }

        const response = await fetch(`${baseUrl}/notification/my-notification?page=${currentPage}&limit=${pageSize}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setNotifications(data.data.notifications);
          setTotalNotifications(data.data.totalNotifications);
        } else {
          setError(data.message || "Failed to fetch notifications");
        }
      } catch (error) {
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [currentPage, pageSize, navigate]);

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-primary"></div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-grayground min-h-[82vh] rounded-lg">
      <div className="px-[32px] py-[32px] border-b border-[#b7b6b6c9]">
        <h1 className="text-[24px] text-primary font-medium">Notifications</h1>
      </div>
      <div className="py-[24px] space-y-[12px]">
        {notifications.length > 0 ? (
          <>
            {notifications.map((notification) => (
              <div
                key={notification._id}
                className={`flex items-center gap-4 px-[24px] py-[8px] cursor-pointer border-2 rounded-md ${
                  notification.read ? "bg-primary" : "bg-white"
                }`}
              >
                <IoIosNotificationsOutline
                  style={{ cursor: "pointer" }}
                  className={`text-primary bg-playground w-[40px] h-[40px] rounded-lg p-2 shadow-sm transition-all border-2 border-primary`}
                />
                <div className="space-y-[8px]">
                  <h6
                    className={`font-semibold ${
                      notification.read ? "text-white" : "text-[#181414]"
                    }`}
                  >
                    {notification.msg}
                  </h6>
                  <small
                    className={`text-[12px] ${
                      notification.read ? "text-white" : "text-lightgreen"
                    }`}
                  >
                    {new Date(notification.createdAt).toLocaleString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      hour12: true,
                    })}
                  </small>
                </div>
              </div>
            ))}
            <div className="flex justify-center mt-4">
              <Pagination
                current={currentPage}
                total={totalNotifications}
                pageSize={pageSize}
                onChange={handlePageChange}
                showSizeChanger
                showQuickJumper
                showTotal={(total, range) =>
                  `${range[0]}-${range[1]} of ${total} items`
                }
              />
            </div>
          </>
        ) : (
          <p>No notifications available.</p>
        )}
      </div>
    </div>
  );
};

export default Notifications;