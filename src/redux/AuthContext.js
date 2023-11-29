import React, { createContext, useContext, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { actionCreators } from "./user";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("access-token")) {
      dispatch(actionCreators.loginCheckDB());
      setIsLoggedIn(true);
    }
  }, [dispatch]);

  const changedLoggedIn = (value) => {
    setIsLoggedIn(value);
    dispatch(actionCreators.loginCheckDB());
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, changedLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
