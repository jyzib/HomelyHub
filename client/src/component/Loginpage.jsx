import { Link } from "react-router-dom"
import { Navigate } from "react-router-dom"
import { useState,useContext } from "react"
import axios from "axios"
import { userdata } from "../userContext"
const Loginpage = () => {
  const {setUser,setlogin} = useContext(userdata)
  
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [redirect,setRedirect] = useState(false)
  const [login,setLogin] = useState(false)
    const handelsubmit =async (e)=>{
 e.preventDefault()
 const logindata = await axios.post('/user/login',{
  email,
  password,
 })
 setEmail('')
 setPassword('')
console.log(logindata.data.status)
if(logindata.data.status){
  setlogin('login')
  setUser(logindata.data.data)
  setRedirect(logindata.data.status)
  setLogin(false)
}else{
  setLogin(true)
}
 
    }
    if(redirect){
     return <Navigate to={'/'} />
    }


  return (
    <div className="flex justify-around h">
    <div className="">
        <h1 className="text-center p-3 text-xl font-bold font-sans" >Login</h1>
  <form className=" w-2/2 flex gap-y-1 flex-col " onSubmit={handelsubmit} >
    <input onChange={(e)=>setEmail(e.target.value)}  value={email} className="border p-2 rounded-lg" type="email" placeholder="your@email.com" />
    <input onChange={(e)=>setPassword(e.target.value)} value={password} className="border p-2 rounded-lg" type="password" placeholder="password"/>
    <button className="bg-primary text-white p-1 rounded-md" >Login</button>
  </form>
  <p className="pt-2" >Don't have a Account yet <Link className="text-blue-500 underline" to={'/regester'}>Regester</Link></p>
  {login && (<p>Wrong password</p>)}
    </div>
    </div>
  )
}

export default Loginpage
