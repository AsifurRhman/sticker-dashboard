
import { Button, Form, Input, message } from "antd";
import React, { useState } from "react";
import { PiCurrencyDollar } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import PageHeading from "../../../Components/PageHeading";
import { baseUrl } from "../../../constant/contant"; // Ensure you have the base URL set up
import Cookies from "js-cookie"; // For authentication
import toast from "react-hot-toast";

const AddSubscription = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Loading state
  const [file, setFile] = useState(null); // To store the selected file

  // Handle form submission
  const handleAddSubscription = async (values) => {
    const { name, price, description } = values;

    const formData = new FormData(); // Create FormData to handle the file upload
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    if (file) {
      formData.append("image", file); // Append the image file if selected
    }

    try {
      setLoading(true); // Start loading
      const token = Cookies.get("session"); // Assuming you store the session token in cookies
      if (!token) {
        navigate("/auth");
        return message.error("please logged in first")
   }
      const response = await fetch(`${baseUrl}/sticker/create`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Include auth token if necessary
        },
        body: formData, // Send FormData as the request body
      });

      const result = await response.json();
      if (result.success) {
        message.success("Sticker added successfully.");
        navigate("/stickers"); // Navigate back to the stickers list after success
      } else {
        message.error(result.message || "Failed to add sticker.");
      }
    } catch (error) {
      //  console.error("error---------", error);
      message.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false); // End loading
    }
  };

  // Handle file change for the image upload
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile); // Store the selected file in state
  };

  return (
    <div className="space-y-[24px]">
      <PageHeading title={"Add Stickers"} backPath={"/stickers"} />
      <Form
        labelCol={{ span: 22 }}
        wrapperCol={{ span: 40 }}
        layout="vertical"
        onFinish={handleAddSubscription} // Form submission handler
        autoComplete="off"
        requiredMark={false}
        className="min-h-[70vh] flex flex-col justify-between px-[34px] py-[14px]"
      >
        <div>
          <div className="grid grid-cols-2 gap-x-6 font-[cursive]">
            <Form.Item
              label={<span className="text-[18px] text-primary font-[cursive]">Sticker Name</span>}
              name={"name"}
              rules={[
                {
                  required: true,
                  message: "Please input sticker name!",
                },
              ]}
            >
              <Input
                placeholder="Sticker name"
                style={{
                  height: "56px",
                  background: "#E8F1EE",
                }}
                className="outline-none rounded-lg px-[16px] py-[12px] text-[#181414] mt-[8px] text-lg drop-shadow-md"
              />
            </Form.Item>
            <Form.Item
              label={<span className="text-[18px] text-primary font-[cursive]">Price</span>}
              name={"price"}
              rules={[
                {
                  required: true,
                  message: "Please input price!",
                },
              ]}
            >
              <Input
                prefix={<PiCurrencyDollar className="" size={18} />}
                placeholder="Sticker price"
                style={{
                  height: "56px",
                  background: "#E8F1EE",
                }}
                className="outline-none rounded-lg px-[16px] py-[12px] text-[#181414] mt-[8px] text-lg drop-shadow-md"
              />
            </Form.Item>
          </div>
          <Form.Item
            label={<span className="text-[18px] text-primary font-[cursive]">Description</span>}
            name={"description"}
            rules={[
              {
                required: true,
                message: "Please input description!",
              },
            ]}
          >
            <Input.TextArea
              placeholder="Description"
              style={{
                background: "#E8F1EE",
              }}
              rows={4}
              className="outline-none rounded-lg px-[16px] py-[12px] text-[#181414] mt-[8px] text-lg drop-shadow-md"
            />
          </Form.Item>
          <Form.Item 
          >
            {file && (
              <img
                src={URL.createObjectURL(file)}
                alt="Sticker Preview"
                style={{
                  maxWidth: "156px",
                  maxHeight: "164px",
                  marginTop: "8px",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
                className="drop-shadow-md"
              />
            )}
          </Form.Item>
          <Form.Item
            label={<span className="text-[18px] text-primary font-[cursive]">Upload Sticker <span className="text-sm ">(156 X 164 maximum)</span></span>}
            name={"image"}
            rules={[
              {
                required: true,
                message: "Please upload a sticker image!",
              },
            ]}
          >
            <Input
              type="file"
              onChange={handleFileChange} // Handle file selection
              style={{
                background: "#E8F1EE",
              }}
              className="outline-none rounded-lg px-[16px] py-[12px] text-[#181414] mt-[8px] text-lg drop-shadow-md"
            />
          </Form.Item>
        </div>
        <Button
          style={{
            backgroundColor: "#1D7151",
            size: "18px",
            height: "56px",
            color: "#ffff",
          }}
          size="large"
          htmlType="submit"
          loading={loading} // Show loading indicator while the form is submitting
          className="w-full h-[56px] px-2 font-medium rounded-lg "
        >
          Add Sticker
        </Button>
      </Form>
    </div>
  );
};

export default AddSubscription;

