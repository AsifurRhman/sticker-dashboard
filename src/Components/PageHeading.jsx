import React from "react";
import { FaArrowLeft, FaChevronLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const PageHeading = ({ title, backPath }) => {
  const navigate = useNavigate();
  return (
    <div className=" text-primary flex items-center gap-1">
      <button
        className="outline-none px-2"
        onClick={() => navigate(backPath || "/settings")}
      >
        <FaArrowLeft size={22} />
      </button>
      <h1 className="text-[24px] font-medium">{title}</h1>
    </div>
  );
};

export default PageHeading;
