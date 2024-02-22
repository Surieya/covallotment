import React from "react";
import { useState, useEffect } from "react";
import UserLogin from "./UserLogin";
import AdminLogin from "./AdminLogin";

const Login = () => {
  const [check, setCheck] = useState(false);

  return (
    <section className="bg-slate-900 min-h-screen h-auto flex flex-col justify-center items-center gap-3 overscroll-y-auto py-5">
      <div className="w-[55%] flex justify-end">
        <button
          className="bg-indigo-500 p-2 rounded-md text-white"
          onClick={() => setCheck((p) => !p)}
        >
          {check ? "USER LOGIN" : "ADMIN LOGIN"}
        </button>
      </div>
      {!check ? <UserLogin /> : <AdminLogin />}
    </section>
  );
};

export default Login;
