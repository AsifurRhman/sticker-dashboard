

import { Button, Checkbox, Input, message } from "antd";
import { IconLock } from "@tabler/icons-react";
import Form from "antd/es/form/Form";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // For managing cookies
import toast, { Toaster } from 'react-hot-toast';
import { baseUrl, VITE_NODE_ENV_Prod } from "../../constant/contant";

const SignIn = () => {
  const [loading, setLoading] = useState(false); // Manage loading state
  const navigate = useNavigate(); // React Router for navigation

  // const onSubmit = async (data) => {
  //   setLoading(true); // Set loading state while request is being processed
  //   // console.log(data)
   
  //   const sendData = { email: data.username, password: data.password }
  //   // console.log(sendData,"sendData")
  //   try {
  //     // Make API call for login
  //     const response = await fetch(
  //       `${baseUrl}/user/login`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(sendData),
  //       }
  //     );
  //     const result = await response.json();
  //     console.log(result.data,"result--------------")
  //     if (!result.success) {
   
  //      //  toast.error(result.message);
  //       setLoading(false);
  //       return;
  //     }

  //     // Set token in cookie
  //     Cookies.set("session", result?.data?.token, {
  //       expires: 7, // Set session expiry to 7 days
  //       sameSite: "strict",
  //       secure: true, // Use secure cookie in production
  //     });
      

  //     // Create userInfo object
  //     const userInfo = {
  //       id: result?.data?.user?.id,
  //       name: result?.data?.user?.name,
  //       email: result?.data?.user?.email,
  //       role: result?.data?.user?.role, // Include the user role in userInfo
  //     };
  //     // Store userInfo in localStorage
  //     localStorage.setItem("userInfo", JSON.stringify(userInfo));

  //     // Check if the user has admin role
  //     if (userInfo.role === "admin") {
  //       toast.success(result.message);
  //       Cookies.set("role", "admin", {
  //         expires: 1 / 6, // 10-minute expiry for role
  //         sameSite: "strict",
  //         secure: true,
  //       });
  //       navigate("/"); // Redirect to admin dashboard
  //     } else {
  //       // Show an error if a non-admin tries to access the admin dashboard
  //       toast.error("Only admin users can access the admin dashboard.");
  //     }
  //   } catch (error) {
  //     console.error("Login error:", error);
  //     toast.error("Something went wrong");
  //   } finally {
  //     setLoading(false); // Reset loading state
  //   }
  // };
  const onSubmit = async (data) => {
    setLoading(true); // Set loading state while request is being processed
    const sendData = { email: data.username, password: data.password };
  
    try {
      // Make API call for login
      const response = await fetch(`${baseUrl}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sendData),
        credentials: "include", // Include cookies in the request
      });
  
      const result = await response.json();
 // console.log(result,"result--------------")
      if (!result.success) {
        setLoading(false);
        message.error(result.message)
        return;
      }
  
      // Set token in cookie
      Cookies.set("session", result?.data?.token, {
        expires: 7, // Set session expiry to 7 days
        sameSite: "lax", // Or "none" depending on your setup
      //  secure: VITE_NODE_ENV_Prod === "production", // Only secure in production
      });
  
      // Create userInfo object
      const userInfo = {
        id: result?.data?.user?.id,
        name: result?.data?.user?.name,
        email: result?.data?.user?.email,
        role: result?.data?.user?.role, // Include the user role in userInfo
      };
  
      // Store userInfo in localStorage
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
  
      // Check if the user has admin role
      if (userInfo.role === "admin") {
        toast.success(result.message);
        Cookies.set("role", "admin", {
          expires: 1 / 6, // 10-minute expiry for role
          sameSite: "lax", // or "none"
         // secure: VITE_NODE_ENV_Prod === "production",
        });
        navigate("/"); // Redirect to admin dashboard
      } else {
        toast.error("Only admin  can access the  dashboard.");
      }
    } catch (error) {
      console.error("Login error:", error);
      // toast.error("Something went wrong");
    } finally {
      setLoading(false); // Reset loading state
    }
  };
  
  return (
    <div className="bg-playground w-[451px] py-[64px] px-[44px] rounded-[16px]">
      <div className="pb-[30px]">
        <h1 className="text-[24px] text-center font-medium">Sign In</h1>
      </div>
      <Form
        name="normal_login"
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onSubmit}
        className="space-y-[24px]"
      >
        <Form.Item
          className="text-start"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input
            placeholder="Email"
            style={{
              border: "1px solid #1D7151",
              height: "56px",
              background: "#E8F1EE",
              color: "#646262",
              padding: "16px 12px",
              outline: "none",
            }}
          />
        </Form.Item>

        <Form.Item
          className="text-start pt-2"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password
            placeholder="Password"
            style={{
              border: "1px solid #1D7151",
              height: "56px",
              background: "#E8F1EE",
              outline: "none",
              color: "#646262",
              padding: "16px 12px",
            }}
          />
        </Form.Item>

        <div className="flex justify-between items-center">
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox className="text-base font-medium text-primary">
              Remember me
            </Checkbox>
          </Form.Item>
          <Button
            onClick={() => navigate("/auth/forgot-password")}
            type="link"
            className="text-base font-medium hover:text text-primary pb-5"
          >
            Forget password?
          </Button>
        </div>

        <Form.Item>
        <Button
  style={{
    backgroundColor: "#1D7151",
    size: "18px",
    height: "56px",
    color: "#fff",
  }}
  htmlType="submit"
  loading={loading} // Disable button when loading
  className="w-full h-[56px] px-2 font-medium rounded-lg"
>
  {loading ? (
    <div
      className="inline-block w-5 h-5 border-4 border-dashed rounded-full animate-spin"
      style={{
        borderColor: "#1D7151 transparent transparent transparent",
      }}
    ></div>
  ) : (
    "Sign In"
  )}
</Button>

        </Form.Item>
      </Form>
    
    </div>
  );
};

export default SignIn;


