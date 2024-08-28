import axios from "axios";
import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("isAuthenticated") === "true" || false;
  });

  const [user, setUser] = useState(() => {
    return localStorage.getItem("user") || '';
  });

  const logout = () => {
    setIsAuthenticated(false);
    setUser('');
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
  };

  useEffect(() => {
    localStorage.setItem("isAuthenticated", isAuthenticated);
    localStorage.setItem("user", user);
  }, [isAuthenticated, user]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, logout, user, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
