
import React from "react";
import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { RxArrowLeft } from "react-icons/rx";
import Cookies from "js-cookie"; // For managing cookies
import { baseUrl } from "../../constant/contant";
const ResetPassword = () => {
  const navigate = useNavigate();

  // Function to handle form submission
  const onFinish = async (values) => {

  const token = Cookies.get("session");

    try {
      const response = await fetch(`${baseUrl}/user/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          password: values.password,
          confirmPassword: values.rePassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        message.success("Password reset successfully!");
        navigate("/auth"); // Redirect to login page after success
      } else {
        message.error(data.message || "Password reset failed!");
      }
    } catch (error) {
      message.error("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="w-[451px] bg-playground py-[64px] px-[44px] rounded-2xl space-y-6">
      <div className="flex justify-center items-center gap-1">
        <button onClick={() => navigate("/auth/verify-email")}>
          <RxArrowLeft size={23} />
        </button>
        <h5 className="text-2xl font-medium">Reset Password</h5>
      </div>
      <p className="text-center text-[#464343]">
        Your password must be 8-10 characters long.
      </p>
      <Form
        name="basic"
        layout="vertical"
        className="w-full space-y-[24px]"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          className="text-start"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          name="password"
        >
          <Input.Password
            style={{
              border: "1px solid #1D7151",
              height: "56px",
              background: "#E9F4F3",
              outline: "none",
              color: "#646262",
              padding: "16px 12px",
            }}
            placeholder="Set your password"
          />
        </Form.Item>
        <Form.Item
          className="text-start pt-2"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          name="rePassword"
        >
          <Input.Password
            style={{
              border: "1px solid #1D7151",
              height: "56px",
              background: "#E9F4F3",
              outline: "none",
              color: "#646262",
              padding: "16px 12px",
            }}
            placeholder="Re-enter your password"
          />
        </Form.Item>
        <Form.Item>
          <Button
            style={{
              backgroundColor: "#1D7151",
              size: "18px",
              height: "56px",
              color: "#ffff",
            }}
            htmlType="submit"
            className="w-full h-[56px] px-2 font-medium rounded-lg "
          >
            Reset Password
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ResetPassword;
