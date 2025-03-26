import { ReactNode } from "react";
import { useCurrentToken } from "../../redux/features/auth/authSlice";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";

const Protectedroute = ({ children }: { children: ReactNode }) => {
  const token = useAppSelector(useCurrentToken);
  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }
  return children;
};

export default Protectedroute;
