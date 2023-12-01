import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect,useState } from 'react'
import axios from 'axios'
const Singlepage = () => {
  const [allimg,setAllimg] = useState(false)
  const [places ,setPlaces ] = useState(null)
    const {id} = useParams()
    useEffect(()=>{
      axios.get(`/user/${id}`).then((res)=>{
        setPlaces(res.data)
      }).catch((err)=>{
        console.log(err)
      })
      console.log(places?.addedphotos)

    },[id])
    if(allimg){
      return (
        <div className="bg-black fix flex flex-col w-full gap-5 items-center  justify-center relative p-3">
          <button onClick={()=>setAllimg(false)} className='bg-white flex items-center justify-center gap-x-2 fixed top-24 right-20 p-1 rounded-md' >Close<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
  <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
</svg>
</button>
          {places?.addedphotos.length>0&&(
            places?.addedphotos.map((img)=>{
              return (
                <img key={img}  className='aspect-square object-cover w-3/6' src={`http://127.0.0.1:3000/upload/${img}`} alt="" />
              )
            })
          )}

        </div>
       
      )
    }
  return (

<div className='bg-gray-50 p-6' >
        <h1 className=' text-black text-lg font-bold' >{places?.title}</h1>
        <a className='my-4 underline font-semibold text-sm flex gap-x-2' href={`https://www.google.com/maps/place/${places?.address
}`} target="_blank" rel="noreferrer" ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
<path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
<path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
</svg>
{places?.address
}</a>   
<div className="grid rounded-3xl overflow-hidden gap-2 grid-cols-[2fr_1fr] relative">
 
    {places?.addedphotos[0] &&    <img className='aspect-square object-cover w-full' src={`http://127.0.0.1:3000/upload/${places?.addedphotos[0]}`} alt="" />}
 

  <div className="grid ">
    <div className="">    {places?.addedphotos[1] &&    <img className='aspect-square object-cover' src={`http://127.0.0.1:3000/upload/${places?.addedphotos[1]}`} alt="" />}</div>
    <div className="overflow-hidden">    {places?.addedphotos[2] &&    <img className='aspect-square object-cover relative  top-2' src={`http://127.0.0.1:3000/upload/${places?.addedphotos[2]}`} alt="" />}</div>
  </div>
  {places?.addedphotos[3] && <button onClick={()=>setAllimg(true)} className=' flex  align-middle gap-x-2 absolute bottom-2 right-1 bg-slate-50 p-2 text-sm rounded-md shadow-sm border border-black' ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
  <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
</svg>

Show all photos</button>}
  
</div>
</div>
  )
}

export default Singlepage
