
import React, { useState, useEffect } from "react";
import { Button, message, Spin, Pagination } from "antd"; // Added Pagination for pagination
import SubscriptionCard from "../../../Components/SubscriptionCard";
import DashboardModal from "../../../Components/DashboardModal";
import AddNewButton from "../../../Components/AddNewButton";
import { baseUrl, imageUrl } from "../../../constant/contant"; // Import the base URL for API requests and images
import dashProfile from "../../../assets/images/no-found.png"

const Subscriptions = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [data, setData] = useState([]); // State to hold sticker data
  const [loading, setLoading] = useState(true); // Loading state
  const [currentPage, setCurrentPage] = useState(1); // State to hold current page
  const [totalPages, setTotalPages] = useState(1); // State to hold total pages

  const showModal = (data) => {
    setIsModalOpen(true);
    setModalData(data);
  };

  // Fetch stickers from the API
  const fetchStickers = async (page = 1) => {
    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}/sticker/all?page=${page}`);
      const result = await response.json();
      //console.log(result, "result from sticker");
      if (result.success) {
        setData(result.data?.stickers); // Set the fetched sticker data
        setCurrentPage(result.data?.currentPage); // Set the current page
        setTotalPages(result.data?.totalPages); // Set the total pages
      } else {
        message.error(result.message || "Failed to fetch stickers.");
      }
    } catch (error) {
   //   console.error("Error fetching stickers:", error);
      message.error("Something went wrong while fetching stickers.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStickers(currentPage); // Fetch the stickers when the component mounts
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="space-y-[24px]">
      <AddNewButton text={"Add New Sticker"} />


     <div className="grid grid-cols-4 xl:grid-cols-5 gap-8">
  {data.map((item, index) => (
    <div key={index}> 
      <SubscriptionCard
        item={{
          ...item,
          imageSrc: item?.image?.publicFileURL
            ? `${imageUrl}${item.image.publicFileURL}` // Image URL if available
            : dashProfile // Fallback image if not available
        }}
        setModalData={showModal}
        fetchStickers={fetchStickers}
      />
    </div>
  ))}
</div>

      <div className="flex justify-center mt-4">
        <Pagination
          current={currentPage}
          total={totalPages * 10} // Assuming 10 items per page
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Subscriptions;