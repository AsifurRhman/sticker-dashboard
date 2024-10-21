
import React, { useState, useEffect } from "react";
import { Button, message, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import PageHeading from "../../Components/PageHeading";
import { baseUrl } from "../../constant/contant";

const AboutUs = () => {
  const [aboutUs, setAboutUs] = useState(null); // State to hold about us data
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  // Fetch about us data from API
  const fetchAboutUs = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}/about/all`);
      const result = await response.json();
      if (result.success) {
        setAboutUs(result.data[0]); // Assuming there's only one about us record
      } else {
        message.error(result.message || "Failed to fetch about us information.");
      }
    } catch (error) {
      console.error("Error fetching about us:", error);
      message.error("Something went wrong while fetching the about us information.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAboutUs();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="min-h-[70vh] flex flex-col justify-between">
      <div className="space-y-4">
        <PageHeading title={"About Us"} />
        <div className="space-y-4">
          {/* Render HTML from data */}
          <div dangerouslySetInnerHTML={{ __html: aboutUs?.description }} />
        </div>
      </div>
      <div className="flex justify-end pt-10">
        <Button
          onClick={() => navigate(`/settings/about-us/edit`)} // Navigate to the edit page
          style={{
            backgroundColor: "#1D7151",
            color: "#fff",
          }}
          htmlType="submit"
          className="w-[400px] h-[56px] placeholder:text-[#999999] text-[18px] font-medium"
        >
          Edit
        </Button>
      </div>
    </div>
  );
};

export default AboutUs;
