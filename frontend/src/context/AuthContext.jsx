import React from "react";
import { createContext, useState, useEffect } from "react";

const authContext = createContext({});

export const AuthContext = ({ children }) => {
  const [auth, setAuth] = useState({});

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("auth"));
    if (data) {
      setAuth(data);
    }
  }, []);

  useEffect(() => {
    console.log({ auth });
    localStorage.setItem("auth", JSON.stringify(auth));

    return () => localStorage.removeItem("auth");
  }, [auth]);
  return (
    <authContext.Provider value={{ auth, setAuth }}>
      {children}
    </authContext.Provider>
  );
};

export default authContext;
