import { createContext } from "react"
import { useState,useEffect } from "react"
import axios from "axios"
export const userdata = createContext({})

const UserContext = ({children}) => {
    const [user,setUser] = useState([])
    const [ready,setReady] = useState(false)
    const [places,setPlaces] = useState([])
    const [islogin,setlogin] = useState('')
    console.log(user)
   useEffect(()=>{
    
    if(!user?.data){
   
        axios.get('/user/profile').then((data)=>{
          console.log(data.data)
            setUser(data.data.user)
            setReady(data.data.status)
            
        })
    }
   },[islogin])

  return (
    <>
    <userdata.Provider value={{user,setUser,setlogin,ready,setPlaces,places}}>
  {children}
    </userdata.Provider>
    </>
  )
}

export default UserContext
