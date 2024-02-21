import React from "react";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/UseAuth";
const URL = "https://covallotment.onrender.com";

const Form = ({ details, id }) => {
  const [slot, setSlot] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const { auth, setAuth } = useAuth();
  const queryClient = useQueryClient();
  const location = useLocation();
  const navigate = useNavigate();
  //   console.log(auth);

  const mutation = useMutation({
    mutationFn: async (id) => {
      //   console.log(auth?.accessToken);
      const res = await axios.put(
        URL + `/api/hospitals/${id}`,
        {
          details: {
            ...details,
            [slot]: details[slot] - 1,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${auth?.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries("hospitals");
      console.log(data);
      //toastify
    },
    onError: () => {
      console.log("Onerror");
      setAuth({});
      navigate("/login", { state: { from: location }, replace: true });
      //   console.log(auth);
      //toastify
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    console.log({
      name,
      age,
      slot,
    });
    mutation.mutate(id);
    setAge("");
    setName("");
    setSlot("");
  }

  return (
    <form
      className="bg-slate-800 flex flex-col w-[80%] gap-3 p-10 shadow-lg shadow-indigo-500 rounded-md text-slate-200"
      onSubmit={handleSubmit}
    >
      <h1>ENTER DETAILS OF CANDIDATE</h1>
      <section className="flex justify-around items-center text-white w-full p-5 rounded-md text-[12px] border-2 border-indigo-200 relative">
        {Object.entries(details).map((entry) => {
          return (
            <div key={entry[0]}>
              <p className="text-[14px] text-slate-400">{entry[0]} am</p>
              <p>Available Slots:{entry[1]}</p>
            </div>
          );
        })}
      </section>
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
      <label className="w-full">
        <input
          type="text"
          placeholder="Age"
          required={true}
          className="w-full p-[10px] rounded-sm bg-slate-800 shadow-sm shadow-indigo-400"
          onChange={(e) => setAge(e.target.value)}
          value={age}
        />
      </label>
      <select
        className="w-full text-slate-300 bg-slate-800 shadow-sm shadow-indigo-400 text-[15px]"
        onChange={(e) => setSlot(e.target.value)}
      >
        <option
          className="w-full p-[10px] rounded-sm bg-slate-800 shadow-sm shadow-indigo-400 text-gray-100"
          disabled={true}
        >
          Select Slot
        </option>
        {Object.entries(details).map((entry) => {
          return (
            <>
              <option
                disabled={entry[1] <= 0 ? true : false}
                key={entry[0]}
                className="w-full p-[10px] rounded-sm bg-slate-800 shadow-sm shadow-indigo-400 text-gray-100 flex justify-between"
              >
                {entry[0]}
              </option>
            </>
          );
        })}
      </select>

      <button type="submit" className="bg-indigo-500 p-2 rounded-md">
        Submit
      </button>
    </form>
  );
};

export default Form;
