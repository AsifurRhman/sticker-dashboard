


import React from "react";
import { Card, Button, Image, message, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { imageUrl, baseUrl } from "../constant/contant"; // Assuming baseUrl is set up correctly
import Cookies from "js-cookie"; // For authentication

const SubscriptionCard = ({ item, setModalData, fetchStickers }) => {
  const navigate = useNavigate();

  // Delete function
  const deleteSticker = async (stickerId) => {
    try {
      const token = Cookies.get("session"); // Assuming session token is stored in cookies
      if (!token) {
        navigate("/auth");
        return message.error("please logged in first")
      }
      const response = await fetch(`${baseUrl}/sticker/delete?id=${stickerId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token in headers for authentication
        },
      });

      const result = await response.json();
      if (result.success) {
        message.success("Sticker deleted successfully.");
        fetchStickers(); // Call the parent function to refresh the list of stickers
      } else {
        message.error(result.message || "Failed to delete sticker.");
      }
    } catch (error) {
      console.error("Error deleting sticker:", error);
      message.error("Something went wrong. Please try again.");
    }
  };

  // Confirm before deleting
  const confirmDelete = () => {
    Modal.confirm({
      title: `Are you sure you want to delete ${item.name}?`,

      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: () => deleteSticker(item._id), // Call the deleteSticker function if confirmed
    });
  };

  return (
    <div>
      
      <Card
        className="rounded-2xl shadow border-none bg-playground py-[8px]"
        bordered={false}
        bodyStyle={{ paddingTop: 0, paddingBottom: 20 }}
      >
        <div className="text-center text-white pt-6 pb-2 space-y-3">
          {/* Fixed image size */}
          <Image
            src={item.image?.publicFileURL ? `${imageUrl}${item.image.publicFileURL}` : "default-image.png"}
            preview={false}
            alt={item.name}
            style={{
              width: "156px",
              height: "164px",
              objectFit: "cover",
              // borderRadius: "8px", 
            }}
          />

          <p className="text-primary font-bold text-2xl font-[cursive]">
            {item.name}
          </p>

          {/* Buttons for editing and deleting */}
          <div className="flex gap-4 px-5 pt-4">


            <button
              onClick={confirmDelete} // Trigger delete confirmation
            
                 className="text-primary rounded-xl w-full p-2 font-[cursive] border border-[#1D7151] bg-white"
              type="default"
              size="middle"
            >
              Delete
            </button>

            <button
              onClick={() => navigate(`edit/${item._id}`)} 
              className="text-white  rounded-xl w-full p-2 font-[cursive] bg-primary border border-[#1D7151]  "
              type="default"
              size="middle"
             
            >
              Edit
            </button>


          </div>
        </div>
      </Card>
    </div>
  );
};

export default SubscriptionCard;

