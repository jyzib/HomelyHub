import React from 'react'
import { useParams } from 'react-router-dom'
const Singlepage = () => {
    const {id} = useParams()
    console.log(id)
  return (
    <div>
        <h1>{id}</h1>
      
    </div>
  )
}

export default Singlepage
