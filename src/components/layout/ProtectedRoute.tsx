import { ReactNode } from "react";
import { logout, TUser, useCurrentToken } from "../../redux/features/auth/authSlice";
import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { verifyToken } from "../../utils/verifyToken";
type TProtectedRoute = {
  children: ReactNode;
  role: string | undefined;
}
const Protectedroute = ({ children, role }: TProtectedRoute) => {
  const token = useAppSelector(useCurrentToken);

  let user;
  if(token){
    user = verifyToken(token)
  }

  // const user = useAppSelector(useCurrentUser);
  const dispatch = useAppDispatch();
  
  if(role !== undefined && role !== (user as TUser)?.role){
    dispatch(logout());
    return <Navigate to="/login" replace={true} />
  }
  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }
  return children;
};

export default Protectedroute;
