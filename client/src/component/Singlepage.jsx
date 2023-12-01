import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect,useState } from 'react'
import axios from 'axios'
const Singlepage = () => {
  const [places ,setPlaces ] = useState(null)
    const {id} = useParams()
    useEffect(()=>{
      axios.get(`/user/${id}`).then((res)=>{
        setPlaces(res.data)
      }).catch((err)=>{
        console.log(err)
      })
console.log(places?.title)
    },[id])
    console.log(id)
  return (

<div>
        <h1>{places?.title}</h1>
        <a href={`https://www.google.com/maps/place/${places?.address
}`} target="_blank" rel="noreferrer" >{places?.address
}</a>   
</div>
  )
}

export default Singlepage
