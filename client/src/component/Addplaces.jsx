import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Perks from "./Perks";
import axios from "axios";
import { useContext } from "react";
import { userdata } from "../userContext";
import { useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";
const Addplaces = () => {
  const { user, setPlaces } = useContext(userdata);
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
  const [redirect, setRedirect] = useState("");
  const [prices,setPrices] = useState('')
  const { id } = useParams();

  const printp = (dep) => {
    return <p>{dep}</p>;
  };
  console.log(user);
  const printtitle = (text, dep) => {
    return (
      <>
        <h2>{text}</h2>
        {printp(dep)}
      </>
    );
  };

  const handelphotoslink = async (e) => {
    e.preventDefault();
    const allimages = await axios.post("/user/upload-by-link", {
      link: photoslink,
    });
    setAddedphotos([...addedphotos, allimages.data]);
  };
  const handelfile = async (e) => {
    const data = new FormData();
    const files = e.target.files;
    console.log(files);
    for (let i = 0; i <= files.length; i++) {
      data.append("photos", files[i]);
    }
    const datafile = await axios.post("/user/upload", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    setAddedphotos([...addedphotos, ...datafile.data.msg]);
  };
  const handelsubmit = async (e) => {
    e.preventDefault();

    const data = {
      title,
      address,
      description,
      perkes,
      checkin,
      checkout,
      maxGuest,
      extraInfo,
      addedphotos,
      prices,
      owner: user?.id ? user?.id : user?._id,
    };
    if (id) {
      const newData = await axios.put("/user/places", { ...data, id });
      console.log(newData.data);
    } else {
      if (
        title &&
        address &&
        description &&
        checkin &&
        checkout &&
        maxGuest &&
        extraInfo
      ) {
        const placeData = await axios.post("/user/places", data);
        setRedirect("/account/places");
      } else {
        alert("Form is empty");
      }
    }
  };
  if (redirect) {
    // return <Navigate to={redirect} />
  }

  useEffect(() => {
    if (!id) {
      return;
    }

    axios
      .get(`/user/${id}`)
      .then((res) => {
        setTitle(res.data.title);
        setDescription(res.data.description);
        setAddress(res.data.address);
        setCheckin(res.data.checkin);
        setCheckout(res.data.checkout);
        setMaxguest(res.data.maxGuest);
        setExtrainfo(res.data.extraInfo);
        setAddedphotos(res.data.addedphotos);
        setPerkas(res.data.perkes);
        setPrices(res.data.prices)
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  const handeldelet = (e) => {
    const deletedimg = addedphotos.filter((m) => {
      if (m !== e) {
        return m;
      }
    });
    console.log(deletedimg);
    setAddedphotos(deletedimg);
  };
  const maketop= (e)=>{
    const filterdata = addedphotos.filter((m)=>{
      if(e !== m){
        return m
      }
    })
    setAddedphotos([e,...filterdata])

  }
  return (
    <div>
      <form className="flex flex-col w-full gap-y-2" onSubmit={handelsubmit}>
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
          <button
            onClick={handelphotoslink}
            className="text-white font-bold bg-primary p-2 rounded-full ml-3"
          >
            {" "}
            Add photos
          </button>
        </div>
        <div className="flex gap-x-5">
          {addedphotos.length > 0 &&
            addedphotos.map((e, i) => {
              return (
                <div className="relative" key={i}>
                 
                  <img
                    className="w-32 rounded-lg object-cover "
                    src={`http://127.0.0.1:3000/upload/${e}`}
                    alt=""
                  />
                  <span
                    onClick={() => handeldelet(e)}
                    className="bg-black p-1 cursor-pointer absolute text-white bottom-2 right-2 bg-opacity-50 rounded-lg"
                  >
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
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </span>
                  <span
                    onClick={() => maketop(e)}
                    className="bg-black p-1 cursor-pointer absolute text-white bottom-2 left-2 bg-opacity-50 rounded-lg"
                  >
                    {e == addedphotos[0] &&<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
</svg>
}
{e !== addedphotos[0] && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
</svg>

}


                  </span>
                </div>
              );
            })}
        </div>
        <div className="">
          <img src="" alt="" />
          <label className=" cursor-pointer p-4 border px-9 rounded-md flex gap-x-1 w-44 py-9">
            <input
              multiple
              type="file"
              className="hidden"
              onChange={handelfile}
            />{" "}
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
        <Perks selected={perkes} onChange={setPerkas} />
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
          <div className="">
            <h4>Prices</h4>
            <input
              value={prices}
              onChange={(ev) => setPrices(ev.target.value)}
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
