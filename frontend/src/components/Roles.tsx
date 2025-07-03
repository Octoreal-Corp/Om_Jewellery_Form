
import Sidebar from "./Sidebar";
import data from '../assets/rolesdata.json';
import { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";

const Roles = () => {
    const [editRole, setEditRole] = useState(false);
    const [selectedUser, setSelectedUser] = useState<number | null>(null);
    console.log(selectedUser)
     
    return (
      <div className="h-screen w-full flex flex-col bg-white">
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Header */}
            <div className="bg-white w-full flex justify-center py-4">
              <h1 className="text-xl font-bold text-gray-800">Om Jwellery</h1>
            </div>
            
            <div className="flex-1 flex flex-col bg-rose-50 mx-2 pb-5 overflow-hidden">
              <div className="flex justify-between items-center p-6">
                <h2 className="text-xl font-bold text-black">Edit Roles</h2>
                <button className="bg-[#6226EF] text-white rounded px-4 py-2">
                  Add New Role
                </button>
              </div>
              
              {/* Edit Role Modal */}
              {editRole &&
        <div className=" h-70 w-70 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-lg rounded-lg flex flex-col items-center justify-center z-50 px-8 gap-10">
            <IoCloseSharp 
            onClick={()=>setEditRole(!editRole)}
            className=" absolute top-2 left-2  text-2xl bg-rose-100 rounded-sm cursor-pointer" />
            <h3>Change user role</h3>
                <div  className=" w-full flex justify-between">
                    <button className=" cursor-pointer rounded-lg border px-2 text-sm font-semibold py-1 w-20 text-center bg-red-50">Manager</button>
                    <button className=" cursor-pointer rounded-lg border px-2 text-sm font-semibold py-1 w-20 text-center bg-red-50">Employee</button>
                </div>
            <span className=" text-xs">*Select the role you want to give</span>
            <button className=" cursor-pointer bg-[#EF3826] px-2 py-1 text-sm rounded-lg text-white">Remove user</button>
        </div>}

              {/* Table */}
              <div className="overflow-auto px-4">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-black">Name</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-black">Role</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-black">Email</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-black">Phone</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-black">Change Role</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {data.map((item, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{item.role}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{item.email}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{item.phone}</td>
                        <td className="px-6 py-4 text-sm">
                          <button 
                            onClick={() => {
                              setSelectedUser(index);
                              setEditRole(true);
                            }}
                            className="bg-indigo-200 text-indigo-600 px-3 py-1 rounded"
                          >
                            Change
                          </button>
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
    );
};

export default Roles;