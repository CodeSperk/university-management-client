import { Layout, Menu } from "antd";
import { NavLink } from "react-router-dom";
import { adminPaths } from "../../routes/admin.routes";
import { sidebaGenerator } from "../../utils/sidebarGenerator";
import { facultyPaths } from "../../routes/faculty.route";
import { studentPaths } from "../../routes/student.route";
import { useAppSelector } from "../../redux/hooks";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
const { Sider } = Layout;

const userRole = {
  Admin: "admin",
  Faculty: "faculty",
  Student: "student",
};

const Sidebar = () => {
  const user = useAppSelector(useCurrentUser);

  let sidebarItems;
  switch (user?.role) {
    case userRole.Admin:
      sidebarItems = sidebaGenerator(adminPaths, "admin");
      break;
    case userRole.Faculty:
      sidebarItems = sidebaGenerator(facultyPaths, "faculty");
      break;
    case userRole.Student:
      sidebarItems = sidebaGenerator(studentPaths, "student");
      break;
    default:
      break;
  }

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        // console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        // console.log(collapsed, type);
      }}
      style={{height: "100vh", position:"sticky", zIndex:"1000", top:"0", left:"0"}}
    >
      <div
        style={{
          color: "white",

          height: "4rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <NavLink to="/">
          <h1>UMS</h1>
        </NavLink>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["Dashboard"]}
        items={sidebarItems}
      />
    </Sider>
  );
};

export default Sidebar;
