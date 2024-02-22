import React from "react";
import { useState } from "react";
import useAuth from "./useAuth";
import Form from "./Form";
import { Link } from "react-router-dom";

const HospitalDetails = ({ hospital }) => {
  const [showModal, setShowModal] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const { auth } = useAuth();
  //   console.log(hospital);
  return (
    <>
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
          {auth?.name ? (
            <button
              className="bg-indigo-500 p-2 rounded-md text-white"
              onClick={() => setShowModal((prev) => !prev)}
            >
              Book a Slot
            </button>
          ) : (
            <Link
              to={"/login"}
              className="bg-indigo-500 p-2 rounded-md text-white"
            >
              Login to Book
            </Link>
          )}
        </section>
        <div className="flex w-full px-5 py-3 justify-between items-center">
          <p className="text-[14px] text-slate-400">ADDRESS</p>
          <p>{hospital.address}</p>
        </div>
      </section>

      {showModal && auth.name && (
        <section className="flex justify-around items-center text-white w-[80%] md:w-[50%] p-5 rounded-md text-[12px] border-2 border-indigo-200 relative">
          <button
            className="bg-red-500 absolute top-0 right-0 px-2 py-1 rounded-sm"
            onClick={() => setShowModal((prev) => !prev)}
          >
            X
          </button>
          {Object.entries(hospital.details).map((entry) => {
            return (
              <div key={entry[0]}>
                <p className="text-[14px] text-slate-400">{entry[0]} am</p>
                <p>Available Slots:{entry[1]}</p>
              </div>
            );
          })}
          {/* <div>
            <p>8AM</p>
            <p>Available Slots : 5</p>
          </div>
          <div>
            <p>8AM</p>
            <p>Available Slots : 5</p>
            <button className="bg-indigo-500 p-[8px] rounded-md text-white">
              Book now
            </button>
          </div>
          <div>
            <p>8AM</p>
            <p>Available Slots : 5</p>
            <button className="bg-indigo-500 p-[8px] rounded-md text-white">
              Book now
            </button>
          </div> */}
          <button
            onClick={() => setShowForm((prev) => !prev)}
            className="bg-indigo-500 p-[8px] rounded-md text-white"
          >
            Book now
          </button>
          {/* <div>
          <select>
            <option>8 Am</option>
            <option>8 Am</option>
            <option>8 Am</option>
          </select>
        </div> */}
        </section>
      )}

      {showForm && auth.name && (
        <main className="bg-transparent backdrop-blur-sm h-[100vh] w-full  border-2 flex justify-center items-center fixed">
          <button
            className="bg-indigo-500 p-[8px] rounded-md text-white absolute top-0 right-0"
            onClick={() => setShowForm((prev) => !prev)}
          >
            Close
          </button>
          <Form details={hospital.details} id={hospital.id} />
        </main>
      )}
    </>
  );
};

export default HospitalDetails;
