

import React, { useState, useEffect, useContext } from "react";
import { Button, Form, Input, Upload, message } from "antd";
import { PiCameraPlus } from "react-icons/pi";
import { useNavigate} from "react-router-dom";
import PhoneCountryInput from "../../Components/PhoneCountryInput";
import PageHeading from "../../Components/PageHeading";
import Cookies from "js-cookie";
import { baseUrl, imageUrl } from "../../constant/contant";
import defaultImage from '../../assets/images/no-found.png';
import { RefetchContext } from "../../utils/RefetchContext";
import toast from "react-hot-toast";

const EditMyProfile = () => {
  const { setRefetch } = useContext(RefetchContext);
  const [userData, setUserData] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  
  // Get setRefetchTrigger from Outlet context
 
  
  // Handle file upload (image)
  const handleFileChange = ({ file }) => {
    if (file) {
      setFile(file); 
    } else {
      setFile(null);
    }
  };

  // Fetch user information from the API
  const fetchUserInformation = async () => {
    const token = Cookies.get("session");
    if (!token) {
      navigate("/auth");
      return message.error("please logged in first")
 }

    try {
      const response = await fetch(`${baseUrl}/user/information`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      if (result.success) {
        setUserData(result.data.information);
        form.setFieldsValue({
          name: result.data.information.name,
          email: result.data.information.email,
          phone: result.data.information.phone || "",
          address: result.data.information.address || "",
        });
      } else {
        message.error(result.message || "Failed to load user information.");
      }
    } catch (error) {
      message.error("Something went wrong while fetching the user information.");
    }
  };

  useEffect(() => {
    fetchUserInformation();
  }, []);

  const onFinish = async (values) => {
    const token = Cookies.get("session");
    // if (!token) {
    //   message.error("Unauthorized! Please login.");
    //   return;
    // }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("phone", values.phone);
      formData.append("address", values.address);

      if (file) {
        formData.append("image", file);
      }

      const response = await fetch(`${baseUrl}/user/update`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await response.json();
      if (result.success) {
        message.success("Profile updated successfully");

        // Trigger refetch in the Header component
        setRefetch((prev) => prev + 1);
        
        navigate("/settings/personal-information");
      } else {
        message.error(result.message || "Failed to update profile.");
      }
    } catch (error) {
      message.error("Something went wrong while updating the profile.");
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    message.error("Please check the form fields.");
  };

  return (
    <div className="space-y-[34px]">
      <PageHeading
        title={"Edit Personal Information"}
        backPath={"/settings/personal-information"}
      />
      <Form
        form={form}
        name="basic"
        layout="vertical"
        className="w-full grid grid-cols-12 gap-x-8"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        initialValues={{
          name: userData?.name,
          email: userData?.email,
        }}
      >
        {/* Profile image and name section */}
        <div className="col-span-3 h-[380px] flex flex-col items-center justify-center bg-grayground p-8 rounded-lg border border-primary space-y-4 shadow-inner">
          <div className="my-3 relative">
            <Upload
              listType="picture-card"
              showUploadList={false}
              beforeUpload={() => false}
              onChange={handleFileChange}
            >
              <div className="h-full w-full absolute inset-0 bg-[#222222bb] rounded-full flex justify-center items-center text-white cursor-pointer">
                <PiCameraPlus size={34} />
              </div>
              <img
                src={
                  file
                    ? URL.createObjectURL(file)
                    : userData?.image?.publicFileURL
                    ? `${imageUrl}${userData.image.publicFileURL}`
                    : defaultImage
                }
                alt="Profile"
                className="h-[144px] w-[144px] rounded-full"
              />
            </Upload>
          </div>
          <h5 className="text-lg text-[#222222]">{"Profile"}</h5>
          <h4 className="text-2xl text-[#222222]">{"Admin"}</h4>
        </div>

        {/* Form fields for name, email, phone, and address */}
        <div className="col-span-9 space-y-[24px]">
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input
              style={{ border: "1px solid #0445e5" }}
              className="h-[56px] rounded-lg bg-grayground mt-3"
            />
          </Form.Item>

          <Form.Item label="Email" name="email">
            <Input
              style={{ border: "1px solid #0445e5" }}
              className="h-[56px] rounded-lg bg-grayground mt-3"
              disabled
            />
          </Form.Item>

          <Form.Item label="Phone Number" name="phone">
            <PhoneCountryInput value={userData?.phone || ""} onChange={() => {}} />
          </Form.Item>

          <Form.Item label="Address" name="address">
            <Input
              style={{ border: "1px solid #0445e5" }}
              className="h-[56px] rounded-lg bg-grayground mt-3"
            />
          </Form.Item>

          <div className="flex justify-end">
            <Button
              style={{ backgroundColor: "#1D7151", color: "#fff" }}
              htmlType="submit"
              className="h-[56px] w-[206px] text-[18px] font-medium"
              type="primary"
              loading={loading}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default EditMyProfile;



