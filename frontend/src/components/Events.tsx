import Sidebar from "./Sidebar"

const Events = () => {
  return (
    <div className=" h-screen w-full">
           <div className="  flex items-center justify-center py-2 bg-radial font-semibold from-[#030303] via-35% via-[#0a0909] to-[#000000] w-full shadow-md shadow-neutral-600">
            <h3 className=" text-2xl text-white">Events</h3>
            </div>
        <Sidebar/>
    </div>
  )
}

export default Events