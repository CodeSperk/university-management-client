import { Layout, Menu } from "antd";
import { NavLink } from "react-router-dom";
import { adminPaths } from "../../routes/admin.routes";
import { sidebaGenerator } from "../../utils/sidebarGenerator";
import { facultyPaths } from "../../routes/faculty.route";
import { studentPaths } from "../../routes/student.route";
const { Sider } = Layout;

const userRole = {
  Admin: "admin",
  Faculty: "faculty",
  Student: "student",
};

const Sidebar = () => {
  const role = "admin";

  let sidebarItems;
  switch (role) {
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
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
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
