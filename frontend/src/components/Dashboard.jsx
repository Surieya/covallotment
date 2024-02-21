import React from "react";
import { useState } from "react";
import Hospitals from "./Hospitals";
import { useQuery } from "react-query";
import axios from "axios";
import useAuth from "../hooks/UseAuth";
import { Navigate } from "react-router-dom";
import AddHospitalForm from "./AddHospitalForm";
const URL = "https://covallotment.onrender.com";
const Dashboard = () => {
  const [showHospitals, setShowHospitals] = useState(true);
  const [showUsers, setShowUsers] = useState(false);
  const [showform, setShowForm] = useState(false);
  const { auth, setAuth } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: "hospitals",
    queryFn: async () => {
      const res = await axios.get(URL + "/api/hospitals");
      // console.log(res.data);
      return res.data;
    },
  });

  function handleClick(type) {
    switch (type) {
      case "hospitals":
        setShowForm(false);
        setShowUsers(false);
        setShowHospitals(true);
        break;
      case "users":
        setShowHospitals(false);
        setShowForm(false);
        setShowUsers(true);
        break;

      case "addnew":
        setShowHospitals(false);
        setShowUsers(false);
        setShowForm(true);
        break;

      default:
        setShowForm(false);
        setShowUsers(false);
        setShowHospitals(true);
    }
  }

  return (
    <>
      {auth && auth?.name && (
        <main className="bg-slate-900 min-h-screen h-auto flex flex-col items-center gap-3 overscroll-y-auto p-5">
          <h1 className="text-white text-[20px]">DASHBOARD</h1>
          <div className="bg-slate-700 flex justify-between items-center text-white w-full md:w-[70%] shadow-md shadow-indigo-200 rounded-md text-[14px] p-5">
            <button onClick={() => handleClick("hospitals")}>Hospitals</button>
            <button onClick={() => handleClick("users")}>Users</button>
            <button onClick={() => handleClick("addnew")}>
              Add New Hospital
            </button>
          </div>

          {showHospitals &&
            data &&
            data.map((hospital, i) => {
              return <Hospitals hospital={hospital} id={hospital.id} key={i} />;
            })}

          {showform && data && <AddHospitalForm />}
        </main>
      )}
    </>
  );
};

export default Dashboard;
