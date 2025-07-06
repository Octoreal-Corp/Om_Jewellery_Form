import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from "./Sidebar";
import api from '../lib/api';

interface Customer {
  user_id: number;
  email: string;                      
  name: string;                        
  phone: string;
  whatsapp: string;
  dob: string;                          
  anniversary_date: string | null;    
  marital_status: string;
  gender?: string;
  husband_name?: string;   
  wife_name?: string;
  address?: string;
  pincode?: string;
}

interface PaginatedCustomerResponse {
  data: Customer[];
  total: number;
  page: number;
  totalPages: number;
}

const Customers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchCustomers = async (page: number = 1) => {
    try {
      const res = await api.get<PaginatedCustomerResponse>(`/api/customers?page=${page}&limit=20`);
      console.log("API raw response:", res.data);
      setCustomers(res.data.data);
      setTotalPages(res.data.totalPages);
      setPage(res.data.page);
    } catch (err) {
      console.error('Error fetching customers:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers(page);
  }, [page]);

  return (
    <div className="h-screen w-full flex flex-col bg-white">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="bg-white w-full flex justify-center py-4">
            <h1 className="text-2xl font-bold text-gray-800">Om Jwellery</h1>
          </div>

          <div className="flex-1 flex flex-col bg-rose-50 mx-2 shadow-sm overflow-hidden mb-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 border-b">
              <h2 className="text-xl font-bold text-gray-800 mb-4 sm:mb-0">Customers</h2>
              <button 
                onClick={() => navigate('/customers/new')}
                className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
                Add Customer
              </button>
            </div>

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
                  {loading ? (
  <tr>
    <td className="px-6 py-4" colSpan={6}>Loading...</td>
  </tr>
) : Array.isArray(customers) && customers.length > 0 ? (
  customers.map((item) => (
                      <tr key={item.user_id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
  {item.marital_status?.toLowerCase() === 'married' && (item.husband_name || item.wife_name)
    ? `Mr & Mrs ${(item.husband_name ?? '').trim()} ${(item.wife_name ?? '').trim()}`.trim()
    : (item.name?.trim() || '—')}
</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.phone}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.dob}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.anniversary_date || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            item.marital_status === 'Married' 
                              ? 'bg-green-100 text-green-800 border border-green-300' 
                              : 'bg-blue-100 text-blue-800 border border-blue-300'
                          }`}>
                            {item.marital_status}
                          </span>
                        </td>
                      </tr>
                      
                    ))
                    ) : (
  <tr>
    <td className="px-6 py-4 text-center text-sm text-gray-500" colSpan={6}>
      No customers found.
    </td>
  </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="flex justify-center items-center space-x-2 mt-6">
  <button
    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
    disabled={page === 1}
    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
  >
    Prev
  </button>

  {Array.from({ length: totalPages }, (_, i) => (
    <button
      key={i + 1}
      onClick={() => setPage(i + 1)}
      className={`px-3 py-1 rounded ${
        page === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-100'
      }`}
    >
      {i + 1}
    </button>
  ))}

  <button
    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
    disabled={page === totalPages}
    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
  >
    Next
  </button>
</div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Customers;
