import React from "react";
import { Switch } from "react-router-dom";
import { Error, Success } from "../components";
import type {
  LoginCredentialInterface,
  LoginResponseInterface,
  SignupCredentialsInterface,
  SignupResponseInterface,
} from "../models";
import { AuthenticatedRoutes, UnAuthenticatedRoutes } from "../routes";
import {
  clearAllCookieStorage,
  getAuthStateOfCuurentUser,
  getAuthTokenCookie,
  setAuthStateOfCurrentUser,
  setAuthTokenCookie,
  setIsLoggedInCookie,
  setUserIdCookie,
  stopEventBubbling,
} from "../utils";

interface AuthContextState {
  token: string | null;
  isLoggedIn: boolean;
  userId: string | null;
  setAuthState: React.Dispatch<React.SetStateAction<AuthContextState>>;
  error: string | null;
  message: string | null;
  login: Function;
  signup: Function;
  logout: Function;
}

const initialAuthState: AuthContextState = {
  isLoggedIn: false,
  token: null,
  userId: null,
  error: null,
  message: null,
  setAuthState: () => {},
  login: () => {},
  signup: () => {},
  logout: () => {},
};

export const AuthContext = React.createContext<AuthContextState>(
  initialAuthState
);

// exporting Adv. ReactHooks pattern for
// centralizing maintanecing the `Authentication`
export const useAuth = () => React.useContext(AuthContext);

/** AuthProvider Context Component */
interface AuthProviderProps {
  children: any;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
}: AuthProviderProps) => {
  const [authState, setAuthState] = React.useState<AuthContextState>(
    initialAuthState
  );

  React.useEffect(() => {
    const tokenFromCookie = getAuthTokenCookie();
    // revalidating user using CookieStorage
    if (tokenFromCookie) setAuthState(getAuthStateOfCuurentUser());
  }, []);

  /** Function for Logging in */
  async function login(e: any, loginCredentials: LoginCredentialInterface) {
    stopEventBubbling(e);
    try {
      const resp: LoginResponseInterface = (await (
        await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(loginCredentials),
        })
      ).json()) as LoginResponseInterface;

      if (resp.statusCode === 403) {
        setAuthState({ ...authState, error: `🤯️ ${resp.error}` as string });
        setTimeout(() => {
          setAuthState({ ...authState, error: null });
        }, 2600);
        return;
      }

      setAuthState({
        ...authState,
        ...resp,
        message: `Hi, ${loginCredentials.username}! You were logged in!`,
      });

      /** reset the successfull loggedIn message to null */
      setTimeout(() => {
        setAuthState({ ...authState, ...resp, message: null });
      }, 2600);

      // clear out everything from CookieStorage
      clearAllCookieStorage();
      setAuthStateOfCurrentUser(resp);
      setAuthTokenCookie(resp.token);
      setUserIdCookie(resp.userId);
      setIsLoggedInCookie(resp.isLoggedIn);
    } catch (error) {
      setAuthState({
        ...authState,
        error: "It seems you are currently offline!",
      });
      setTimeout(() => {
        setAuthState({ ...authState, error: null });
      }, 2600);
    }
  }

  async function signup(e: any, signupCredentials: SignupCredentialsInterface) {
    stopEventBubbling(e);
    try {
      const resp: SignupResponseInterface = (await (
        await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(signupCredentials),
        })
      ).json()) as SignupResponseInterface;

      // On unsuccessfull attempt
      if (resp.statusCode !== 200) {
        setAuthState({ ...authState, error: `${resp.error}` });
        setTimeout(() => {
          setAuthState({ ...authState, error: null });
        }, 2600);
        return;
      }

      // On succesfull request resolved
      setAuthState({ ...authState, ...resp, message: `${resp.message}` });
      /** reset the successfull loggedIn message to null */
      setTimeout(() => {
        setAuthState({ ...authState, ...resp, message: null });
      }, 2600);

      // clear out everything from CookieStorage
      clearAllCookieStorage();
      setAuthStateOfCurrentUser(resp);
      setAuthTokenCookie(resp.token);
      setUserIdCookie(resp.userId);
      setIsLoggedInCookie(resp.isLoggedIn);
      document.location.replace("/");
    } catch (error) {
      setAuthState({
        ...authState,
        error: "It seems you are currently offline!",
      });
      setTimeout(() => {
        setAuthState({ ...authState, message: null, error: null });
      }, 2600);
    }
  }

  /** TODO: Loggout Function needs to be implemented */
  async function logout() {
    /** do something usefull,
     * cancel subscriptions
     * reset state values */

    try {
      const resp: any = await (
        await fetch("/api/auth/logout", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            authorization: getAuthTokenCookie(),
          },
        })
      ).json();

      if (resp.status === true) {
        setAuthState({ ...initialAuthState });
        clearAllCookieStorage();
        return;
      } else {
        authState.error = resp.error;
        setTimeout(() => {
          setAuthState({ ...authState, error: null });
        }, 2600);
      }
    } catch (error) {
      authState.error = "Whoops!! Something went wrong!";
      setTimeout(() => {
        setAuthState({ ...authState, error: null });
      }, 2600);
    }
  }

  return (
    <AuthContext.Provider
      value={{ ...authState, setAuthState, login, signup, logout }}
    >
      <Error error={authState.error} />
      <Success message={authState.message} />

      <Switch>
        {authState.isLoggedIn ? (
          <AuthenticatedRoutes />
        ) : (
          <UnAuthenticatedRoutes />
        )}
      </Switch>
    </AuthContext.Provider>
  );
};
