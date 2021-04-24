import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth.context";
import type SignupCredentialsInterface from "src/models/SignupCredentials.interface";
import { InputBox } from "..";
import { DashboardLogo } from "../../assets/icons";
import { stopEventBubbling } from "../../utils";

interface SignupProps {}

const SignUp: React.FC<SignupProps> = ({}: SignupProps) => {
  const { signup } = useAuth();
  const [
    signupCredentials,
    setSignupCredentials,
  ] = React.useState<SignupCredentialsInterface>({
    email: "",
    name: "",
    password: "",
    username: "",
  });

  function handleChange(e: any) {
    stopEventBubbling(e);
    setSignupCredentials({
      ...signupCredentials,
      [e.target.name]: e.target.value,
    });
  }

  async function onSignup(e: any) {
   await  signup(e, signupCredentials);
  }

  return (
    <React.Fragment>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <DashboardLogo />
            <h2 className="mt-6 text-center text-3xl font-semibold tracking-wide text-gray-900">
              Sign up to EcommerceX Dashboard
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{" "}
              <a
                href="#"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                start your 24-day free trial
              </a>
            </p>
          </div>
          <form
            className="mt-8 space-y-6"
            action="/"
            method="POST"
            onSubmit={onSignup}
          >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <InputBox
                name="name"
                classType="input-box"
                placeholder="Fullname"
                type="text"
                value={signupCredentials.name}
                onchangeFn={handleChange}
              />
              <InputBox
                name="username"
                classType="input-box"
                placeholder="Username"
                type="username"
                value={signupCredentials.username}
                onchangeFn={handleChange}
              />
              <InputBox
                name="email"
                classType="input-box"
                placeholder="Email address"
                type="email"
                value={signupCredentials.email}
                onchangeFn={handleChange}
              />
              <InputBox
                name="password"
                classType="input-box"
                placeholder="Password"
                type="password"
                value={signupCredentials.password}
                onchangeFn={handleChange}
              />
            </div>

            <div>
              <button type="submit" className="btn-indigo">
                Sign in
              </button>
            </div>
            <div className="my-3">
              <div className="text-sm text-center">
                <Link
                  to="/"
                  about="Login to the EcommerceX Dashboard"
                  className="font-medium text-gray-400 hover:text-gray-500"
                >
                  Already have an account?{" "}
                  <span className="text-blue-500">Login</span>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SignUp;
