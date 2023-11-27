import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Perks from "./Perks";
import axios from 'axios'
import { useContext } from "react";
import {userdata} from "../userContext";
import { useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";
const Addplaces = () => {
  const {user,setPlaces} = useContext(userdata);
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedphotos, setAddedphotos] = useState([]);
  const [photoslink, setPhptolinks] = useState("");
  const [description, setDescription] = useState("");
  const [perkes, setPerkas] = useState([]);
  const [extraInfo, setExtrainfo] = useState("");
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [maxGuest, setMaxguest] = useState(1);
  const [redirect,setRedirect] = useState('')
  const {id} = useParams()
 

  const printp = (dep) => {
    return <p>{dep}</p>;
  };
  console.log(user)
  const printtitle = (text, dep) => {
    return (
      <>
        <h2>{text}</h2>
        {printp(dep)}
      </>
    );
  };


  const handelphotoslink =async (e)=>{
    e.preventDefault()
const allimages = await axios.post('/user/upload-by-link',{link:photoslink})
setAddedphotos([...addedphotos,allimages.data])
}
const handelfile =async (e)=>{
    const data = new FormData()
    const files = e.target.files
    console.log(files)
    for(let i =0;i<=files.length;i++){
        data.append('photos',files[i])
    }
const datafile = await axios.post('/user/upload',data,{
    headers:{'Content-Type' :'multipart/form-data'}
})
setAddedphotos([...addedphotos,...datafile.data.msg])
}
const handelsubmit = async (e)=>{
e.preventDefault();

const data = {title,address,description,perkes,checkin,checkout,maxGuest,extraInfo,addedphotos,owner:user?.id?user?.id:user?._id}
if(id){
  const newData = await axios.put('/user/places',{...data,id})
  console.log(newData.data)
}else{

  if(title && address&& description&&checkin&&checkout&&maxGuest&&extraInfo){
  
    const placeData = await axios.post('/user/places',data)
    setRedirect('/account/places')

    // setPlaces(placeData.data.userplaces)
  }else{
   alert("Form is empty")
  }
}


}
if(redirect){
// return <Navigate to={redirect} />
}

useEffect( ()=>{
if(!id){
return
}

axios.get(`/user/${id}`).then((res)=>{
  setTitle(res.data.title)
  setDescription(res.data.description)
  setAddress(res.data.address)
  setCheckin(res.data.checkin)
  setCheckout(res.data.checkout)
  setMaxguest(res.data.maxGuest)
  setExtrainfo(res.data.extraInfo)
  setAddedphotos(res.data.addedphotos)
  setPerkas(res.data.perkes)
  
  

}).catch((err)=>{console.log(err)})


},[id])

  return (
    <div>
      <form className="flex flex-col w-full gap-y-2" onSubmit={handelsubmit} >
        {printtitle("Title", "title gose here")}
        <input
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          className="border p-1 px-3 rounded-full"
          type="text"
          placeholder="title forexample my lovely appartment"
        />

        <h2>Address</h2>
        <input
          value={address}
          onChange={(ev) => setAddress(ev.target.value)}
          className="border p-1 px-3 rounded-full"
          type="text"
          placeholder="Address"
        />
        <h2>Photos</h2>
        <div className="">
          <input
            value={photoslink}
            onChange={(ev) => setPhptolinks(ev.target.value)}
            className="border p-1 px-3 rounded-full"
            type="text"
            placeholder="add using a link..."
          />
          <button onClick={handelphotoslink} className="text-white font-bold bg-primary p-2 rounded-full ml-3">
            {" "}
            Add photos
          </button>
        </div>
        <div className="flex gap-x-5">
        {addedphotos.length > 0 && addedphotos.map((e,i)=>{
            return (  <img className="w-32 rounded-lg object-cover " key={i} src={`http://127.0.0.1:3000/upload/${e}`} alt=""/>)
        })}
        </div>
        <div className="">
            <img src="" alt="" />
          <label className=" cursor-pointer p-4 border px-9 rounded-md flex gap-x-1 w-44 py-9">
        <input multiple type="file" className="hidden" onChange={handelfile} />
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9.75v6.75m0 0l-3-3m3 3l3-3m-8.25 6a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
              />
            </svg>
            Upload
          </label>
        </div>

        <h2>Description</h2>
        <textarea
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
          className="border h-32 rounded-lg"
          name=""
          id=""
          cols="30"
          rows="10"
          placeholder=""
        ></textarea>
        <Perks selected={perkes} onChange={setPerkas}/>
        <h2>Extra info</h2>
        <p className="text-xs">house rules</p>
        <textarea
        value={extraInfo}
          onChange={(ev) => setExtrainfo(ev.target.value)}
          className="border h-20 rounded-lg"
          name=""
          id=""
          cols="30"
          rows="10"
        ></textarea>
        <h2>Check In & Check Out , Max Guests</h2>
        <div className="flex gap-x-2">
          <div className="">
            <h4>Check in time</h4>
            <input
              value={checkin}
              onChange={(ev) => setCheckin(ev.target.value)}
              className="border p-1 px-3 rounded-full"
              type="text"
              placeholder="14:00"
            />
          </div>
          <div className="">
            <h4>Check out time</h4>
            <input
              value={checkout}
              onChange={(ev) => setCheckout(ev.target.value)}
              className="border p-1 px-3 rounded-full"
              type="text"
              placeholder="14:00"
            />
          </div>
          <div className="">
            <h4>Max Guest</h4>
            <input
              value={maxGuest}
              onChange={(ev) => setMaxguest(ev.target.value)}
              className="border p-1 px-3 rounded-full"
              type="text"
              placeholder="14:00"
            />
          </div>
        </div>

        <button className="bg-primary p-2 rounded-full  mt-2">Save</button>
      </form>
     
    </div>
  );
};

export default Addplaces;
