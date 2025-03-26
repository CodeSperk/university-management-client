import { useForm } from "react-hook-form";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { verifyToken } from "../../utils/verifyToken";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/features/auth/authSlice";

const LoginPage = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const [login, { data, error }] = useLoginMutation();

  const onFormSubmit = async (data) => {
    const userInfo = {
      id: data.userId,
      password: data.password,
    };
    const res = await login(userInfo).unwrap();
    const token = res.data.accessToken;
    const user = verifyToken(token);
    console.log(user);
    dispatch(setUser({ user: user, token: token }));
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <div>
        <label htmlFor="userId">ID:</label>
        <input type="text" id="userId" {...register("userId")} />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="text" id="password" {...register("password")} />
      </div>
      <input type="submit" placeholder="Login" />
    </form>
  );
};

export default LoginPage;
