import { ReactNode, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { IoIosSearch } from "react-icons/io";

const Nav = () => {
  // const [signin, setSignin] = useState<string>("") // ใช้กำหนด component
  // const nav = useNavigate()
  return (
    <>
    {/* Top Nav */}
    <nav className='bg-orange-600 w-full h-20 sm:h-30'>
        <div className='text-white text-xs space-x-1 sm:text-2xl p-2 sm:space-x-2'>
            <Link className='sm:ml-40 sm:mt-30 w-3' to="#">Seller Center</Link>
            <span>|</span>
            <Link to="/shop">เปิดร้านค้า</Link>
            <span>|</span>
            <Link to="#">ดาวน์โหลด</Link>
            <span>|</span>
            <Link to="#">ติดตามเราบน</Link>
            <span>|</span>
            <Link to="/Register" state="สมัครใหม่" className='hover:opacity-80'>สมัครใหม่</Link>
            <span>|</span>
            <Link to="/Signin" state="เข้าสู่ระบบ" className='hover:opacity-80 '>เข้าสู่ระบบ</Link>
        </div>

        {/*ส่วนของการล็อกอิน/สร้างบัญชี*/}
        <div className="text-white flex justify-end text-xs space-x-1 sm:text-2xl">
         
        </div>

        {/*ส่วนของการค้นหา*/}
        <div className="flex justify-center w-auto ">
          <input 
            type="text" 
            placeholder='ค้นหาสินค้าและร้านค้า' 
            className='bg-gray-100 w-50% text-xs1 rounded pr-10 border text-gray-800 '/>
         
            <button className="  bg-orange-500 transition duration-300 hover:bg-orange-300/50 rounded flex item-center justify-center">
              <IoIosSearch />
            </button>
          
        </div>
    </nav>
    </>
  )
}

export default Nav
