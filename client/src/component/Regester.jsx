import { useState } from 'react'
import axios from 'axios'

import { Link } from 'react-router-dom'
const Regester = () => {
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
const handelsubmit =async (e)=>{
e.preventDefault()
try {
  
  const data = await axios.post('/user/register',{
    name,email,password
  
  })
  console.log(data.data)
  alert('register succesfull')
} catch (error) {
  console.log(error)
  alert('register faild ')
}


setEmail('')
setName('')
setPassword('')

}
  return (
    <div>
         <div className="flex justify-around h">
    <div className="">
        <h1 className="text-center p-3 text-xl font-bold font-sans" >Regester</h1>
  <form onSubmit={handelsubmit} className=" w-2/2 flex gap-y-1 flex-col "  >
    <input onChange={(e)=>setName(e.target.value)} className='border p-2 rounded-lg' value={name} type="text" placeholder='john deo'/>
    <input onChange={(e)=>setEmail(e.target.value)}  className="border p-2 rounded-lg" value={email} type="email" placeholder="your@email.com" />
    <input onChange={(e)=>setPassword(e.target.value)}  className="border p-2 rounded-lg" value={password} type="password" placeholder="password"/>
    <button className="bg-primary text-white p-1 rounded-md" >Regester</button>
  </form>
  <p>Don't have a Account <Link className="text-blue-500 underline" to={'/login'}>login</Link></p>
    </div>
    </div>
    </div>
  )
}

export default Regester
