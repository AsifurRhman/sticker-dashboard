

//without socket notification
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Badge, message } from "antd";
// import { IoIosNotificationsOutline } from "react-icons/io";
// import defaultImage from "../../assets/images/no-found.png"; // Import the default image
// import Cookies from "js-cookie"; // For managing cookies
// import { baseUrl, imageUrl } from "../../constant/contant";

// const Header = ({ refetchTrigger }) => {
//   const navigate = useNavigate();
//   const [profileData, setProfileData] = useState(null); // State for user data

//   const fetchUserInformation = async () => {
//     const token = Cookies.get("session"); // Get token from cookies
//     if (!token) {
//       message.error("Unauthorized! Please login.");
//       return;
//     }

//     try {
//       const response = await fetch(`${baseUrl}/user/information`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });

//       const result = await response.json();
//       if (result.success) {
//         setProfileData(result.data.information); // Set user data
//       } else {
//         message.error(result.message || "Failed to load user information.");
//       }
//     } catch (error) {
//       console.error("Error fetching user information:", error);
//       message.error("Something went wrong while fetching the user information.");
//     }
//   };

//   // Fetch user information on component mount and refetch on trigger
//   useEffect(() => {
//     fetchUserInformation();
//   }, [refetchTrigger]);

//   return (
//     <div className="w-full h-[88px] flex justify-between items-center gap-x-10 lg:gap-x-48">
//       <div className="text-start space-y-0.5 bg-grayground flex-1 py-[16px] px-[32px] rounded-2xl">
//         <p className="text-[24px] font-semibold text-primary">
//           {`Welcome, ${profileData?.name || "Guest"}`}
//         </p>
//         <p className="text-lightgreen">{"Have a nice day!"}</p>
//       </div>
//       <div className="flex gap-x-[41px]">
//         <div
//           onClick={(e) => navigate("/notifications")}
//           className="relative flex items-center"
//         >
//           <Badge style={{ backgroundColor: "#0445E5" }} count={25}>
//             <IoIosNotificationsOutline
//               style={{ cursor: "pointer" }}
//               className={`text-primary hover:text-[#1f8d2e] bg-grayground w-[48px] h-[48px] rounded-full p-2 shadow-sm transition-all`}
//             />
//           </Badge>
//         </div>
//         <div className="flex items-center gap-3">
//           <div>
//             <img
//               src={profileData?.image?.publicFileURL
//                 ? `${imageUrl}${profileData.image.publicFileURL}`
//                 : defaultImage} // Use the image state or fallback to profileImage
//               alt="Profile"
//               className="rounded-full h-[48px] w-[48px]"
//             />
//           </div>
//           <div className="space-y-1 text-right">
//             <h5 className="text-[16px] font-medium">{profileData?.name || "Admin"}</h5>
//             <p className="text-xs text-lightgreen">{"Admin"}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Header;


//with socket
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge, message } from "antd";
import { IoIosNotificationsOutline } from "react-icons/io";
import io from "socket.io-client";
import defaultImage from "../../assets/images/no-found.png";
import Cookies from "js-cookie";
import { baseUrl, imageUrl } from "../../constant/contant";
import { RefetchContext } from "../../utils/RefetchContext.jsx";
import toast, { Toaster } from "react-hot-toast";


// Connect to Socket.IO server
const socket = io("http://localhost:5000");

const Header = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [notificationCount, setNotificationCount] = useState(0);
  const { refetch } = useContext(RefetchContext);
  const fetchUserInformation = async () => {
    const token = Cookies.get("session");
  
    if (!token) {
    navigate("/auth");
   return message.error("please logged in first")
  
 }
    try {
      const response = await fetch(`${baseUrl}/user/information`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
    //  console.log('Fetched user data:', result); // Add this to debug
      if (result.success) {
        setProfileData(result.data.information);
      } else {
        message.error(result.message || "Failed to load user information.");
      }
    } catch (error) {
      message.error("Something went wrong while fetching the user information.");
    }
  };

  // Fetch user information when refetchTrigger changes
  useEffect(() => {
  //  console.log('Fetching user info, refetchTrigger:', refetch); // Debug log
    fetchUserInformation();
  }, [refetch]); // Ensure this listens to changes in refetchTrigger

  useEffect(() => {
    if (!profileData) return;

    // Listen for incoming notifications from the server
    socket.on(`notification::${profileData?._id}`, (notification) => {
     // console.log("Notification received:", notification);
      setNotificationCount((prevCount) => prevCount + 1); // Increase notification count
    });

    // Clean up the socket listener on unmount
    return () => {
      socket.off(`notification::${profileData?._id}`);
    };
  }, [profileData]);

  // Handle notification icon click
  const handleNotificationClick = () => {
    setNotificationCount(0); // Reset notification count when clicked
    navigate("/notifications"); // Navigate to notifications page
  };

  return (
    <div className="w-full h-[88px] flex justify-between items-center gap-x-10 lg:gap-x-48">
      <div className="text-start space-y-0.5 bg-grayground flex-1 py-[16px] px-[32px] rounded-2xl">
        <p className="text-[24px] font-semibold text-primary">
          {`Welcome, ${profileData?.name || "Guest"}`}
        </p>
        <p className="text-lightgreen">{"Have a nice day!"}</p>
      </div>
      <div className="flex gap-x-[41px]">
        <div
          onClick={handleNotificationClick}
          className="relative flex items-center"
        >
          <Badge
            count={notificationCount} // Badge count state
            style={{ backgroundColor: "#0445E5" }}
          >
            <IoIosNotificationsOutline
              style={{ cursor: "pointer" }}
              className="text-primary hover:text-[#1f8d2e] bg-grayground w-[48px] h-[48px] rounded-full p-2 shadow-sm transition-all"
            />
          </Badge>
        </div>
        <div className="flex items-center gap-3">
          <div>
            <img
              src={profileData?.image?.publicFileURL
                ? `${imageUrl}${profileData.image.publicFileURL}`
                : defaultImage}
              alt="Profile"
              className="rounded-full h-[48px] w-[48px]"
            />
          </div>
          <div className="space-y-1 text-right">
            <h5 className="text-[16px] font-medium">{profileData?.name || "Admin"}</h5>
            <p className="text-xs text-lightgreen">{"Admin"}</p>
          </div>
        </div>
      </div>
     
    </div>
  );
};

export default Header;




