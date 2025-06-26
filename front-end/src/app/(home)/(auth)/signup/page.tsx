import { AuthCard } from "../_components/auth-card";
import { SignUpForm } from "./_components/signup-form";

const SignUp = () => {
  return (
    <AuthCard
      authForm={<SignUpForm />}
      googleDescription="Sign up"
      authOptionDescription="or use your email for registration"
      authFormTitle="Create account"
      authFormDescription="Enter your credentials to create an account"
      authHref="/login"
      authButtonLabel="login"
      authOptionDescritionMobile="Already have an account?"
    />
  );
};

export default SignUp;
