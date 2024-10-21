
import React, { useState, useEffect } from "react";
import { Button, message, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import PageHeading from "../../Components/PageHeading";
import Cookies from "js-cookie"; // For authentication
import { baseUrl } from "../../constant/contant";


const TermsConditions = () => {
  const [terms, setTerms] = useState(null); // State to hold terms data
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  // Fetch terms data from API
  const fetchTerms = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}/terms/all`);
      const result = await response.json();
      if (result.success) {
        setTerms(result.data[0]); // Assuming there's only one terms record
      } else {
        message.error(result.message || "Failed to fetch terms.");
      }
    } catch (error) {
      console.error("Error fetching terms:", error);
      message.error("Something went wrong while fetching the terms.");
    } finally {
      setLoading(false);
    }
  };

  // Split the description into two parts
  // const splitDescription = () => {
  //   if (terms && terms.description) {
  //     const midpoint = Math.floor(terms.description.length / 2);
  //     const firstPart = terms.description.slice(0, midpoint);
  //     const secondPart = terms.description.slice(midpoint);
  //     return { firstPart, secondPart };
  //   }
  //   return { firstPart: "", secondPart: "" };
  // };

  useEffect(() => {
    fetchTerms();
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
          <PageHeading title={"Terms & Conditions"} />
          <div className="space-y-4">
            {/* Render HTML from data */}
            <div dangerouslySetInnerHTML={{ __html: terms.description }} />
          </div>
        </div>
        <div className="flex justify-end pt-10">
          <Button
            onClick={() => navigate(`/settings/terms-conditions/edit`)}
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

export default TermsConditions;


