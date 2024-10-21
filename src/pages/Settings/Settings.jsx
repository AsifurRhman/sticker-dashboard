
import React, { useState } from "react";
import { Button, Form, Input, Modal } from "antd";
import { FaAngleRight } from "react-icons/fa6";
import { LiaArrowLeftSolid } from "react-icons/lia";
import { MdLockOutline, MdOutlineEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // For getting token
import toast, { Toaster } from "react-hot-toast"; // For showing toast messages
import { baseUrl } from "../../constant/contant";

const Settings = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleNavigate = (value) => {
    if (value === "change-password") {
      setModalTitle("Change Password");
      setIsModalOpen(true);
    } else {
      navigate(`/settings/${value}`);
    }
  };

  const handleChangePassword = async (values) => {
    try {
      // Retrieve token from cookies using js-cookie
      const token = Cookies.get("session");

      // Check if the token exists
      if (!token) {
        navigate("/auth");
        toast.error("please logged in first")
   }

      // Make the API call to your backend
      const response = await fetch(`${baseUrl}/user/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Send the token in the Authorization header
        },
        body: JSON.stringify({
          oldPassword: values.oldPassword,
          newPassword: values.newPassword,
          confirmPassword: values.reenterPassword,
        }),
      });

      // Check if the response is successful
      if (response.ok) {
        // Reset the form fields
        form.resetFields();

        // Close the modal
        setIsModalOpen(false);

        // Display success message
        toast.success("Password changed successfully!");
        
        return;
      }

      const errorData = await response.json();
      toast.error(errorData.message || "Error changing password");

    } catch (error) {
      // Handle any errors and show an error message
      toast.error(error.message);
    }
  };

  const settingsItem = [
    {
      title: "Personal Information",
      path: "personal-information",
    },
    {
      title: "Change Password",
      path: "change-password",
    },
    {
      title: "Terms & Conditions",
      path: "terms-conditions",
    },
    {
      title: "Privacy Policy",
      path: "privacy-policy",
    },
    {
      title: "About us",
      path: "about-us",
    },
  ];

  return (
    <div className="w-full pt-5 min-h-screen">
      <Toaster /> {/* This will display the toast messages */}
      {settingsItem.map((setting, index) => (
        <div
          key={index}
          className="h-[64px] bg-grayground hover:bg-[#0804e528] py-4 mb-4 px-6 rounded-lg flex items-center justify-between cursor-pointer transition-all"
          onClick={() => handleNavigate(setting.path)}
        >
          <h2>{setting.title}</h2>
          <FaAngleRight size={18} />
        </div>
      ))}

      <Modal
        title={null}
        open={isModalOpen}
        closeIcon={null}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        style={{
          maxWidth: 441,
        }}
        footer={[]}
      >
        {modalTitle === "Change Password" && (
          <div className="px-[24px] pb-[14px]">
            <div className="flex items-center gap-1.5 pt-[34px]">
              <button
                onClick={() => setIsModalOpen(false)}
                className="outline-none"
              >
                <LiaArrowLeftSolid size={26} />
              </button>
              <h6 className="text-2xl font-medium">{modalTitle}</h6>
            </div>
            <p className="text-[16px] my-[24px]">
              Your password must be 8-10 characters long.
            </p>
            <Form
              form={form}
              name="dependencies"
              autoComplete="off"
              requiredMark={false}
              layout="vertical"
              onFinish={handleChangePassword} // Connect the function here
            >
              <Form.Item
                label={<p className="pb-1">Enter old password</p>}
                name="oldPassword"
                rules={[
                  {
                    required: true,
                    message: "Please Input Your Old Password!",
                  },
                ]}
              >
                <Input.Password
                  prefix={<MdLockOutline className="mr-2" />}
                  style={{
                    border: "1px solid #1D7151",
                    backgroundColor: "#E8F1EE",
                  }}
                  className="p-4 rounded-lg h-[56px] placeholder:text-[#999999]"
                  placeholder="Enter old password"
                />
              </Form.Item>

              <Form.Item
                label={<p className="pb-1">Enter new password</p>}
                name="newPassword"
                rules={[
                  {
                    required: true,
                    message: "Please Input Your New Password!",
                  },
                ]}
              >
                <Input.Password
                  prefix={<MdLockOutline className="mr-2" />}
                  style={{
                    border: "1px solid #1D7151",
                    backgroundColor: "#E8F1EE",
                  }}
                  className="rounded-lg h-[56px] placeholder:text-[#999999]"
                  placeholder="Set new password"
                />
              </Form.Item>

              <Form.Item
                label={<p className="pb-1">Re-enter new password</p>}
                name="reenterPassword"
                dependencies={["newPassword"]}
                rules={[
                  {
                    required: true,
                    message: "Please Input Your New Password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("newPassword") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "The new password that you entered does not match!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  prefix={<MdLockOutline className="mr-2" />}
                  style={{
                    border: "1px solid #1D7151",
                    backgroundColor: "#E8F1EE",
                  }}
                  className="p-4 rounded-lg h-[56px] placeholder:text-[#999999]"
                  placeholder="Re-enter new password"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  style={{
                    backgroundColor: "#1D7151",
                    color: "#fff",
                  }}
                  htmlType="submit"
                  className="w-full h-[56px] text-[18px] font-medium"
                >
                  Change Password
                </Button>
              </Form.Item>
            </Form>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Settings;


