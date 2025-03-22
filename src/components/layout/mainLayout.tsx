import { useState } from "react";
import { Layout, Menu, Button } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Outlet } from "react-router-dom";
import { adminSidebarItems } from "../../routes/admin.routes";

const { Header, Content, Footer, Sider } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{ position: "fixed", height: "100vh" }}
      >
        {/* Logo */}
        <div>
          <h1
            style={{
              color: "white",
              padding: 8,
              textAlign: "center",
              height: "4rem",
            }}
          >
            PH University
          </h1>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["Dashboard"]}
          items={adminSidebarItems}
        />
      </Sider>
      <Layout
        style={{
          marginLeft: collapsed ? 0 : 200,
          transition: "margin-left 0.3s",
        }}
      >
        <Header
          style={{
            padding: "0",
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "18px",
              padding: "20px",
              background: "#001925",
              color: "#fff",
              marginTop: "105px",
              borderRadius: 0,
              borderTopRightRadius: "8px",
              borderBottomRightRadius: "8px",
            }}
          />
        </Header>
        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          <div
            style={{
              padding: 24,
              background: "#fff",
              minHeight: 360,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
