import React from 'react'
import Navbar from './navigator/Navbar'
import { useLocation } from 'react-router-dom'
import Signinbody from './body/Signinbody'
import { FaArrowLeft } from "react-icons/fa";
const Signin = () => {
    const location=useLocation();
    const signin:string=location.state
  return (
    <div>
        <Navbar state={signin}/>
        <Signinbody/>
    </div>
  )
}

export default Signin
