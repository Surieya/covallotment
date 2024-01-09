import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
const URL = "http://localhost:8000";
import useAuth from "../hooks/UseAuth";

const AdminLogin = () => {
  console.log("Admin Login");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();
  const { auth, setAuth } = useAuth();
  const from = location.state?.from?.pathname || "/";
  const navigate = useNavigate();

  const postMutation = useMutation({
    mutationFn: async () => {
      const res = await axios.post(URL + "/api/auth/login/admin", {
        name,
        // age: parseInt(age),
        // email: email,
        password: password,
      });
      return res.data;
    },
    onSuccess: (data) => {
      //   queryClient.invalidateQueries("employees");
      //we need to set user here
      setAuth({
        name: data.name,
        accessToken: data.accessToken,
        isAdmin: data.isAdmin,
      });
      navigate(from, { replace: true });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  async function handleSubmit(e) {
    e.preventDefault();
    console.log({
      name,
      password,
    });

    // const err = validateData({ name, age, dob });
    // if (err.length > 0) {
    //   setValidationErr(err);
    //   return;
    // }
    postMutation.mutate();
    // setAge("");
    // setdob("");
    // setEmail("");
    setName("");
    setPassword("");
    // setLastName("");
    // setAddress("");
    // setDesignation("");
    // setSalary("");
  }

  return (
    <form
      className="bg-slate-800 flex flex-col w-[55%] gap-3 p-10 shadow-lg shadow-indigo-500 rounded-md text-slate-200"
      onSubmit={handleSubmit}
    >
      <h1>ADMIN LOGIN</h1>
      {/* {validationErr.length > 0 &&
        validationErr.map((err, i) => {
          return (
            <>
              <p key={i}>{err}</p>
            </>
          );
        })} */}
      <label className="w-full">
        <input
          type="text"
          placeholder="Name"
          required={true}
          className="w-full p-[10px] rounded-sm bg-slate-800 shadow-sm shadow-indigo-400"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </label>
      {/* <label className="w-full">
        <input
          type="number"
          placeholder="Age"
          required={true}
          className="w-full p-[10px] rounded-sm bg-slate-800 shadow-sm shadow-indigo-400"
          onChange={(e) => setAge(e.target.value)}
          value={age}
        />
      </label> */}
      {/* <label className="w-full">
        <input
          type="email"
          placeholder="Email"
          required={true}
          className="w-full p-[10px] rounded-sm bg-slate-800 shadow-sm shadow-indigo-400"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label> */}

      <label className="w-full">
        <input
          type="password"
          placeholder="Password"
          required={true}
          className="w-full p-[10px] rounded-sm bg-slate-800 shadow-sm shadow-indigo-400"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>
      {/* <label className="w-full">
        <input
          type="text"
          placeholder="address"
          className="w-full p-[10px] rounded-sm bg-slate-800 shadow-sm shadow-indigo-400"
          onChange={(e) => setAddress(e.target.value)}
          value={address}
        />
      </label> */}
      {/* <label className="w-full">
        <input
          type="number"
          placeholder="salary"
          className="w-full p-[10px] rounded-sm bg-slate-800 shadow-sm shadow-indigo-400"
          onChange={(e) => setSalary(e.target.value)}
          value={salary}
        />
      </label> */}
      <button type="submit" className="bg-indigo-500 p-2 rounded-md">
        Submit
      </button>
    </form>
  );
};

export default AdminLogin;
