import data from '../assets/dummy.json';
import Sidebar from "./Sidebar";

const Customers = () => {
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

          {/* Customers Section - Takes remaining height and scrollable */}
          <div className="flex-1 flex flex-col bg-rose-50 mx-2   shadow-sm overflow-hidden mb-6">
            {/* Customers Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 border-b">
              <h2 className="text-xl font-bold text-gray-800 mb-4 sm:mb-0">Customers</h2>
              <button className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
                Add Customer
              </button>
            </div>

            {/* Scrollable Table Container */}
            <div className="flex-1 overflow-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Birth Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Anniversary Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.customer_name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.phone_number}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.birth_day}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.anniversary_date || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          item.status === 'Married' 
                            ? 'bg-green-100 text-green-800 border border-green-300' 
                            : 'bg-blue-100 text-blue-800 border border-blue-300'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Table Footer */}
           
          </div>
        </div>
      </div>
    </div>
  )
}

export default Customers