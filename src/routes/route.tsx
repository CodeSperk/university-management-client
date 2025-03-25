import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import LoginPage from "../pages/login/Login";
import RegisterPage from "../pages/register/Register";
import { AdminRoutes } from "./admin.routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/admin",
    element: <App />,
    children: AdminRoutes,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);

export default router;
