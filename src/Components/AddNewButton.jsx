import { Button } from "antd";
import React from "react";
import { FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const AddNewButton = ({ text, path }) => {
    const navigate = useNavigate();
  return (
    <div className="flex justify-end">
      <Button
        onClick={() => navigate(path ? path : "add-new")}
        type="primary "
        style={{ height: "56px" }}
        className="text-lg bg-primary rounded-lg font-medium font-nerko"
      >
        <FiPlus /> {text}
      </Button>
    </div>
  );
};

export default AddNewButton;
