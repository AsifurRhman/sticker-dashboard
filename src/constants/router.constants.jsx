// import { GrMoney } from "react-icons/gr";
// import { RiDashboardHorizontalFill, RiUserStarLine } from "react-icons/ri";
// import DashboardHome from "../pages/Main/DashboardHome/DashboardHome";
// import Notifications from "../pages/Main/Notifications/Notifications";
// import Earnings from "../../src/pages/Main/Earnings/Earnings";
// import Users from "../pages/Main/Users/Users";
// import { LuUsers2 } from "react-icons/lu";
// import { FaRegChessQueen } from "react-icons/fa6";
// import Subscriptions from "../pages/Main/Subscriptions/Subscriptions";
// import Subscribers from "../pages/Main/PromoCode/PromoCode";
// import { CiSettings } from "react-icons/ci";
// import Settings from "../pages/Settings/Settings";
// import MyProfile from "../pages/Profile/MyProfile";
// import EditMyProfile from "../pages/Profile/EditMyProfile";
// import TermsConditions from "../pages/Settings/TermsConditions";
// import EditTermsConditions from "../pages/Settings/EditTermsConditions";
// import EditPrivacyPolicy from "../pages/Settings/EditPrivacyPolicy";
// import PrivacyPolicy from "../pages/Settings/PrivacyPolicy";
// import AboutUs from "../pages/Settings/AboutUs";
// import EditAboutUs from "../pages/Settings/EditAboutUs";
// import EditSubscription from "../pages/Main/Subscriptions/EditSubscription";
// import AddSubscription from "../pages/Main/Subscriptions/AddSubscription";
// import { PiStickerBold } from "react-icons/pi";
// import { IoQrCodeOutline } from "react-icons/io5";

// export const dashboardItems = [
//   {
//     name: "Dashboard",
//     path: "/",
//     icon: RiDashboardHorizontalFill,
//     element: <DashboardHome />,
//   },
//   {
//     path: "/notifications",
//     element: <Notifications />,
//   },
//   {
//     name: "Transactions",
//     path: "/transaction",
//     icon: GrMoney,
//     element: <Earnings />,
//   },
//   {
//     name: "Users",
//     path: "/users",
//     icon: LuUsers2,
//     element: <Users />,
//   },
//   {
//     name: "Stickers",
//     path: "/stickers",
//     icon: PiStickerBold,
//     element: <Subscriptions />,
//   },
//   {
//     name: "Promo Code",
//     path: "/promo-codes",
//     icon: IoQrCodeOutline,
//     element: <Subscribers />,
//   },
//   {
//     path: "/stickers/edit/:id",
//     element: <EditSubscription />,
//   },
//   {
//     path: "/stickers/add-new",
//     element: <AddSubscription />,
//   },
//   {
//     name: "Settings",
//     path: "/settings",
//     icon: CiSettings,
//     element: <Settings />,
//   },
//   {
//     path: "/settings/personal-information",
//     element: <MyProfile />,
//   },
//   {
//     path: "/settings/personal-information/edit",
//     element: <EditMyProfile />,
//   },
//   {
//     path: "/settings/terms-conditions",
//     element: <TermsConditions />,
//   },
//   {
//     path: "/settings/terms-conditions/edit",
//     element: <EditTermsConditions />,
//   },
//   {
//     path: "/settings/privacy-policy",
//     element: <PrivacyPolicy />,
//   },
//   {
//     path: "/settings/privacy-policy/edit",
//     element: <EditPrivacyPolicy />,
//   },
//   {
//     path: "/settings/about-us",
//     element: <AboutUs />,
//   },
//   {
//     path: "/settings/about-us/edit",
//     element: <EditAboutUs />,
//   },
// ];
import { GrMoney } from "react-icons/gr";
import { RiDashboardHorizontalFill, RiUserStarLine } from "react-icons/ri";
import DashboardHome from "../pages/Main/DashboardHome/DashboardHome";
import Notifications from "../pages/Main/Notifications/Notifications";
import Earnings from "../../src/pages/Main/Earnings/Earnings";
import Users from "../pages/Main/Users/Users";
import { LuUsers2 } from "react-icons/lu";
import { FaRegChessQueen } from "react-icons/fa6";
import Subscriptions from "../pages/Main/Subscriptions/Subscriptions";
import Subscribers from "../pages/Main/PromoCode/PromoCode";
import { CiSettings } from "react-icons/ci";
import Settings from "../pages/Settings/Settings";
import MyProfile from "../pages/Profile/MyProfile";
import EditMyProfile from "../pages/Profile/EditMyProfile";
import TermsConditions from "../pages/Settings/TermsConditions";
import EditTermsConditions from "../pages/Settings/EditTermsConditions";
import EditPrivacyPolicy from "../pages/Settings/EditPrivacyPolicy";
import PrivacyPolicy from "../pages/Settings/PrivacyPolicy";
import AboutUs from "../pages/Settings/AboutUs";
import EditAboutUs from "../pages/Settings/EditAboutUs";
import EditSubscription from "../pages/Main/Subscriptions/EditSubscription";
import AddSubscription from "../pages/Main/Subscriptions/AddSubscription";
import { PiStickerBold } from "react-icons/pi";
import { IoQrCodeOutline } from "react-icons/io5";

export const dashboardItems = [
  {
    name: "Dashboard",
    path: "/",
    icon: RiDashboardHorizontalFill,
    element: <DashboardHome />,
  },
  {
    path: "/notifications",
    element: <Notifications />,
  },
  {
    name: "Transactions",
    path: "/transaction",
    icon: GrMoney,
    element: <Earnings />,
  },
  {
    name: "Users",
    path: "/users",
    icon: LuUsers2,
    element: <Users />,
  },
  {
    name: "Stickers",
    path: "/stickers",
    icon: PiStickerBold,
    element: <Subscriptions />,
  },
  {
    name: "Promo Code",
    path: "/promo-codes",
    icon: IoQrCodeOutline,
    element: <Subscribers />,
  },
  {
    path: "/stickers/edit/:id",
    element: <EditSubscription />,
  },
  {
    path: "/stickers/add-new",
    element: <AddSubscription />,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: CiSettings,
    element: <Settings />,
  },
  {
    path: "/settings/personal-information",
    element: <MyProfile />,
  },
  {
    path: "/settings/personal-information/edit",
    element: <EditMyProfile />,
  },
  {
    path: "/settings/terms-conditions",
    element: <TermsConditions />,
  },
  {
    path: "/settings/terms-conditions/edit",
    element: <EditTermsConditions />,
  },
  {
    path: "/settings/privacy-policy",
    element: <PrivacyPolicy />,
  },
  {
    path: "/settings/privacy-policy/edit",
    element: <EditPrivacyPolicy />,
  },
  {
    path: "/settings/about-us",
    element: <AboutUs />,
  },
  {
    path: "/settings/about-us/edit",
    element: <EditAboutUs />,
  },
];
