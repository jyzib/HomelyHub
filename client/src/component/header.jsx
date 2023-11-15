import React from 'react'
import { Link } from 'react-router-dom'
import {useContext } from 'react'
import { userdata } from '../userContext'
const header = () => {
  const {user} = useContext(userdata)
console.log(user)
  return (
    <div className="flex  justify-between items-center">
      <div className="flex gap-2 items-center ">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 -rotate-90">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
</svg>
<Link to={'/'}><span className='font-bold' >Yatharthriti</span></Link>
</div>
<div className="flex gap-2 shadow-lg p-4 border rounded-full">
  <div className="">Any Work</div>
  <div className="border border-gray-200"></div>
  <div className="">Any time</div>
  <div className="border border-gray-200"></div>
  <div className="">Add guest</div>
  <button className='bg-primary rounded-full p-1 text-white' >
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
</svg>
</button>

</div>
<div className="flex gap-2 shadow-lg p-2 border rounded-full items-center">

<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
</svg>
<div className="bg-gray-400 p-1 rounded-full">
<Link to={user?.data?'/account':'/login'} >
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
  <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
</svg>

</Link>

</div>
{user&&(
<div>
  {user?.data?.name}
</div>)}
</div>
</div>
  )
}

export default header
