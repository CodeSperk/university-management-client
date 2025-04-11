import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import LoginPage from "../pages/login/Login";
import RegisterPage from "../pages/register/Register";
import { routeGenerator } from "../utils/routesGenerator";
import { adminPaths } from "./admin.routes";
import { facultyPaths } from "./faculty.route";
import { studentPaths } from "./student.route";
import Protectedroute from "../components/layout/ProtectedRoute";
import AboutPage from "../pages/about/About";
import ChangePassword from "../pages/changePassword/ChangePassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/admin",
    element: <Protectedroute role="admin">
      <App />
    </Protectedroute>,
    children: routeGenerator(adminPaths),
  },
  {
    path: "/faculty",
    element: <Protectedroute role="faculty">
      <App />
    </Protectedroute>,
    children: routeGenerator(facultyPaths),
  },
  {
    path: "/student",
    element: <Protectedroute role="student">
      <App />
    </Protectedroute>,
    children: routeGenerator(studentPaths),
  },
  {
    path:"/change-password",
    element: <ChangePassword/>
  },
  {
    path: "/about",
    element: <AboutPage/>
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
