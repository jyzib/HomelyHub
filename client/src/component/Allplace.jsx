import React from 'react'
import { Link } from 'react-router-dom'

const Allplace = () => {
  return (
    <div>
        <Link className='bg-primary p-2 rounded-full px-4' to={'/account/places/new'} >Add place</Link>
        allplaces
      
    </div>
  )
}

export default Allplace
