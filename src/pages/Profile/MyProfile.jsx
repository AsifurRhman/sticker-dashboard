
import React, { useState, useEffect } from "react";
import { Button, Form, Input, message, Spin } from "antd";
import { FiEdit } from "react-icons/fi";
import { useNavigate} from "react-router-dom";
import PhoneCountryInput from "../../Components/PhoneCountryInput";
import PageHeading from "../../Components/PageHeading";
import Cookies from "js-cookie";
import { baseUrl, imageUrl } from "../../constant/contant";
import dashProfile from "../../assets/images/no-found.png"; // Placeholder image
import toast from "react-hot-toast";

const MyProfile = () => {
  const [profileData, setProfileData] = useState(null); // State for user data

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Function to fetch user information
  const fetchUserInformation = async () => {
    const token = Cookies.get("session");
    if (!token) {
      navigate("/auth");
      return message.error("please logged in first")
 }

    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}/user/information`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      if (result.success) {
        setProfileData(result.data.information); // Set user data
      } else {
        message.error(result.message || "Failed to load user information.");
      }
    } catch (error) {
      console.error("Error fetching user information:", error);
      message.error("Something went wrong while fetching the user information.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserInformation();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="space-y-[24px]">
      <div className="flex justify-between">
        <PageHeading title={"Personal information"} />
        <Button
          onClick={() => navigate("/settings/personal-information/edit")}
          style={{
            backgroundColor: "#1D7151",
            color: "#fff",
          }}
          className="h-[56px] w-[206px] text-[18px] font-medium"
          type="primary"
        >
          Edit Profile <FiEdit />
        </Button>
      </div>

      <Form
        name="basic"
        layout="vertical"
        className="w-full grid grid-cols-12 gap-x-8"
        autoComplete="off"
        initialValues={{
          name: profileData?.name,
          email: profileData?.email,
          phone: profileData?.phone,
          address: profileData?.address,
        }}
      >
        {/* Profile Picture Section */}
        <div className="col-span-3 min-h-[365px] flex flex-col items-center justify-center bg-grayground p-8 rounded-lg border border-primary space-y-4 shadow-inner">
          <div className="my-3">
            <img
              src={
                profileData?.image?.publicFileURL
                  ? `${imageUrl}${profileData.image.publicFileURL}`
                  : dashProfile
              }
              alt="Profile"
              className="h-[144px] w-[144px] rounded-full"
            />
          </div>
          <h5 className="text-lg text-[#222222]">{"Profile"}</h5>
          <h4 className="text-2xl text-[#222222]">{"Admin"}</h4>
        </div>

        {/* User Information Section */}
        <div className="col-span-9 space-y-[24px]">
          <Form.Item
            className="text-lg text-[#1F8D84] font-medium"
            label="Name"
            name="name"
          >
            <Input
              readOnly
              style={{
                border: "1px solid #0445e5",
              }}
              className="h-[56px] rounded-lg bg-grayground mt-2.5"
            />
          </Form.Item>

          <Form.Item
            className="text-lg text-[#1F8D84] font-medium"
            label="Email"
            name="email"
          >
            <Input
              readOnly
              style={{
                border: "1px solid #0445e5",
              }}
              className="h-[56px] rounded-lg bg-grayground mt-2.5"
            />
          </Form.Item>

          <Form.Item
            className="text-lg text-[#222222] font-medium"
            label="Phone Number"
            name="phone"
          >
            <PhoneCountryInput disabled={true} />
          </Form.Item>

          <Form.Item
            className="text-lg text-[#222222] font-medium"
            label="Address"
            name="address"
          >
            <Input
              readOnly
              style={{
                border: "1px solid #0445e5",
              }}
              className="h-[56px] rounded-lg bg-grayground mt-3"
            />
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default MyProfile;


