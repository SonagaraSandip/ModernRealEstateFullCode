import React, { useState, useEffect } from "react";
import { UserCheck, Mail, Shield, MoreVertical, Search, Filter } from "lucide-react";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/admin/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          if (res.status === 401) {
            setError("Unauthorized - please login again");
            localStorage.clear();
            window.location.href = "/account/login";
            return;
          }
          throw new Error(`HTTP Error! Status: ${res.status}`);
        }
        const data = await res.json();
        setUsers(data.users || data || []);
      } catch (error) {
        console.error("Error fetching users", error);
        setError("Failed to load users");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const promoteToAdmin = async (id) => {
    const token = localStorage.getItem("token");
    if (!window.confirm("Promote this user to Admin?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/admin/promote/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Failed to promote user");

      const data = await res.json();
      alert(data.message);
      // Update local state
      setUsers((prev) =>
        prev.map((u) => (u.id === id ? { ...u, role: "admin" } : u))
      );
    } catch (error) {
      console.error("Error promoting user:", error);
      alert("Failed to promote user");
    }
  };

  const demoteToUser = async (id) => {
    const token = localStorage.getItem("token");
    if (!window.confirm("Demote this admin to User?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/admin/demote/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Failed to demote user");

      const data = await res.json();
      alert(data.message);
      // Update local state
      setUsers((prev) =>
        prev.map((u) => (u.id === id ? { ...u, role: "user" } : u))
      );
    } catch (error) {
      console.error("Error demoting user:", error);
      alert("Failed to demote user");
    }
  };

  // Filter and search users
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "all" || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 text-lg mb-2">⚠️ {error}</div>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Users Management</h2>
        <p className="text-gray-600 text-sm mt-1">
          {users.length} total users • {users.filter(u => u.role === "admin").length} admins
        </p>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div className="flex gap-2">
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>
      </div>

      {/* Mobile View */}
      <div className="lg:hidden space-y-4">
        {currentUsers.map((user) => (
          <div
            key={user.id}
            className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <UserCheck className="text-blue-600" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{user.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Mail size={14} className="text-gray-400" />
                    <span className="text-sm text-gray-600">{user.email}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-end gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  user.role === "admin" 
                    ? "bg-purple-100 text-purple-700" 
                    : "bg-gray-100 text-gray-700"
                }`}>
                  {user.role}
                </span>
                
                <div className="flex gap-2">
                  {user.role !== "admin" ? (
                    <button
                      onClick={() => promoteToAdmin(user.id)}
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded-lg transition-colors"
                    >
                      Promote
                    </button>
                  ) : (
                    <button
                      onClick={() => demoteToUser(user.id)}
                      className="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white text-xs rounded-lg transition-colors"
                    >
                      Demote
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 text-left text-sm font-semibold text-gray-700">User</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-700">Email</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-700">Role</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-700">Joined</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {currentUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <UserCheck className="text-blue-600" size={18} />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">{user.name}</h4>
                      <p className="text-gray-500 text-sm">ID: {user.id}</p>
                    </div>
                  </div>
                </td>

                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <Mail size={16} className="text-gray-400" />
                    <span className="text-gray-700">{user.email}</span>
                  </div>
                </td>

                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <Shield size={16} className={
                      user.role === "admin" ? "text-purple-500" : "text-gray-400"
                    } />
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      user.role === "admin" 
                        ? "bg-purple-100 text-purple-700" 
                        : "bg-gray-100 text-gray-700"
                    }`}>
                      {user.role}
                    </span>
                  </div>
                </td>

                <td className="p-4 text-gray-600">
                  {user.created_at ? new Date(user.created_at).toLocaleDateString() : "N/A"}
                </td>

                <td className="p-4">
                  <div className="flex gap-2">
                    {user.role !== "admin" ? (
                      <button
                        onClick={() => promoteToAdmin(user.id)}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                      >
                        Promote to Admin
                      </button>
                    ) : (
                      <button
                        onClick={() => demoteToUser(user.id)}
                        className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm font-medium transition-colors"
                      >
                        Demote to User
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {filteredUsers.length > itemsPerPage && (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
          <div className="text-sm text-gray-600">
            Showing {startIndex + 1} to {Math.min(endIndex, filteredUsers.length)} of {filteredUsers.length} users
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Previous
            </button>
            
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded-lg ${
                    currentPage === page
                      ? "bg-blue-600 text-white"
                      : "border border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* No Results */}
      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <UserCheck className="text-gray-400" size={24} />
          </div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">No users found</h3>
          <p className="text-gray-500">
            {searchTerm || filterRole !== "all" 
              ? "Try changing your search or filter criteria"
              : "No users in the system yet"}
          </p>
        </div>
      )}
    </div>
  );
};

export default UserList;