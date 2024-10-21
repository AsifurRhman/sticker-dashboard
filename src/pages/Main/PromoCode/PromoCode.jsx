
import React, { useEffect, useState } from "react";
import { Button, ConfigProvider, DatePicker, Form, Input, Table } from "antd";
import { FiAlertCircle } from "react-icons/fi";
import DashboardModal from "../../../Components/DashboardModal";
import { IoSearch } from "react-icons/io5";
import { MdOutlineDeleteForever } from "react-icons/md";
import { baseUrl } from "../../../constant/contant";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const Subscribers = () => {
  const [promoCodes, setPromoCodes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm(); // Form instance for resetting fields

  // Function to fetch promo codes from API
  const fetchPromoCodes = async () => {
    setLoading(true);
    try {
      const token = Cookies.get("session");
      const response = await fetch(`${baseUrl}/promo-code`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      if (result.success) {
        setPromoCodes(result.data || []);
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error("Failed to fetch promo codes", error);
    }
    setLoading(false);
  };

  // Fetch promo codes when the component mounts
  useEffect(() => {
    fetchPromoCodes();
  }, []);

  const handleDeletePromo = async (id) => {
    try {
      const token = Cookies.get("session"); // Retrieve the token from cookies
      const response = await fetch(`${baseUrl}/promo-code?id=${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      if (result.success) {
        toast.success("Promo code deleted");
        fetchPromoCodes(); // Re-fetch promo codes after deletion
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Failed to delete promo code", error);
    }
  };

  const handleCreatePromo = async (values) => {
    try {
      const token = Cookies.get("session"); // Retrieve the token from cookies
      const response = await fetch(`${baseUrl}/promo-code/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Add the token to the Authorization header
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();
      if (result.success) {
        toast.success("New promo code created");
        fetchPromoCodes(); // Re-fetch promo codes after creation
        form.resetFields(); // Clear the input field after successful submission
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Failed to create promo code", error);
    }
  };

  const columns = [
    {
      title: "#SI",
      dataIndex: "serial",
      key: "serial",
      render: (text, record, index) => <span>{index + 1}</span>,
    },
    {
      title: "Promo Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span style={{ color: status === "new" ? "green" : "red" }}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      ),
    },
    {
      title: "Start Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) =>
        new Date(text).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
    },
    
    {
      title: "Action",
      key: "action",
      render: (data) => (
        <Button
          onClick={() => handleDeletePromo(data._id)}
          type="text"
          shape="circle"
          className="px-0 py-0 text-primary"
        >
          <MdOutlineDeleteForever size={22} color="red" />
        </Button>
      ),
    },
  ];

  return (
    <div className="bg-grayground rounded-lg py-[16px]">
      <Form
        form={form} // Use the form instance for resetting
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        layout="vertical"
        onFinish={handleCreatePromo}
        requiredMark={false}
        className="w-[70%] mx-auto flex flex-col"
      >
        <Form.Item
          label={<span className="text-[18px] text-primary font-[cursive]">Promo Code</span>}
          name={"code"}
          rules={[{ required: true, message: "Please input Promo Code!" }]}
        >
          <Input
            placeholder="Promo Code"
            style={{
              height: "56px",
              background: "#E8F1EE",
            }}
            className="outline-none rounded-lg px-[16px] py-[12px] text-[#181414] mt-[8px] text-lg drop-shadow-md"
          />
        </Form.Item>
        <Button
          style={{
            backgroundColor: "#1D7151",
            size: "18px",
            height: "56px",
            color: "#ffff",
          }}
          size="large"
          htmlType="submit"
          className="mt-[20px]"
        >
          Create Promo Code
        </Button>
      </Form>

      <div className="bg-grayground w-[70%] mx-auto mt-6">
        <Table
          columns={columns}
          dataSource={promoCodes}
          loading={loading}
          pagination={false}
        />
      </div>
    </div>
  );
};

export default Subscribers;
