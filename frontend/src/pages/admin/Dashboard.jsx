import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar.jsx";
import { useNavigate } from "react-router-dom";
import UsersList from "./UserList.jsx";
import PropertiesList from "./PropertyList.jsx";
import { Menu, X } from "lucide-react";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [summary, setSummary] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const token = localStorage.getItem("token");

  // AUTH + FETCH SUMMARY
  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
      return;
    }

    const fetchSummary = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/admin/summary", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          if (res.status === 401) navigate("/account/login");
          throw new Error("Failed to fetch summary");
        }

        const data = await res.json();
        setSummary(data);
      } catch (err) {
        console.error("Error fetching dashboard summary:", err);
      }
    };

    fetchSummary();
  }, [user, token, navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-gray-900 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-800 rounded-lg"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <h1 className="text-lg font-semibold">Admin Dashboard</h1>
          </div>
          <div className="text-sm text-gray-300">
            Hi, {user.name?.split(" ")[0] || "Admin"}
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Main Content */}
        <div className="flex-1 p-4 md:p-6 lg:p-8">
          {/* Desktop Header */}
          <div className="hidden lg:flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold font-serif text-gray-800">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 mt-1">Welcome back, {user.name || "Admin"}!</p>
            </div>
            
            {/* Mobile Navigation Tabs */}
            <div className="lg:hidden flex gap-2">
              {["overview", "users", "properties"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 text-sm rounded-lg capitalize ${
                    activeTab === tab
                      ? "bg-gray-900 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="mt-4 md:mt-6">
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-6.5a3.5 3.5 0 11-7 0 3.5 3.5 0 017 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">Total Users</p>
                        <p className="text-2xl font-bold">{summary.users || 0}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">Total Properties</p>
                        <p className="text-2xl font-bold">{summary.properties || 0}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">In Stock</p>
                        <p className="text-2xl font-bold text-green-600">{summary.inStock || 0}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">Total Orders</p>
                        <p className="text-2xl font-bold">{summary.orders || 0}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    {[
                      { text: "New user registered", time: "2 min ago" },
                      { text: "Property added by admin", time: "15 min ago" },
                      { text: "Order completed", time: "1 hour ago" },
                      { text: "System backup completed", time: "3 hours ago" }
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-gray-700">{activity.text}</span>
                        </div>
                        <span className="text-gray-500 text-sm">{activity.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "users" && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <UsersList />
              </div>
            )}

            {activeTab === "properties" && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <PropertiesList />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;