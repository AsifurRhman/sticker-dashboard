
import React, { useState, useRef, useEffect } from "react";
import { Button, message } from "antd";
import JoditEditor from "jodit-react";
import { useNavigate } from "react-router-dom";
import PageHeading from "../../Components/PageHeading";
import Cookies from "js-cookie"; // For authentication
import { baseUrl } from "../../constant/contant";
import toast from "react-hot-toast";

const EditPrivacyPolicy = () => {
  const [content, setContent] = useState(""); // State to hold editor content
  const [loading, setLoading] = useState(false); // Loading state
  const editor = useRef(null); // Reference for the editor
  const navigate = useNavigate();

  // Fetch the current privacy policy from API to pre-populate the editor
  const fetchPrivacyPolicy = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}/privacy/all`);
      const result = await response.json();
      if (result.success) {
        setContent(result.data[0].description); // Pre-fill editor with current privacy policy
      } else {
        message.error(result.message || "Failed to fetch privacy policy.");
      }
    } catch (error) {
      console.error("Error fetching privacy policy:", error);
      message.error("Something went wrong while fetching the privacy policy.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrivacyPolicy();
  }, []);

  // Update the privacy policy data
  const handleSave = async () => {
    const token = Cookies.get("session"); // Get token for authentication
    if (!token) {
      navigate("/auth");
      return message.error("please logged in first")
 }

    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}/privacy/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the token in the header
        },
        body: JSON.stringify({ description: content }), // Send updated content
      });

      const result = await response.json();
      if (result.success) {
        message.success("Privacy policy updated successfully.");
        navigate("/settings/privacy-policy"); // Navigate back after success
      } else {
        message.error(result.message || "Failed to update privacy policy.");
      }
    } catch (error) {
      console.error("Error updating privacy policy:", error);
      message.error("Something went wrong while updating the privacy policy.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex flex-col justify-between">
      <div className="space-y-6">
        <PageHeading
          title={"Edit Privacy Policy"}
          backPath={"/settings/privacy-policy"}
        />
        <div className="border border-[#0445E5] rounded-md p-[0.3px]">
          <JoditEditor
            ref={editor}
            value={content}
            onChange={(newContent) => setContent(newContent)}
            // config={{
            //   readonly: false,
            //   height: "60vh",
            //   placeholder: "Enter your updated privacy policy...",
            // }}
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

export default EditPrivacyPolicy;
