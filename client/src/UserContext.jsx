import { createContext } from "react"
import { useState,useEffect } from "react"
import axios from "axios"
export const userdata = createContext({})

const UserContext = ({children}) => {
    const [user,setUser] = useState(null)
    const [ready,setReady] = useState(false)
   useEffect(()=>{
    console.log(user?.data)
    if(!user){
        axios.get('/user/profile').then((data)=>{setUser(data)})
        setReady(true)
    }
   },[])
  return (
    <>
    <userdata.Provider value={{user,setUser,ready}}>
  {children}
    </userdata.Provider>
    </>
  )
}

export default UserContext
