import React, { useEffect } from "react";
import { useContext } from "react";
import { userdata } from "../userContext";
import { NavLink, Navigate } from "react-router-dom";
import axios from "axios";
import '../app.css'
import { Outlet } from "react-router-dom";
const Account = () => {
  const { user, ready ,setUser} = useContext(userdata);

  if (!ready) {
    return "Loading....`";
  }

  if (ready && !user) {
    return <Navigate to={"/login"} />;
  }

  const handelckick = async()=>{
      await axios.post('/user/logout')
      setUser(null)
  }

  return (
    <div className="w-full flex justify-center flex-col items-center" >
      <nav className="w-full flex justify-center mt-4 gap-x-7" >
        <NavLink className="rounded-full  px-4 py-2 mt-3 font-bold" to={"/account"} end>My Account</NavLink>
        <NavLink className=" rounded-full text-black px-4 py-2 mt-3 font-bold" to={"/account/booking"}>My Bookings</NavLink>
        <NavLink className="rounded-full text-black px-4 py-2 mt-3 font-bold" to={"/account/places"}>My accommodations</NavLink>
      </nav>
  
      <Outlet/>
      <p>Logged in as {user?.data?.name} <span className="underline text-blue-300" > ( {user?.data?.email} )</span></p>
      <button onClick={handelckick} >Logout</button>
    </div>
  );
};

export default Account;
