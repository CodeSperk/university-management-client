import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { AdminRoutes } from "./admin.routes";
import LoginPage from "../pages/login/Login";
import RegisterPage from "../pages/register/Register";

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
    path: "/faculty",
    element: <div>Faculty</div>,
  },
  {
    path: "/student",
    element: <div>Student</div>,
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
