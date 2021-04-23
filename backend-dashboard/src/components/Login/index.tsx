import React from "react";
import { AuthContext, useAuth } from "../../context/auth.context";
import { DashboardLogo, LockClosedIcon } from "../../assets/icons";

interface LoginProps {}
const Login: React.FC<LoginProps> = ({}: LoginProps) => {
  const { login } = useAuth();

  const [loginCredentials, setLoginCredentials] = React.useState({
    username: "",
    password: "",
  });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setLoginCredentials({
      ...loginCredentials,
      [event.target.name]: event.target.value,
    });
  }

  async function onLogin(e: any) {
    await login(e, loginCredentials);
  }

  return (
    <React.Fragment>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <DashboardLogo />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to Dashboard
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
            onSubmit={onLogin}
          >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Username
                </label>
                <input
                  id="email-address"
                  name="username"
                  type="username"
                  autoComplete="username"
                  required
                  className="input-box-tr"
                  placeholder="Email address"
                  value={loginCredentials.username}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="input-box-br"
                  placeholder="Password"
                  value={loginCredentials.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember_me"
                  name="remember_me"
                  type="checkbox"
                  className="check-box"
                />
                <label
                  htmlFor="remember_me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button type="submit" className="btn-indigo">
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon />
                </span>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;
