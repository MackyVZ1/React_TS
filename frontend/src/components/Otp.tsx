import React from "react";
import { FaFacebook } from "react-icons/fa";
import Navbar from "./login_register/navigator/Navbar";
import { useLocation, Link } from "react-router-dom";
import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
const Otp = () => {
  const location = useLocation();
  const otp: string = location.state;
  return (
    <>
      <Navbar state={otp} />
      <div className="flex justify-center flex-col">
        <div className="p-3 flex justify-center">
          <img src="/shopee_logo.png" className="w-30 " />
        </div>
        <div className="w-full  p-10">
          <input
            type="text"
            placeholder="หมายเลขโทรศัพท์"
            className="  w-full flex justify-center items-center p-3 border-b-2 border-gray-400/30"
          />
          <button className="w-full bg-gray-100 text-gray-500 flex justify-center p-3 mt-2 hover:bg-amber-600 hover:text-white">
            เข้าสู่ระบบ
          </button>
          <div className="text-blue-500 flex justify-between mt-2">
            <Link to="/Register" state="สมัครใหม่">
              สมัครใหม่
            </Link>
            <Link to="/Signin" state="เข้าสู่ระบบ">
              เข้าสู่ด้วยระบบด้วยรหัสผ่าน
            </Link>
          </div>
          <div>
            <div className="flex justify-center p-5">
              <p>หรือ</p>
            </div>
            <div className=" flex flex-col w-full ">
              <button className="p-2">
                <div className="absolute flex justify-center p-3">
                  <FaFacebook />
                </div>
                <div className="p-2 border w-full">
                  ดำเนินการต่อด้วย Facebook
                </div>
              </button>
              <button className="p-2">
                <div className="absolute flex justify-center p-3">
                  <FcGoogle />
                </div>
                <div className="p-2 border">ดำเนินการต่อด้วย Google</div>
              </button>
              <button className="p-2">
                <div className="absolute flex justify-center p-3">
                  <FaApple />
                </div>
                <div className="p-2 border">ดำเนินการต่อด้วย Apple</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Otp;
