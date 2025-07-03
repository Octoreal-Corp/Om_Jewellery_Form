 



import Sidebar from "./Sidebar"
import data from '../assets/eventdata.json';
import { Link } from "react-router-dom";

const Events = () => {
   return (
     <div className="h-screen w-full flex flex-col bg-white">
      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        
        {/* Dashboard Content */}
        <div className="flex-1 h-full w-full flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-white w-full flex justify-center py-2 sm:py-4">
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 px-4 text-center">Om Jwellery</h1>
          </div>
          
          {/* Customers Section - Takes remaining height and scrollable */}
          <div className="flex-1 flex flex-col items-center h-full w-full px-2 sm:px-4 bg-rose-50 mx-1 sm:mx-2 pb-2 sm:pb-5 shadow-sm overflow-hidden">
            {/* Customers Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start w-full sm:items-center p-3 sm:p-6 gap-3 sm:gap-0">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-black">Promotion Events</h2>
              <Link to={"/events/addEvent"} >
              <button className="bg-[#6226EF] text-white rounded-sm text-xs sm:text-sm px-3 sm:px-4 py-2 cursor-pointer whitespace-nowrap">
                Add New Event
              </button>
              </Link>
            </div>
            
            {/* Mobile Card View (visible on small screens) */}
            <div className="block md:hidden flex-1 overflow-auto w-full space-y-3 px-2">
              {data.map((item, index) => (
                <div key={index} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-gray-900 text-sm flex-1 mr-2">{item.name}</h3>
                      <span className="text-xs text-gray-500 whitespace-nowrap">{item.date}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Message:</span> {item.message}
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 text-xs text-gray-500">
                      <div className="flex-1">
                        <span className="font-medium">Attachment:</span> {item.attachment}
                      </div>
                      <div>
                        <span className="font-medium">Repeat:</span> {item.repeat}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Desktop Table View (hidden on small screens) */}
            <div className="hidden md:block flex-1 overflow-auto w-full lg:w-3/4 xl:w-4/5 rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    <th className="px-3 lg:px-6 py-3 text-left text-sm lg:text-base font-semibold text-black tracking-wider">
                      Event Name
                    </th>
                    <th className="px-3 lg:px-6 py-3 text-left text-sm lg:text-base font-semibold text-black tracking-wider">
                      Date
                    </th>
                    <th className="px-3 lg:px-6 py-3 text-left text-sm lg:text-base font-semibold text-black tracking-wider">
                      Message
                    </th>
                    <th className="px-3 lg:px-6 py-3 text-left text-sm lg:text-base font-semibold text-black tracking-wider">
                      Attachment
                    </th>
                    <th className="px-3 lg:px-6 py-3 text-left text-sm lg:text-base font-semibold text-black tracking-wider">
                      Repeat
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-3 lg:px-6 py-4 text-sm font-semibold text-gray-900">
                        <div className="max-w-xs truncate" title={item.name}>
                          {item.name}
                        </div>
                      </td>
                      <td className="px-3 lg:px-6 py-4 whitespace-nowrap text-xs text-gray-500">
                        {item.date}
                      </td>
                      <td className="px-3 lg:px-6 py-4 text-sm text-gray-500">
                        <div className="max-w-xs lg:max-w-sm truncate" title={item.message}>
                          {item.message}
                        </div>
                      </td>
                      <td className="px-3 lg:px-6 py-4 text-sm text-gray-500">
                        <div className="max-w-xs truncate" title={item.attachment}>
                          {item.attachment}
                        </div>
                      </td>
                      <td className="px-3 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.repeat}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Events