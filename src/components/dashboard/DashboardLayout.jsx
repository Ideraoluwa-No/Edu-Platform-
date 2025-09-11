import { useState } from "react";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import {
  FaHome,
  FaBook,
  FaTasks,
  FaUser,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { path: "/dashboard", icon: FaHome, label: "Dashboard" },
    { path: "/dashboard/courses", icon: FaBook, label: "Courses" },
    { path: "/dashboard/assignments", icon: FaTasks, label: "Assignments" },
    { path: "/dashboard/profile", icon: FaUser, label: "Profile" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed md:relative z-50 w-64 bg-blue-800 text-white transition-transform duration-300${sidebarOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"}h-full`}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold">EduPlatform</h1>
            <button onClick={() => setSidebarOpen(false)} className="md:hidden">
              <FaTimes className="text-xl" />
            </button>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-4 py-3 rounded-lg transition-colors${isActive ? "bg-blue-700 text-white" : "text-blue-100 hover:bg-blue-700"}`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className="mr-3" />
                  <span>{item.label}</span>
                </Link>
              );
            })}

            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 text-blue-100 hover:bg-blue-700 rounded-lg transition-colors"
            >
              <FaSignOutAlt className="mr-3" />
              <span>Logout</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white shadow-sm z-40">
          <div className="flex items-center justify-between p-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden text-gray-600"
            >
              <FaBars className="text-xl" />
            </button>

            <div className="flex items-center space-x-4">
              {" "}
              <span className="text-gray-700">
                Welcome, {localStorage.getItem("userName") || "User"}
              </span>
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                {localStorage.getItem("userName")?.charAt(0) || "U"}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default DashboardLayout;
