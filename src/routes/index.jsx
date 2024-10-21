
import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main/Main";
import Auth from "../layouts/Auth/Auth";
import SignIn from "../pages/Auth/SignIn";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import VerifyEmail from "../pages/Auth/VerifyEmail";
import ResetPassword from "../pages/Auth/ResetPassword";
import { routesGenerators } from "../utils/routesGenerators";
import { dashboardItems } from "../constants/router.constants";
import ProtectedRoute from "./protectRoute";
import NotFound from "../layouts/Main/NotFound";


const router = createBrowserRouter([
  {
    path: "/",
    element: (
        <Main />
    ),
    // children: routesGenerators(dashboardItems),  
    children: [
      {

          element: <ProtectedRoute />,  // Wrap only the children with ProtectedRoute
        children: routesGenerators(dashboardItems),    // These are the protected routes
      },
    ],
  
  },
  {
    path: "/auth",
    element: <Auth />,
    children: [
      {
        path: "/auth",
        element: <SignIn />,
      },
      {
        path: "/auth/sign-in",
        element: <SignIn />,
      },
      {
        path: "/auth/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/auth/verify-email",
        element: <VerifyEmail />,
      },
      {
        path: "/auth/reset-password",
        element: <ResetPassword />,
      },
    ],
  },
  {
    path: "*",
    // You can add a NotFound component here if needed
     element: <NotFound />,
  },
]);

export default router;

