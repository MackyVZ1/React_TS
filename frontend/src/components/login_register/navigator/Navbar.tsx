import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowLeft } from "react-icons/fa";
type NavbarProps={
    state:string
}
const Navbar = ({state}:NavbarProps) => {
  return (
    <>
      <nav className='p-3 flex flex-row shadow'>
        <Link to="/Home" className='p-3 flex justify-center'><FaArrowLeft /></Link>
        <div className='flex justify-center items-center'>
          <p>{state}</p>
        </div>
      </nav>
    </>
  )
}

export default Navbar
