import { useEffect, useState } from "react";
import axios from "axios";
import { HiOutlineLogout } from "react-icons/hi";
import { LuNotebookPen } from "react-icons/lu";
import { FaUsers } from "react-icons/fa6";
import { PiCheersLight } from "react-icons/pi";
import { LiaBirthdayCakeSolid } from "react-icons/lia";

interface User {
  user_id: number;
  name?: string;
  husband_name?: string;
  wife_name?: string;
  phone: string;
  dob?: string;
  husband_dob?: string;
  wife_dob?: string;
  anniversary_date?: string;
  created_at: string;
}

const Dashboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters] = useState({});
  const [stats, setStats] = useState({
  newUsers: 0,
  anniversaries: 0,
  birthdays: 0,
});
  const [quickFilter, setQuickFilter] = useState<"all" | "new" | "anniversary" | "birthday">("all");


  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: "20",
          ...filters,
        });

        const res = await axios.get(`http://localhost:5000/api/users?${params.toString()}`);
        
        if (res.data.success && Array.isArray(res.data.data)) {
          setUsers(res.data.data);
          setTotalPages(res.data.total_pages || 1); 
        } else {
          console.error("Unexpected response format:", res.data);
        }
      } catch (err) {
        console.error("Error fetching paginated users:", err);
      }
      setLoading(false);
    };

    fetchUsers();
  }, [page, filters]);

  useEffect(() => {
  const fetchStats = async () => { 
    setLoading(true);

    try {
      const now = new Date();
      const baseFilters: Record<string, string> = { ...filters };

      if (quickFilter === "new") {
        const firstDay = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split("T")[0];
        const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split("T")[0];
        baseFilters.created_after = firstDay;
        baseFilters.created_before = lastDay;
      } else if (quickFilter === "anniversary") {
        baseFilters.anniversary_month = (now.getMonth() + 1).toString();
      } else if (quickFilter === "birthday") {
        baseFilters.age_min = "0";
        baseFilters.age_max = "120";
      }

      const query = new URLSearchParams({
        page: page.toString(),
        limit: "10",
        ...baseFilters,
      }).toString();

      const [newUsersRes, anniversariesRes, birthdaysRes, usersRes] = await Promise.all([
        axios.get("http://localhost:5000/api/users/stats/new-users"),
        axios.get("http://localhost:5000/api/users/stats/upcoming-anniversaries"),
        axios.get("http://localhost:5000/api/users/stats/upcoming-birthdays"),
        axios.get(`http://localhost:5000/api/users?${query}`),
      ]);

      setStats({
        newUsers: newUsersRes.data.total,
        anniversaries: anniversariesRes.data.total,
        birthdays: birthdaysRes.data.total,
      });

      setUsers(usersRes.data.data);
      setTotalPages(usersRes.data.pagination?.total_pages || 1);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchStats();
}, [page, filters, quickFilter]);


  return (
    <div className="h-screen w-full flex flex-col overflow-y-hidden">
      <div className="flex items-center justify-center py-3 bg-gradient-to-r font-semibold from-neutral-400 to-black w-full shadow-md shadow-neutral-600">
        <h3 className="text-2xl text-white">Dasboard</h3>
      </div>

      <div className="h-full w-full flex">
        <div className="h-full w-[200px] shadow-lg shadow-neutral-500 flex flex-col items-center justify-between py-10 pb-16 gap-4 px-4">
          <div className="flex flex-col items-center gap-4 w-full">
            <span className="cursor-pointer scale-100 hover:scale-95 duration-300 delay-100 ease-in-out bg-gradient-to-r from-neutral-600 shadow-md shadow-neutral-700 to-black text-white py-1 px-2 text-base w-full rounded-lg text-center">
              Customers
            </span>
            <span className="cursor-pointer scale-100 hover:scale-95 duration-300 delay-100 ease-in-out bg-gradient-to-r from-neutral-600 shadow-md shadow-neutral-700 to-black text-white py-1 px-2 text-base w-full rounded-lg text-center">
              Events
            </span>
          </div>

          <div className="flex flex-col items-center gap-6 w-full">
            <span className="cursor-pointer scale-100 hover:scale-95 duration-300 delay-100 ease-in-out bg-gradient-to-r from-neutral-600 shadow-md shadow-neutral-700 to-black text-white py-1 px-2 text-base w-full rounded-lg text-center flex gap-2 items-center justify-center">
              <p>LogOut</p>
              <HiOutlineLogout />
            </span>
            <div className="flex w-full gap-2">
              <span className="w-10 h-10 rounded-full bg-red-100"></span>
              <div className="flex flex-col">
                <p className="text-sm text-neutral-700 font-medium">Admin</p>
                <p className="text-xs text-neutral-500">xyz</p>
              </div>
            </div>
          </div>
        </div>

        <div className="h-full w-full grid gap-4 grid-rows-[120px_1fr] px-10 py-6 pb-16">
          <div className="w-full h-full grid grid-cols-[1fr_1fr_1fr_1fr] gap-16">
            <div  onClick={() => {
                    setQuickFilter("all");
                    setPage(1);
                  }} className="flex gap-2 hover:scale-105 scale-100 ease-in-out duration-200 delay-100 bg-gradient-to-r from-rose-50 to-neutral-300 shadow-md shadow-neutral-300 rounded-2xl p-4 cursor-pointer">
              <span className="text-lg font-semibold">Total Records</span>
              <div className="text-xl mt-1">
                <LuNotebookPen />
              </div>
            </div>
            <div  onClick={() => {
                    setQuickFilter("new");
                    setPage(1);
                  }} 
                className="flex gap-2 hover:scale-105 scale-100 ease-in-out duration-200 delay-100 bg-gradient-to-r from-rose-50 to-neutral-300 shadow-md shadow-neutral-300 rounded-2xl p-4 cursor-pointer">
              <span className="text-lg font-semibold">New Users This Month: {stats.newUsers}</span>
              <div className="text-xl mt-1">
                <FaUsers />
              </div>
            </div>
            <div  onClick={() => {
                    setQuickFilter("anniversary");
                    setPage(1);
                  }} className="flex gap-2 hover:scale-105 scale-100 ease-in-out duration-200 delay-100 bg-gradient-to-r from-rose-50 to-neutral-300 shadow-md shadow-neutral-300 rounded-2xl p-4 cursor-pointer">
              <span className="text-lg font-semibold">Upcoming Anniversaries: {stats.anniversaries}</span>
              <div className="text-xl mt-1">
                <PiCheersLight />
              </div>
            </div>
            <div  onClick={() => {
                    setQuickFilter("birthday");
                    setPage(1);
                  }} className="flex gap-2 hover:scale-105 scale-100 ease-in-out duration-200 delay-100 bg-gradient-to-r from-rose-50 to-neutral-300 shadow-md shadow-neutral-300 rounded-2xl p-4 cursor-pointer">
              <span className="text-lg font-semibold">Upcoming Birthdays: {stats.birthdays}</span>
              <div className="text-xl mt-1">
                <LiaBirthdayCakeSolid />
              </div>
            </div>
          </div>

          

          <div className="bg-gradient-to-r from-rose-50 to-neutral-200 overflow-y-scroll h-full w-full rounded-xl grid grid-cols-6 gap-6 py-6 px-4 scrollbar-hide">
            {loading ? (
              <p className="col-span-6 text-center text-gray-600">Loading users...</p>
            ) : users.length === 0 ? (
              <p className="col-span-6 text-center text-gray-600">No users found.</p>
            ) : (
              <>
                {users.map((u) => (
                  <div key={u.user_id} className="col-span-6 grid grid-cols-6 gap-4">
                    <div className="text-base font-medium text-neutral-700">
                      {u.name || `${u.husband_name} & ${u.wife_name}`}
                    </div>
                    <div className="text-sm text-neutral-700">
                      {u.dob || u.husband_dob || "-"}
                    </div>
                    <div className="text-sm text-neutral-700">{u.phone}</div>
                    <div className="text-sm text-neutral-700">{u.created_at.slice(0, 10)}</div>
                    <div className="text-sm text-neutral-700">{u.anniversary_date?.slice(0, 10) || "-"}</div>
                    <div className="text-base font-medium text-neutral-700">Active</div>
                  </div>
                ))}

                {/* ✅ Pagination Controls */}
                <div className="col-span-6 flex justify-between items-center mt-4">
                  <button
                    disabled={page <= 1}
                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                    className="bg-neutral-700 text-white px-4 py-1 rounded disabled:opacity-50"
                  >
                    Prev
                  </button>
                  <span className="text-sm text-neutral-700">
                    Page {page} of {totalPages}
                  </span>
                  <button
                    disabled={page >= totalPages}
                    onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                    className="bg-neutral-700 text-white px-4 py-1 rounded disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
