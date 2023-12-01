import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { Link } from 'react-router-dom'
const IndexPage = () => {
  const [places,setPlaces] = useState([])

useEffect(()=>{
  const callfun = async ()=>{
    const dataall = await axios.get('http://localhost:3000/user/places')
    setPlaces(dataall.data.allplaaces)
    console.log(dataall.data.allplaaces)
  }
  callfun()
},[])

  return (
    <div className='grid grid-cols-3 gap-6 p-10 shadow-lg' >
      {places.length > 0 && places.map((e)=>{
        return (
          <Link className='shadow-lg p-2 rounded-sm' to={`/places/${e._id}`}  key={e._id} >
        <div  >
          <div className=" rounded-md h-48 ">
          <img className='w-full rounded-md h-full object-cover' src={`http://127.0.0.1:3000/upload/${e.addedphotos[0]}`} alt="" />
          </div>
        <h2>{e.title}</h2>
        <p className='text-gray-700' >{e.address}</p>
        <p>{e.prices && '₹ ' + e.prices + ' per night'}</p>
        </div>
        </Link>
        )

      })}
    </div>
  )
}

export default IndexPage
