
import React, { useState } from "react";
import OTPInput from "react-otp-input";
import { Button, message } from "antd"; // Antd for toast message
import { useNavigate } from "react-router-dom";
import { RxArrowLeft } from "react-icons/rx";
import Cookies from "js-cookie"; // Import js-cookie to access token
import { baseUrl } from "../../constant/contant";

const VerifyEmail = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false); // To handle the loading state
  const navigate = useNavigate();

  const handleOTPSubmit = async () => {
    const token = Cookies.get("session"); // Retrieve the token from cookies

    if (!otp || otp.length !== 6) {
      message.error("Please enter a valid 6-digit OTP.");
      return;
    }

    if (!token) {
      message.error("No token found. Please try again.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}/user/verify-forget-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
        },
        body: JSON.stringify({ otp }), // Send the OTP in the request body
      });

      const result = await response.json();

      if (response.ok) {
        message.success("OTP verified successfully.");
        navigate("/auth/reset-password"); // Navigate to reset password page
      } else {
        message.error(result.message || "OTP verification failed. Please try again.");
      }
    } catch (error) {
      message.error("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[451px] bg-playground py-[64px] px-[44px] rounded-2xl space-y-[24px]">
      <div className="flex justify-center items-center gap-1">
        <button onClick={() => navigate("/auth/forgot-password")}>
          <RxArrowLeft size={23} />
        </button>
        <h5 className="text-2xl font-medium">Verify OTP</h5>
      </div>
      <p className="text-center text-[#464343]">
        Please enter the otp we have sent you in your email.
      </p>
      <div className="pb-[10px]">
        <OTPInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          inputStyle={{
            height: "57px",
            width: "44px",
            margin: "auto",
            background: "#E9F4F3",
            border: "1px solid #1D7151",
            marginRight: "10px",
            outline: "none",
            borderRadius: "8px",
            color: "#0445e5",
          }}
          renderSeparator={<span> </span>}
          renderInput={(props) => <input {...props} />}
        />
      </div>
      <div>
        <Button
          onClick={handleOTPSubmit}
          style={{
            backgroundColor: "#1D7151",
            size: "18px",
            height: "56px",
            color: "#fff",
          }}
          loading={loading} // Show loading indicator while API is being processed
          disabled={loading} // Disable button when loading
          htmlType="submit"
          className="w-full h-[56px] px-2 font-medium rounded-lg"
        >
          Verify Email
        </Button>
      </div>
    </div>
  );
};

export default VerifyEmail;

