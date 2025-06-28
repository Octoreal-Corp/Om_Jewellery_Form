 
import { LuNotebookPen } from "react-icons/lu";
import { FaUsers } from "react-icons/fa6";
import { PiCheersLight } from "react-icons/pi";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import data from '../assets/dummy.json'
import Sidebar from "./Sidebar";


const Dashboard = () => {
    
  return (
    <div className="  h-screen w-full flex flex-col overflow-y-hidden ">
        <div className="  flex items-center justify-center py-2 bg-radial font-semibold from-[#030303] via-35% via-[#0a0909] to-[#000000] w-full shadow-md shadow-neutral-600">
            <h3 className=" text-2xl text-white">Dasboard</h3>
            </div>

        <div className="   h-full w-full flex ">

       <Sidebar/>
      
      
        <div className=" h-full w-full grid gap-4  grid-rows-[120px_1fr] px-10 py-2 pb-16">
        <div className=" w-full h-full  grid grid-cols-[1fr_1fr_1fr_1fr] gap-16">
            <div className=" flex gap-2 hover:scale-105 scale-100 ease-in-out duration-200 delay-100    bg-gradient-to-r from-[#ffffff] to-[#f8f8f8] shadow-md shadow-neutral-600/35 rounded-2xl p-4 cursor-pointer">
                <span className=" text-lg font-semibold">Total Records</span><LuNotebookPen className=" text-xl mt-1"/>

            </div>
             <div className=" flex gap-2 hover:scale-105 scale-100 ease-in-out duration-200 delay-100    bg-gradient-to-r from-[#ffffff] to-[#f8f8f8] shadow-md shadow-neutral-600/35 rounded-2xl p-4 cursor-pointer">
                <span className=" text-lg font-semibold">New Users This Month</span><FaUsers className=" text-xl mt-1"/>

            </div>
            <div className=" flex gap-2 hover:scale-105 scale-100 ease-in-out duration-200 delay-100    bg-gradient-to-r from-[#ffffff] to-[#f8f8f8] shadow-md shadow-neutral-600/35 rounded-2xl p-4 cursor-pointer">
                <span className=" text-lg font-semibold">Upcoming Anniversaries</span><PiCheersLight className=" text-xl mt-1"/>

            </div>
         <div className=" flex gap-2 hover:scale-105 scale-100 ease-in-out duration-200 delay-100    bg-gradient-to-r from-[#ffffff] to-[#f8f8f8] shadow-md shadow-neutral-600/35 rounded-2xl p-4 cursor-pointer">
                <span className=" text-lg font-semibold">Upcoming Birthdays</span><LiaBirthdayCakeSolid className=" text-xl mt-1"/>

            </div>

        </div>

        <div className=" bg-gradient-to-r   from-[#fbfafa] to-[#fdfcfc]  shadow-xl/60 shadow-[#454444]  overflow-y-scroll h-full w-full rounded-xl  grid grid-cols-6 gap-6 py-6     scrollbar-hide">
            {data.map((items)=>{
                return(<>
                 <div className=" text-base font-medium text-neutral-700 text-center">{items.customer_name}</div>
                 <div className=" text-sm text-neutral-700 text-center">{items.birth_day}</div>
                 <div className=" text-sm text-neutral-700 text-center">{items.phone_number}</div>
                 <div className="text-sm text-neutral-700 text-center">{items.email}</div>
                 <div className="text-sm text-neutral-700 text-center">{items.anniversary_date?items.anniversary_date:"-"}</div>
                 <div className="text-base font-medium text-neutral-700 text-center">{items.status}</div>
                </>)
            })}
        
      

        </div>
        </div>

        </div>
    </div>
  )
}

export default Dashboard