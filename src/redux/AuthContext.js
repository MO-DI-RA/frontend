import React, { createContext, useContext, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { actionCreators } from './user';
import { getCookie } from '../config/cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (getCookie("refresh-token")) {
      dispatch(actionCreators.loginCheckDB());
    }
  }, [dispatch]);

  const changeLoggedIn = (value) => {
    setIsLoggedIn(value);
    dispatch(actionCreators.updateLoggedIn(value));
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, changeLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);