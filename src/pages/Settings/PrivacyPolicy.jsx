
import React, { useState, useEffect } from "react";
import { Button, Spin, message } from "antd";
import { useNavigate } from "react-router-dom";
import PageHeading from "../../Components/PageHeading";
import { baseUrl } from "../../constant/contant";
import toast from "react-hot-toast";


const PrivacyPolicy = () => {
  const [policy, setPolicy] = useState(null); // State to hold privacy policy data
  //console.log(policy,"pol;icy")
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  // Fetch privacy policy data from API
  const fetchPolicy = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}/privacy/all`);
      const result = await response.json();
     //console.log(result,"result")
      if (result.success) {
        setPolicy(result.data[0]); // Assuming there's only one privacy policy record
      } else {
        toast.error(result.message || "Failed to fetch privacy policy.");
      }
    } catch (error) {
      console.error("Error fetching privacy policy:", error);
      message.error("Something went wrong while fetching the privacy policy.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPolicy();
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
        <PageHeading title={"Privacy Policy"} />
        <div className="space-y-4">
          {/* Render HTML from the policy data */}
          <div dangerouslySetInnerHTML={{ __html: policy.description }} />
        </div>
      </div>
      <div className="flex justify-end pt-10">
        <Button
          onClick={() => navigate(`/settings/privacy-policy/edit`)}
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

export default PrivacyPolicy;

