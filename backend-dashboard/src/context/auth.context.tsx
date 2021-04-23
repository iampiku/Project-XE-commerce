import React from "react";
import type {
  LoginCredentialInterface,
  LoginResponseInterface,
} from "src/models";
import { Error, Login, Success } from "../components";
import { Dashboard } from "../containers";
import { stopEventBubbling } from "../utils";

export interface AuthContextState {
  token: string | null;
  isLoggedIn: boolean;
  userId: string | null;
  setAuthState: React.Dispatch<React.SetStateAction<AuthContextState>>;
  error: string | null;
  message: string | null;
  login: Function;
}

const initialAuthState: AuthContextState = {
  isLoggedIn: false,
  token: null,
  userId: null,
  error: null,
  message: null,
  setAuthState: () => {},
  login: () => {},
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
    const tokenFromLs = localStorage.getItem("token");
    if (tokenFromLs) {
      const parsedCurrentUserFromLs: AuthContextState = JSON.parse(
        localStorage.getItem("currentUser") as string
      );
      setAuthState(parsedCurrentUserFromLs);
    }
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

      // clear out everything from LS
      localStorage.clear();
      localStorage.setItem("token", `Bearer ${resp.token}`);
      localStorage.setItem("currentUser", JSON.stringify(resp));
      
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

  return (
    <AuthContext.Provider value={{ ...authState, setAuthState, login }}>
      <Error error={authState.error} />
      <Success message={authState.message} />
      {authState.isLoggedIn ? <Dashboard /> : <Login />}
    </AuthContext.Provider>
  );
};
