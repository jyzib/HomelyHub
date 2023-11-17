import React from 'react'
import { useContext } from 'react'
import { userdata } from '../userContext'
import axios from 'axios'
const Myaccount = () => {
  const {user,setUser} = useContext(userdata)
  const handelckick = async()=>{
    await axios.post('/user/logout')
    setUser(null)
}
  return (
    <div>
      account
      <p>Logged in as {user?.name} <span className="underline text-blue-300" > ( {user?.email} )</span></p>
      <button onClick={handelckick} >Logout</button>
    </div>
  )
}

export default Myaccount
