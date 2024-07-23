import { postLogin, postSignup } from "@/api/user";
import { useMutation } from "@tanstack/react-query";
import { signin, signup } from "@vedanshi/verbly-common";
import { ReactNode, createContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

type AuthProviderProps = {
  children: ReactNode;
};

type AuthContextType = {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  login: (data: signin) => void;
  signUp: (data: signup) => void;
  logout: () => void;
  user: string;
  isLoggingPending: boolean;
  isSignUpPending: boolean;
};

const initialState: AuthContextType = {
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  login: () => {},
  signUp: () => {},
  logout: () => {},
  user: "",
  isLoggingPending: false,
  isSignUpPending: false,
};

export const AuthContext: React.Context<AuthContextType> =
  createContext<AuthContextType>(initialState);

export const AuthProvider = ({ children, ...props }: AuthProviderProps) => {
  const Navigate = useNavigate();
  const getValue = localStorage.getItem("isAuthenticated");

  let getuser = localStorage.getItem("user");
  let auth: boolean;

  if (getValue != null && getuser) {
    auth = JSON.parse(getValue) === true;
  } else {
    auth = false;
  }

  // username
  const [user, setUser] = useState(getuser || "");

  // whether user is authenticated or not
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(auth);

  //mutation function to handle post request of login using react query
  const loginMutation = useMutation({
    mutationFn: postLogin,
    onSuccess: (data, variables) => {
      if (data.token) {
        setIsAuthenticated(true);
        setUser(variables.username);
        localStorage.setItem("isAuthenticated", JSON.stringify(true));
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", variables.username);
        Navigate(-1);
      }
    },
    onError: (error) => {
      console.error("Login error:", error);
      alert("Login failed. Please check console for details.");
    },
  });

  // mutation function to handle post request of signup using react query
  const signUpMutation = useMutation({
    mutationFn: postSignup,
    onSuccess: (data, variables) => {
      if (data.token) {
        setIsAuthenticated(true);
        setUser(variables.username);
        localStorage.setItem("isAuthenticated", JSON.stringify(true));
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", variables.username);
        Navigate(-1);
      }
    },
    onError: (error) => {
      console.error("Signup error:", error);
      alert("Signup failed. Please check console for details.");
    },
  });

  // login function
  const login = (data: signin) => {
    loginMutation.mutate(data);
  };
  // signup function
  const signUp = (data: signup) => {
    signUpMutation.mutate(data);
  };

  // logout function
  const logout = () => {
    setIsAuthenticated(false);
    setUser("");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    Navigate("/login");
  };

  // added usememo hook so that the context value only changes when one of its dependencies changes
  const contextValue = useMemo(
    () => ({
      isAuthenticated,
      setIsAuthenticated,
      login,
      signUp,
      logout,
      user,
      isLoggingPending: loginMutation.isPending,
      isSignUpPending: signUpMutation.isPending,
    }),
    [
      isAuthenticated,
      setIsAuthenticated,
      login,
      signUp,
      logout,
      user,
      loginMutation.isPending,
      signUpMutation.isPending,
    ]
  );

  return (
    <AuthContext.Provider value={contextValue} {...props}>
      {children}
    </AuthContext.Provider>
  );
};
