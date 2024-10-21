


import React from "react";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { RxArrowLeft } from "react-icons/rx";
import { toast } from "react-hot-toast"; // Assuming you're using react-hot-toast for notifications
import { baseUrl } from "../../constant/contant";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const { email } = values;

    try {
      const response = await fetch(`${baseUrl}/user/forget-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }), // Send email in the body
      });

      const result = await response.json();
      //console.log(result, "result");

      if (!response.ok || !result.success) {
        toast.error(result.message || "Failed to send OTP. Please try again.");
        return;
      }

      toast.success("OTP sent to your email. Please check!");
      navigate("/auth/verify-email");
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className=" w-[451px] bg-playground py-[64px] px-[44px] rounded-2xl space-y-[24px]">
      <div className="flex justify-center items-center gap-1">
        <button onClick={() => navigate("/auth/sign-in")}>
          <RxArrowLeft size={22} />
        </button>
        <h5 className="text-2xl font-medium">Forgot Password</h5>
      </div>
      <p className="text-center text-[#464343]">
        Please enter your email address to reset your password.
      </p>
      <Form
        name="basic"
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="w-full space-y-[24px]"
      >
        <Form.Item
          className="text-start"
          name="email"
          rules={[
            {
              type: "email",
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input
            placeholder="Email"
            name="email"
            style={{
              border: "1px solid #1D7151",
              height: "56px",
              background: "#E9F4F3",
              outline: "none",
              color: "#646262",
              padding: "16px 12px",
            }}
          />
        </Form.Item>
        <Form.Item>
          <Button
            style={{
              backgroundColor: "#1D7151",
              height: "56px",
              color: "#fff",
            }}
            htmlType="submit"
            className="w-full h-[56px] px-2 font-medium rounded-lg mt-[10px]"
          >
            Send OTP
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ForgotPassword;
