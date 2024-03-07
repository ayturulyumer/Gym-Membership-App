import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import usePersistedState from "./usePersistedState.js";

import * as adminApi from "../api/adminApi.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = usePersistedState("auth", {});
  const navigate = useNavigate();

  const onLoginHandler = async (data) => {
    try {
      const user = await adminApi.login(data);
      setAuth(user);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  const onLogoutHandler = async () => {
    try {
      await adminApi.logout();
      setAuth({});
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const contextValues = {
    onLoginHandler,
    onLogoutHandler,
    userId: auth._ownerId,
    username: auth.username,
    token: auth.accessToken,
    isAuthenticated: !!auth.accessToken,
  };
  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
