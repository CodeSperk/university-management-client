import { useNavigate } from "react-router-dom";
import { useChangePasswordMutation } from "../../redux/features/admin/userManagement.api";
import { useAppDispatch } from "../../redux/hooks";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { TResponse } from "../../types";
import { logout } from "../../redux/features/auth/authSlice";
import { Button, Row } from "antd";
import UMSForm from "../../components/form/UMSForm";
import UMSInput from "../../components/form/UMSInput";


const ChangePassword = () => {
  const [changePassword] = useChangePasswordMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {

    const res = (await changePassword(data)) as TResponse<any>;
    if (res?.data?.success) {
      dispatch(logout());
      navigate('/login');
    }
  };

  return (
    <Row justify="center" align="middle" style={{ height: '100vh' }}>
      <UMSForm onSubmit={onSubmit}>
        <UMSInput type="text" name="oldPassword" label="Old Password" />
        <UMSInput type="text" name="newPassword" label="New Password" />
        <Button htmlType="submit">Login</Button>
      </UMSForm>
    </Row>
  );
};

export default ChangePassword;