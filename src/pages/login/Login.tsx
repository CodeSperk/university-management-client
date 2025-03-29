import { FieldValues} from "react-hook-form";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { verifyToken } from "../../utils/verifyToken";
import { useDispatch } from "react-redux";
import { setUser, TUser } from "../../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import UMSForm from "../../components/form/UMSForm";
import UMSInput from "../../components/form/UMSInput";
import { Button, Row } from "antd";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [login] = useLoginMutation();
  const onFormSubmit = async (data: FieldValues) => {
    console.log(data);
    const toastId = toast.loading("loging in");
    try {
      const userInfo = {
        id: data.userId,
        password: data.password,
      };
      const res = await login(userInfo).unwrap();
      const token = res.data.accessToken;
      const user = verifyToken(token) as TUser;
      dispatch(setUser({ user: user, token: token }));
      toast("Login Successfull");
      toast.success("Login Successfull", { id: toastId, duration: 2000 });
      navigate(`/${user.role}/dashboard`);
    } catch {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }
  };

  return (
    <Row justify="center" align="middle" style={{height:"100vh"}}>
      <UMSForm onSubmit={onFormSubmit}>
        <UMSInput type='text' name='userId' label='ID'/>
        <UMSInput type='text' name='password' label='Password'/>
        <Button htmlType="submit">Login</Button>
      </UMSForm>
    </Row>
  );
};

export default LoginPage;
