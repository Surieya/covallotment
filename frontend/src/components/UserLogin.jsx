import React from "react";
import { useState } from "react";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/UseAuth";
const URL = "http://localhost:8000";

const UserLogin = () => {
  console.log("User Login");
  const [name, setName] = useState("");
  // const [age, setAge] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { setAuth, auth } = useAuth();

  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const navigate = useNavigate();

  const postMutation = useMutation({
    mutationFn: async () => {
      // const res = await axios.post(
      //   URL + "/api/auth/login",
      //   {
      //     name,
      //     age: parseInt(age),
      //     email: email,
      //     password: password,
      //   },
      // {
      //     headers: {
      //       Authorization: `Bearer ${auth.accessToken}`,
      //       "Content-Type": "application/json",
      //     },
      //   }

      // );
      const res = await axios.post(URL + "/api/auth/login", {
        name,
        // age: parseInt(age),
        email: email,
        password: password,
      });
      console.log(res.data);
      return res.data;
    },
    onSuccess: (data) => {
      //   queryClient.invalidateQueries("employees");
      // setAuth({

      // })
      console.log("on success");
      console.log(data);
      //we need to set user here
      setAuth({
        name: data.name,
        accessToken: data.accessToken,
        isAdmin: data.isAdmin,
      });
      // navigate("/login", { state: { from: from }, replace: true });
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
      email,
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
    setEmail("");
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
      <h1>USER LOGIN</h1>
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
          type="text"
          placeholder="Age"
          required={true}
          className="w-full p-[10px] rounded-sm bg-slate-800 shadow-sm shadow-indigo-400"
          onChange={(e) => setAge(e.target.value)}
          value={age}
        />
      </label> */}
      <label className="w-full">
        <input
          type="email"
          placeholder="Email"
          required={true}
          className="w-full p-[10px] rounded-sm bg-slate-800 shadow-sm shadow-indigo-400"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>

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
        Login
      </button>
      <p className="text-sm">
        Did'nt have an account{" "}
        <Link to="/register">
          <span className="font-semibold">register</span>
        </Link>
      </p>
    </form>
  );
};

export default UserLogin;
