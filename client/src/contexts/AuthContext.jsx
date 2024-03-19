import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import usePersistedState from "../hooks/usePersistedState.js";

import * as adminApi from "../api/adminApi.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [warningMessage, setWarningMessage] = useState("");
  const [auth, setAuth] = usePersistedState("auth", {});
  const navigate = useNavigate();

  const onLoginHandler = async (data) => {
    // check if username and password are not empty
    if (!data.email || !data.password) {
      setMessage("warning");
      setWarningMessage("Моля попълнете празните полета");
      setTimeout(() => {
        setMessage("");
      }, 2000);
      return;
    }

    try {
      const user = await adminApi.login(data);
      setAuth(user);
      navigate("/dashboard");
    } catch (error) {
      setMessage("error");
      setErrorMessage(error.message);
      setTimeout(() => {
        setMessage("");
      }, 2000);
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
    username: auth.username,
    token: auth.accessToken,
    isAuthenticated: !!auth.accessToken,
    message,
    warningMessage,
    errorMessage,
  };
  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
