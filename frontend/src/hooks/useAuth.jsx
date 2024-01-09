import React from "react";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
const useAuth = () => {
  // const {auth,setAuth} = useContext(AuthContext)
  return (
    // <div>useAuth</div>
    useContext(AuthContext)
  );
};

export default useAuth;
