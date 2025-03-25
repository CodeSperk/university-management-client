import { Layout } from "antd";

const { Header } = Layout;

const Navbar = () => {
  return (
    <Header
      style={{
        padding: 0,
      }}
    >
      <h2 style={{ textAlign: "center" }}>Welcome</h2>
    </Header>
  );
};

export default Navbar;
