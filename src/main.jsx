import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/index.jsx";
import { Toaster } from "react-hot-toast";
import { RefetchProvider } from "./utils/RefetchContext.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RefetchProvider> {/* Wrap the RouterProvider in RefetchProvider */}
      <div
        // className="max-w-[1440px] mx-auto"
      >
        <RouterProvider router={router} />
        <Toaster />
      </div>
    </RefetchProvider>
  </React.StrictMode>
);
