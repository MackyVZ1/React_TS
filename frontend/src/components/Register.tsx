import React from "react";
import { FaFacebook } from "react-icons/fa";
import Navbar from "./login_register/navigator/Navbar";
import { useLocation } from "react-router-dom";
import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  const location = useLocation();
  const register: string = location.state;
  return (
    <>
      <Navbar state={register} />
      <div className="flex justify-center flex-col">
        <div className="w-full  p-10">
          <input
            type="text"
            placeholder="เบอร์โทรศัพท์/อีเมล/ชื่อผู้ใช้"
            className="  w-full flex justify-center items-center p-3 border-b-2 border-gray-400/30"
          />
          <button className="w-full bg-gray-100 text-gray-500 flex justify-center p-3 mt-2 hover:bg-amber-600 hover:text-white">
            ต่อไป
          </button>
          <div>
            <div className="flex justify-center p-5">
              <p>หรือ</p>
            </div>
            <div className=" flex flex-col w-full ">
              <button className="p-2 flex flex-row">
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

export default Register;
