import { BACKEND_URL } from "@/constants/const";
import { signin, signup } from "@vedanshi/verbly-common";
import { ReactNode, createContext, useState } from "react";
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
};
const initialState: AuthContextType = {
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  login: () => {},
  signUp: () => {},
  logout: () => {},
};
export const AuthContext: React.Context<AuthContextType> =
  createContext<AuthContextType>(initialState);

export const AuthProvider = ({ children, ...props }: AuthProviderProps) => {
  const Navigate = useNavigate();
  const getValue = localStorage.getItem("isAuthenticated");
  let auth: boolean;
  if (getValue != null) {
    auth = JSON.parse(getValue) === true;
  } else {
    auth = false;
  }
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(auth);
  const login = async (data: signin) => {
    const response = await fetch(`${BACKEND_URL}user/signin`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    const authorization = await response.json();
    if (authorization.token) {
      setIsAuthenticated(true);
      localStorage.setItem("isAuthenticated", JSON.stringify(true));
      localStorage.setItem("token", authorization.token);
      Navigate("/");
    } else {
      console.log(authorization);
      alert("check console");
    }
  };

  const signUp = async (data: signup) => {
    const response = await fetch(`${BACKEND_URL}user/signup`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    const authorization = await response.json();
    if (authorization.token) {
      setIsAuthenticated(true);
      localStorage.setItem("isAuthenticated", JSON.stringify(true));
      localStorage.setItem("token", authorization.token);
      Navigate("/");
    } else {
      console.log(authorization);
      alert("check console");
    }
  };
  const logout = () => {
    setIsAuthenticated(false);
    localStorage.clear();
    Navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        login,
        signUp,
        logout,
      }}
      {...props}
    >
      {children}
    </AuthContext.Provider>
  );
};
