import React from "react";
import { Users, LayoutDashboard, Home, ChevronRight } from "lucide-react";

const Sidebar = ({ setActiveTab, activeTab, sidebarOpen, setSidebarOpen }) => {
  const menuItems = [
    { id: "overview", label: "Overview", icon: <LayoutDashboard size={20} /> },
    { id: "users", label: "Users", icon: <Users size={20} /> },
    { id: "properties", label: "Properties", icon: <Home size={20} /> },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 bg-gray-900 text-white min-h-screen">
        <div className="p-6 border-b border-gray-800">
          <h1 className="text-xl font-bold">Admin Panel</h1>
          <p className="text-gray-400 text-sm mt-1">Management Console</p>
        </div>

        <nav className="p-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`
                flex items-center justify-between w-full px-4 py-3 mb-1 rounded-lg transition-all
                ${activeTab === item.id 
                  ? "bg-blue-600 text-white" 
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }
              `}
            >
              <div className="flex items-center gap-3">
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </div>
              {activeTab === item.id && <ChevronRight size={18} />}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-800 mt-6">
          <div className="text-center">
            <p className="text-gray-400 text-sm">Admin Dashboard</p>
            <p className="text-xs text-gray-500 mt-1">v1.0.0</p>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="absolute left-0 top-0 w-64 bg-gray-900 text-white h-full shadow-xl animate-slide-in">
            <div className="p-6 border-b border-gray-800">
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold">Admin Panel</h1>
                <button 
                  onClick={() => setSidebarOpen(false)}
                  className="p-1 hover:bg-gray-800 rounded"
                >
                  ✕
                </button>
              </div>
              <p className="text-gray-400 text-sm mt-1">Management Console</p>
            </div>

            <nav className="p-4">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`
                    flex items-center w-full px-4 py-3 mb-1 rounded-lg transition-all
                    ${activeTab === item.id 
                      ? "bg-blue-600 text-white" 
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span className="font-medium">{item.label}</span>
                  </div>
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slide-in {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in {
          animation: slide-in 0.2s ease-out;
        }
      `}</style>
    </>
  );
};

export default Sidebar;