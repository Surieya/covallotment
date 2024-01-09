import React from "react";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import useAuth from "../hooks/UseAuth";
import { useNavigate } from "react-router-dom";
// const URL = "http://localhost:8000";
const URL = "http://localhost:8000";

const Hospitals = ({ hospital, id }) => {
  const queryClient = useQueryClient();
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (id) => {
      const res = await axios.delete(URL + `/api/hospitals/${id}`, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
          "Content-Type": "application/json",
        },
      });
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
  function handleClick() {
    mutation.mutate(id);
  }
  return (
    <main className="bg-slate-900 h-auto flex flex-col items-center gap-3 w-full">
      <section className="flex justify-between flex-col items-center text-white w-full md:w-[70%] shadow-md shadow-indigo-200 rounded-md text-[12px]">
        <section className="flex justify-between items-center text-white w-full p-5 rounded-md text-[12px]">
          <div className="flex flex-col gap-2">
            <p className="text-[14px] text-slate-400">HOSPITAL NAME</p>
            <p>{hospital.name}</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[14px] text-slate-400">CITY</p>
            <p>{hospital.city}</p>
          </div>{" "}
          <div className="flex flex-col gap-2">
            <p className="text-[14px] text-slate-400">AREA</p>
            <p>{hospital.area}</p>
          </div>
          <button
            className="bg-red-500 p-2 rounded-md text-white"
            onClick={handleClick}
          >
            Remove Hospital
          </button>
        </section>
        <div className="flex w-full px-5 py-3 justify-between items-center">
          <p className="text-[14px] text-slate-400">ADDRESS</p>
          <p>{hospital.address}</p>
        </div>
      </section>
    </main>
  );
};

export default Hospitals;
