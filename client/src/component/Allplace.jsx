import React from 'react'
import { Await, Link } from 'react-router-dom'
import { useContext } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { userdata } from '../userContext'
import { useState } from 'react'
const Allplace = () => {
  const [users,setUser] = useState('')
  const {user} = useContext(userdata)
  const [places,setPlaces] = useState([])

// useEffect(()=>{
//     setUser(user)   
//   },[user])
  useEffect(()=>{
    const getdata = async (user)=>{

      const data =await axios.post('/user/Allplaces',{owner:user?._id ?user?._id:user?.id})
      setPlaces(data.data.userplaces)
      console.log( )
    }
   
    getdata(user)

  },[user])

  return (
    <div>
        <Link  className=' text-white font-bold bg-primary p-2 rounded-full px-4' to={'/account/places/new'} >Add place</Link>
     
        <div className=" w-2/3 m-auto">
        {places&&places.map((e,i)=>{
          console.log(e)
return (
<Link to={`/account/places/new/${e._id}`} className='flex gap-x-5 m-5 border rounded-md overflow-hidden shadow-lg cursor-pointer'  key={e._id} >
  <div className='w-32 '>
    <img className='object-contain' src={`http://127.0.0.1:3000/upload/${e.addedphotos[0]}`} alt="" />
  </div>

  <div className="w-3/6">
    <h3 className='font-bold' >{e.title}</h3>
    <p>{e.description.slice(0,90)}...</p>
  </div>


</Link>)
        })}
      </div>
    </div>
  )
}

export default Allplace
