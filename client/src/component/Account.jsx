import React, { useEffect  } from "react";
import { useContext ,useState } from "react";
import { userdata, } from "../userContext";
import { NavLink, Navigate } from "react-router-dom";
import axios from "axios";
import '../app.css'
import { Outlet } from "react-router-dom";
axios
const Account = () => {
  const { user, ready ,setUser} = useContext(userdata);
  const [redirect,setredirect] = useState(false)
  console.log('ma9n')
  useEffect(()=>{
 
    axios.get('/user/profile').then((data)=>{
      setredirect(data.data.status)
     
    })

},[])
  console.log(redirect)

if(redirect){
  console.log('login')
}else{
  console.log('logout')
}

 



  return (
    <div className="w-full flex justify-center flex-col items-center" >
      <nav className="w-full flex justify-center mt-4 gap-x-7" >
        <NavLink className="rounded-full  px-4 py-2 mt-3 font-bold" to={"/account"} end>My Account</NavLink>
        <NavLink className=" rounded-full text-black px-4 py-2 mt-3 font-bold" to={"/account/booking"}>My Bookings</NavLink>
        <NavLink className="rounded-full text-black px-4 py-2 mt-3 font-bold" to={"/account/places"}>My accommodations</NavLink>
      </nav>
  
      <Outlet/>
     
    </div>
  );
};

export default Account;
