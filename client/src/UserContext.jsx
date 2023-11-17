import { createContext } from "react"
import { useState,useEffect } from "react"
import axios from "axios"
export const userdata = createContext({})

const UserContext = ({children}) => {
    const [user,setUser] = useState(null)
    const [ready,setReady] = useState(false)
   useEffect(()=>{
    console.log(user?.data)
    if(!user?.data){
      console.log('object')
        axios.get('/user/profile').then((data)=>{
            setUser(data.data.user)
            setReady(data.data.status)
            
        })
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
