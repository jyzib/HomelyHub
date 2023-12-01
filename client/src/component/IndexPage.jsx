import React, { useEffect } from 'react'
import axios from 'axios'

const IndexPage = () => {

useEffect(()=>{
  const callfun = async ()=>{

    const dataall = await axios.get('http://localhost:3000/user/places')
    console.log(dataall.data.allplaaces)
  }
  callfun()
},[])

  return (
    <div>
      index
    </div>
  )
}

export default IndexPage
