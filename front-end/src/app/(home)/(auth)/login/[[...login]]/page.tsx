import { AuthCard } from "../../_components/auth-card";
import { LoginForm } from "../_components/login-form";

const Login = () => {
  return (
    <AuthCard
      authForm={<LoginForm />}
      googleDescription="Login"
      authOptionDescription="or use your email and password for login"
      authFormTitle="Enter your account"
      authFormDescription="Enter your credentials to login"
      authHref="/signup"
      authButtonLabel="sing up"
      authOptionDescritionMobile="Don't have an account?"
    />
  );
};

export default Login;
