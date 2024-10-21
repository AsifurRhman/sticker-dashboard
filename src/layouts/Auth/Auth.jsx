import React from "react";
import { Outlet } from "react-router-dom";

const Auth = () => {
  return (
    <div className="bg-[#CBE8CE40] h-screen w-full flex justify-center items-center">
      <Outlet />
    </div>
  );
};

export default Auth;
