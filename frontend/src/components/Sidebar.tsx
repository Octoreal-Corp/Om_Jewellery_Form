 


import { HiOutlineLogout } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="sm:hidden fixed top-4 left-2 z-50     text-black p-1 rounded-sm"
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={20} />}
      </button>

      {/* Sidebar */}
      <div className={`${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        sm:translate-x-0 fixed sm:relative inset-y-0 left-0 w-48 bg-white
        transition-transform duration-300 ease-in-out z-40 flex flex-col
        items-center justify-between py-4  gap-4 px-4  `}
      >
        <div className="flex flex-col items-center gap-4 w-full">
          <NavLink 
            to={'/'} 
            onClick={() => setIsOpen(false)}
            className="cursor-pointer   text-lg w-full 
            rounded-lg text-center font-bold "
          >
           <span className=" text-blue-500">Dash</span>Stack
          </NavLink>
          <div className=" h-full w-full flex flex-col gap-4 py-3">
          <NavLink 
            to={'/dashboard'} 
            onClick={() => setIsOpen(false)}
             className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors text-center  "
          >
            Dashboard
          </NavLink>
          <NavLink 
            to={'/customers'} 
            onClick={() => setIsOpen(false)}
             className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors text-center  "
          >
            Cutomers
          </NavLink>
      <NavLink 
            to={'/events'} 
            onClick={() => setIsOpen(false)}
             className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors text-center  "
          >
            Events
          </NavLink>
          <NavLink 
            to={'/roles'} 
            onClick={() => setIsOpen(false)}
             className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors text-center  "
          >
            Roles
          </NavLink>
          </div>
          

        </div>

        <div className="flex flex-col items-center gap-6 w-full">
          <NavLink 
            to={'/login'} 
            onClick={() => setIsOpen(false)}
            className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors text-base w-full   
              text-center flex gap-2  items-center justify-center will-change-transform  "
          >
            <p>LogOut</p>
            <HiOutlineLogout />
          </NavLink>
          {/* <div className="flex w-full gap-2 items-center">
            <span className="w-10 h-10 rounded-full bg-red-100"></span>
            <div className="flex flex-col">
              <p className="text-sm text-neutral-100 font-medium">Admin</p>
              <p className="text-xs text-neutral-300">xyz</p>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Sidebar;