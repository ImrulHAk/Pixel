import React from 'react'
import { TbCloudUpload } from "react-icons/tb";
import { FaHome } from "react-icons/fa";
import { SiGooglemessages } from "react-icons/si";
import { IoIosNotifications } from "react-icons/io";
import { IoSettingsSharp } from "react-icons/io5";
import { RiLoginBoxLine } from "react-icons/ri";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAuth, signOut } from "firebase/auth";
import { userLoginInfo } from '../slices/userSlice';

const Sidebar = () => {
  const auth = getAuth();
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let data = useSelector((state) => state.user.value)
  let location = useLocation()
  console.log(location.pathname)

  let handleLogout = () => {
    signOut(auth).then(() => {
      dispatch(userLoginInfo(null))
      localStorage.setItem("userInfo", null)
      navigate("/login")
    }).catch((error) => {
      console.log(error)
    });
  }
  return (
    <section className=' w-[185px] h-[955px] bg-primary m-[35px] rounded-[20px] text-center '>
      <div className='pt-[38px]'></div>
      <div className=' group w-[100px] h-[100px] rounded-full overflow-hidden mx-auto relative '>
        <img src={data ? data.photoURL : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqafzhnwwYzuOTjTlaYMeQ7hxQLy_Wq8dnQg&s"} alt="profile" />
        <div className=' hidden w-full h-full bg-[rgba(0,0,0,.5)] absolute top-0 left-0 group-hover:flex justify-center items-center '>
          <TbCloudUpload className='text-white text-[25px] ' />
        </div>
      </div>
      <h2 className=' text-white mt-4 font-semibold text-[16px] '>{data && data.displayName}</h2>
      <div className=' mt-16 relative '>
        <div className={`w-[160px] h-[88px] ${location.pathname == "/" && "bg-white"} ml-auto rounded-l-[20px] `}></div>
        <Link to="/">
          <FaHome className={`m-auto text-[50px] ${location.pathname == "/" ? "text-primary" : "text-[#BAD1FF]"} absolute top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%] `} />
        </Link>
        <div className=' w-[10px] h-[88px] absolute top-0 right-0 rounded-l-[20px] bg-primary '></div>
      </div>
      <div className='  mt-10 relative '>
        <div className={`w-[160px] h-[88px] ${location.pathname == "/message" && "bg-white"} ml-auto rounded-l-[20px] `}></div>
        <Link to="/message">
          <SiGooglemessages className={`m-auto text-[50px] ${location.pathname == "/message" ? "text-primary" : "text-[#BAD1FF]"} absolute top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%] `} />
        </Link>
        <div className=' w-[10px] h-[88px] absolute top-0 right-0 rounded-l-[20px] bg-primary '></div>
      </div>
      <div className='  mt-10 relative '>
        <div className={`w-[160px] h-[88px] ${location.pathname == "/notification" && "bg-white"} ml-auto rounded-l-[20px] `}></div>
        <Link to="/notification">
          <IoIosNotifications className={`m-auto text-[50px] ${location.pathname == "/notification" ? "text-primary" : "text-[#BAD1FF]"} absolute top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%] `} />
        </Link>
        <div className=' w-[10px] h-[88px] absolute top-0 right-0 rounded-l-[20px] bg-primary '></div>
      </div>
      <div className='  mt-10 relative '>
        <div className={`w-[160px] h-[88px] ${location.pathname == "/setting" && "bg-white"} ml-auto rounded-l-[20px] `}></div>
        <Link to="/setting">
          <IoSettingsSharp className={`m-auto text-[50px] ${location.pathname == "/setting" ? "text-primary" : "text-[#BAD1FF]"} absolute top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%] `} />
        </Link>
        <div className=' w-[10px] h-[88px] absolute top-0 right-0 rounded-l-[20px] bg-primary '></div>
      </div>
      <div className=' mt-28 relative '>
        <div className={`w-[160px] h-[88px] ${location.pathname == "/logout" && "bg-white"} ml-auto rounded-l-[20px] `}></div>
        <RiLoginBoxLine onClick={handleLogout} className={`m-auto text-[50px] ${location.pathname == "/logout" ? "text-primary" : "text-[#BAD1FF]"} absolute top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%] `} />
        <div className=' w-[10px] h-[88px] absolute top-0 right-0 rounded-l-[20px] bg-primary '></div>
      </div>
    </section>
  )
}

export default Sidebar