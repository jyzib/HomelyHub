import { BrowserRouter,Route,Routes } from "react-router-dom"
import axios from "axios"
import {Header,Loginpage,IndexPage} from './component'
import Layout from "./component/Layout"
import Regester from "./component/Regester"
import Account from "./component/Account"
import UserContext from "./UserContext"
import Booking from "./component/Booking"
import Places from "./component/Places"
import Myaccount from "./component/Myaccount"
import Allplace from "./component/Allplace"
import Addplaces from "./component/Addplaces"
import Singlepage from "./component/Singlepage"
axios.defaults.baseURL = 'http://127.0.0.1:3000'
axios.defaults.withCredentials = true;
function App() {
  
  return (
    <>
<UserContext>

    <Routes>
      <Route path="/" element={<Layout/>} >
      <Route index element={<IndexPage/>} />
      <Route path="/login" element={<Loginpage/>}/>
      <Route path="/regester" element={<Regester/>}/>
      <Route path="/account" element={<Account/>}>
      <Route index element={<Myaccount/>} />
      <Route path="booking" element={<Booking/>} />
      <Route path="places" element={<Places/>}>
      <Route index element={<Allplace/>}/>
    
      <Route path="new" element={<Addplaces/>} />
      <Route path="new/:id" element={<Addplaces/>} />
     
      </Route>


      </Route>
      <Route  path="places/:id"  element={<Singlepage/>} />
      </Route>

    </Routes>
    </UserContext>

    </>
  )
}

export default App
