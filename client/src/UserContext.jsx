import { createContext } from "react"
import { useState,useEffect } from "react"
import axios from "axios"
export const userdata = createContext({})

const UserContext = ({children}) => {
    const [user,setUser] = useState(null)
    const [ready,setReady] = useState(false)
    const [places,setPlaces] = useState([])
   useEffect(()=>{
    
    if(!user?.data){
   
        axios.get('/user/profile').then((data)=>{
          console.log(data.data)
            setUser(data.data.user)
            setReady(data.data.status)
            
        })
    }
   },[])

  return (
    <>
    <userdata.Provider value={{user,setUser,ready,setPlaces,places}}>
  {children}
    </userdata.Provider>
    </>
  )
}

export default UserContext
