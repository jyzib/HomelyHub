
import Header from './header'
import { Outlet } from 'react-router-dom'
const Layout = () => {
  return (
    <div className='p-2 min-h-screen'>
        <Header/>
        <Outlet/>
      
    </div>
  )
}

export default Layout
