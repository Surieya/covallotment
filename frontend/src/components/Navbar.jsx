import React from "react";
import useAuth from "../hooks/UseAuth";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { auth, setAuth } = useAuth();
  function handleLogout() {
    setAuth({});
  }
  return (
    <nav className="flex justify-between items-center p-4 bg-slate-900 h-[15vh] w-full text-white shadow-md shadow-indigo-200">
      <div className="logo">
        <h1 className="text-2xl font-semibold">VACCINATION</h1>
      </div>
      <ul className="nav-links flex gap-4">
        {auth?.name ? (
          <>
            <p>Hello {auth.name}</p>
            {/* <li className="text-2xl relative">
              <Link to="/cart">
                <span className="text-[12px] w-[20px] h-[20px] flex justify-center items-center absolute rounded-full bg-red-500 top-[-5px] left-5">
                  {cart.count}
                </span>
                <FaShoppingCart />
              </Link>
            </li> */}
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
            {auth?.isAdmin && <Link to={"/dashboard"}>DashBoard</Link>}
          </>
        ) : (
          <>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
