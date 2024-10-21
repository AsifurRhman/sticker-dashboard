
import React, { useState, useRef, useEffect } from "react";
import { Button, message } from "antd";
import JoditEditor from "jodit-react";
import { useNavigate, useParams } from "react-router-dom";
import PageHeading from "../../Components/PageHeading";
import Cookies from "js-cookie"; // For authentication
import { baseUrl } from "../../constant/contant";
import toast from "react-hot-toast";


const EditTermsConditions = () => {
 
  
  const [content, setContent] = useState(""); // State to hold editor content
  const [loading, setLoading] = useState(false); // Loading state
  const editor = useRef(null); // Reference for the editor
  const navigate = useNavigate();

  // Fetch the current terms from API to pre-populate the editor
  const fetchTerms = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}/terms/all`);
      const result = await response.json();
      if (result.success) {
        setContent(result.data[0].description); // Pre-fill editor with current terms
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

  useEffect(() => {
    fetchTerms();
  }, []);

  // Update the terms data
  const handleSave = async () => {
    const token = Cookies.get("session"); // Get token for authentication
    if (!token) {
      navigate("/auth");
      return message.error("please logged in first")
 }

    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}/terms/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the token in the header
        },
        body: JSON.stringify({ description: content }),
      });

      const result = await response.json();
      if (result.success) {
        message.success("Terms updated successfully.");
        navigate("/settings/terms-conditions"); // Navigate back after success
      } else {
        message.error(result.message || "Failed to update terms.");
      }
    } catch (error) {
      console.error("Error updating terms:", error);
      message.error("Something went wrong while updating the terms.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex flex-col justify-between">
      <div className="space-y-6">
        <PageHeading
          title={"Edit Terms & Conditions"}
          backPath={"/settings/terms-conditions"}
        />
        <div className="border border-[#0445E5] rounded-md p-[0.3px]">
          <JoditEditor
            ref={editor}
            value={content}
            onChange={(newContent) => setContent(newContent)}
          
            tabIndex={1}
          />


        </div>
      </div>
      <div className="flex justify-end pt-10">
        <Button
          onClick={handleSave}
          style={{
            backgroundColor: "#1D7151",
            color: "#fff",
          }}
          htmlType="submit"
          className="w-[400px] h-[56px]  placeholder:text-[#999999] text-[18px] font-medium"
          loading={loading}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default EditTermsConditions;


