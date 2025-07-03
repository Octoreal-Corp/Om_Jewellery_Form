 import data from '../assets/dummy.json'
import DashCard from './Dashcard';
import Sidebar from "./Sidebar";
import usersImg from '../assets/images/users.svg';
import userImg from '../assets/images/user.svg';
import fuserImg from '../assets/images/fuser.svg';
import cuserImg from '../assets/images/cuser.svg';
const Dashboard = () => {
  const TotalData={
    heading:"Total Customers",
    users: data.length,
    photo: usersImg,
    description:"8.5% Up from last month"
  }
  const MaleData={
    heading:"Male Customers",
    users: data.filter(user=>user.gender==="Male").length,
    photo: userImg,
    description:"1.3% Up from past week"
  }
   const FemaleData={
    heading:"Female Customers",
    users: data.filter(user=>user.gender==="Female").length,
    photo: fuserImg,
    description:"1.3% Up from past week"
  }
  const MarriedData={
    heading:"Married Customers",
    users: data.filter(user=>user.status==="Married").length,
    photo: cuserImg,
    description:"1.3% Up from past week"
  }
  const SingleData={
    heading:"Single Customers",
    users: data.filter(user=>user.status==="Single").length,
    photo: userImg,
    description:"1.3% Up from past week"
  }
  
  const CustomerData1=[
    TotalData,
    MaleData,
    FemaleData,
    MarriedData,
    SingleData,
  ]
    const CustomerData2=[
    TotalData,
    MaleData,
    FemaleData,
    MarriedData,
  ]
  return (
      <div className=" h-screen w-full flex flex-col bg-white">
      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        
        {/* Dashboard Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-white w-full flex justify-center  py-4  ">
            <h1 className="text-2xl font-bold text-gray-800">Om Jwellery</h1>
          </div>
          <div className=' h-full w-full space-y-10 bg-rose-50 overflow-y-scroll'>
          <div className='  w-full  md:px-14 px-6  '>
            <div className='  h-16 w-full items-center   flex justify-between md:pr-4 md:gap-0 py-10'>
          <h3 className=' text-base md:text-2xl font-bold'>Customers</h3>
          <button className=' bg-[#6226EF] text-white rounded-sm text-xs px-4 py-2'>Add Customer</button>
          </div>
          <div className=' h-full w-full flex md:flex-row flex-col  items-center flex-wrap gap-7 py-2 '>
            {
              CustomerData1.map((i,index)=>{
                return(
                 <DashCard
                  key={`customer-card-${index}`}
                heading={i.heading}
                users={i.users}
                photo={i.photo}
                description={i.description}
                />
               
                )
              })
            }
          </div>
          </div>
          <div className='  w-full  md:px-14 px-6'>
            <div className='  h-16 w-full items-center   flex justify-between md:pr-4 md:gap-0 py-10'>
          <h3 className=' md:text-2xl font-bold'>Promotions</h3>
          <button className=' bg-[#6226EF] text-white rounded-sm text-xs md:px-4 px-2 py-2'>Add Promotional Event</button>
          </div>
          <div className=' h-full w-full flex flex-wrap gap-8 py-4 '>
            {
              CustomerData2.map((i,index)=>{
                return(
                 <DashCard
                  key={`customer-card-${index}`}
                heading={i.heading}
                users={i.users}
                photo={i.photo}
                description={i.description}
                />
               
                )
              })
            }
          </div>
          </div>
          
          
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Dashboard;