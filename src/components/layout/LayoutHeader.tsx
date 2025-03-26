import { Button, Layout } from "antd";
import { useAppDispatch } from "../../redux/hooks";
import { logout } from "../../redux/features/auth/authSlice";

const { Header } = Layout;

const LayoutHeader = () => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Header
      style={{
        padding: "0 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "end",
      }}
    >
      <Button onClick={handleLogout}>Logout</Button>
    </Header>
  );
};

export default LayoutHeader;
