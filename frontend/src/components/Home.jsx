import React from "react";
import { useState } from "react";
import Navbar from "./Navbar";
import HospitalDetails from "./HospitalDetails";
import axios from "axios";
import { useQuery } from "react-query";

const URL = "https://covallotment.onrender.com";

const Home = () => {
  console.log("HOME");
  const { data, isLoading } = useQuery({
    queryKey: "hospitals",
    queryFn: async () => {
      const res = await axios.get(URL + "/api/hospitals");
      // console.log(res.data);
      return res.data;
    },
  });
  // console.log(data);
  return (
    <main className="bg-slate-900 min-h-screen h-auto flex flex-col items-center gap-3 overscroll-y-auto pb-5">
      <Navbar />
      <h1 className="text-white text-[20px]">HOSPITAL DETAILS</h1>
      {data?.map((hospital) => {
        // console.log(hospital);
        return <HospitalDetails hospital={hospital} key={hospital.id} />;
      })}
    </main>

    //     <select
    //   className="w-full text-slate-300 bg-slate-800 shadow-sm shadow-indigo-400 text-[15px]"
    //   onChange={(e) => setDesignation(e.target.value)}
    // >
    //   <option
    //     className="w-full p-[10px] rounded-sm bg-slate-800 shadow-sm shadow-indigo-400 text-gray-100"
    //     disabled={true}
    //   >
    //     Designation
    //   </option>
    //   {options.map((option, i) => {
    //     return (
    //       <option
    //         key={i}
    //         className="w-full p-[10px] rounded-sm bg-slate-800 shadow-sm shadow-indigo-400 text-gray-100"
    //       >
    //         {option}
    //       </option>
    //     );
    //   })}
    //   {/* type="date"
    //     placeholder="dob"
    //     className="w-full p-[10px] rounded-sm bg-slate-800 shadow-sm shadow-indigo-400 text-gray-100"
    //     onChange={(e) => setdob(e.target.value)}
    //     value={dob} */}
    // </select>
  );
};

export default Home;
