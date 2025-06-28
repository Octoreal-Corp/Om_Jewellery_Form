import { HiOutlineLogout } from "react-icons/hi"
import { NavLink } from "react-router-dom"

const Sidebar = () => {
  return (
         <div className=" h-screen w-[200px]    shadow-lg shadow-neutral-500 flex flex-col items-center justify-between py-10 pb-16 gap-4 px-4">
         <div className="flex flex-col items-center gap-4 w-full">
         <NavLink to={'/'} className=" cursor-pointer scale-100 hover:scale-95 duration-300 delay-100 ease-in-out bg-gradient-to-r from-neutral-600 shadow-md shadow-neutral-700 to-black text-white py-1 px-2 text-base  w-full rounded-lg text-center">Dashboard</NavLink>
         <NavLink to={'/users'} className=" cursor-pointer scale-100 hover:scale-95 duration-300 delay-100 ease-in-out bg-gradient-to-r from-neutral-600 shadow-md shadow-neutral-700 to-black text-white py-1 px-2 text-base  w-full rounded-lg text-center">Users</NavLink>
         <NavLink to={'/events'} className=" cursor-pointer scale-100 hover:scale-95 duration-300 delay-100 ease-in-out bg-gradient-to-r from-neutral-600 shadow-md shadow-neutral-700 to-black text-white py-1 px-2 text-base  w-full rounded-lg text-center">Events</NavLink>
         </div>
 
         <div className="flex flex-col items-center gap-6 w-full">
        <NavLink to={'/login'} className=" cursor-pointer  bg-gradient-to-r from-neutral-600 shadow-md shadow-neutral-700 to-black text-white py-1 px-2 text-base  w-full rounded-lg text-center flex gap-2 hover:scale-105 scale-100 ease-in-out duration-200 delay-100  items-center justify-center">
         <p >LogOut </p><HiOutlineLogout/>
         </NavLink>
         <div className=" flex w-full gap-2">
             <span className=" w-10 h-10 rounded-full bg-red-100"></span>
             <div className=" flex flex-col">
             <p className=" text-sm text-neutral-700 font-medium">Admin</p>
             <p className=" text-xs  text-neutral-500">xyz</p>
             </div>
         </div>
         </div>
 
         </div>
  )
}

export default Sidebar