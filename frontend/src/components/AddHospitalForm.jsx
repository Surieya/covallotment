import React from "react";
import { useState } from "react";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
const URL = "http://localhost:8000";

import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/UseAuth";
const AddHospitalForm = () => {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [address, setAddress] = useState("");
  const queryClient = useQueryClient();
  const { auth, setAuth } = useAuth();
  const [slot1, setSlot1] = useState({
    time: "",
    seats: "",
  });
  const [slot2, setSlot2] = useState({
    time: "",
    seats: "",
  });
  const navigate = useNavigate();
  const location = useLocation();

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await axios.post(
        URL + `/api/hospitals`,
        {
          name: name,
          city: city,
          area: area,
          address: address,
          details: {
            [slot1.time]: slot1.seats,
            [slot2.time]: slot2.seats,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("hospitals");
    },
    onError: () => {
      setAuth({});
      navigate("/login", { state: { from: location }, replace: true });
    },
  });
  function handleSubmit(e) {
    e.preventDefault();
    console.log({
      name,
      city,
      area,
      address,
      slot1,
      slot2,
    });

    mutation.mutate();
    setName("");
    setCity("");
    setArea("");
    setAddress("");
    setSlot1({
      time: "",
      seats: "",
    });
    setSlot2({
      time: "",
      seats: "",
    });
  }
  return (
    <form
      className="bg-slate-800 flex flex-col w-[80%] gap-3 p-10 shadow-lg shadow-indigo-500 rounded-md text-slate-200"
      onSubmit={handleSubmit}
    >
      <h1>ENTER DETAILS OF HOSPITAL</h1>
      <section className="flex justify-around items-center text-white w-full p-5 rounded-md text-[12px] border-2 border-indigo-200 relative"></section>
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
          placeholder="City"
          required={true}
          className="w-full p-[10px] rounded-sm bg-slate-800 shadow-sm shadow-indigo-400"
          onChange={(e) => setCity(e.target.value)}
          value={city}
        />
      </label>
      <label className="w-full">
        <input
          type="text"
          placeholder="Area"
          required={true}
          className="w-full p-[10px] rounded-sm bg-slate-800 shadow-sm shadow-indigo-400"
          onChange={(e) => setArea(e.target.value)}
          value={area}
        />
      </label>
      <label className="w-full">
        <input
          type="text"
          placeholder="Address"
          required={true}
          className="w-full p-[10px] rounded-sm bg-slate-800 shadow-sm shadow-indigo-400"
          onChange={(e) => setAddress(e.target.value)}
          value={address}
        />
      </label>
      <label className="w-full">
        <input
          type="text"
          placeholder="Slot-1 Timing"
          required={true}
          className="w-full p-[10px] rounded-sm bg-slate-800 shadow-sm shadow-indigo-400"
          onChange={(e) =>
            setSlot1({
              ...slot1,
              time: e.target.value,
            })
          }
          value={slot1.time}
        />
      </label>
      <label className="w-full">
        <input
          type="text"
          placeholder="Slot-1 seats"
          required={true}
          className="w-full p-[10px] rounded-sm bg-slate-800 shadow-sm shadow-indigo-400"
          onChange={(e) =>
            setSlot1({
              ...slot1,
              seats: e.target.value,
            })
          }
          value={slot1.seats}
        />
      </label>
      <label className="w-full">
        <input
          type="text"
          placeholder="Slot-2 Timing"
          required={true}
          className="w-full p-[10px] rounded-sm bg-slate-800 shadow-sm shadow-indigo-400"
          onChange={(e) =>
            setSlot2({
              ...slot2,
              time: e.target.value,
            })
          }
          value={slot2.time}
        />
      </label>
      <label className="w-full">
        <input
          type="text"
          placeholder="Slot-2 seats"
          required={true}
          className="w-full p-[10px] rounded-sm bg-slate-800 shadow-sm shadow-indigo-400"
          onChange={(e) =>
            setSlot2({
              ...slot2,
              seats: e.target.value,
            })
          }
          value={slot2.seats}
        />
      </label>

      <button type="submit" className="bg-indigo-500 p-2 rounded-md">
        Submit
      </button>
    </form>
  );
};

export default AddHospitalForm;
