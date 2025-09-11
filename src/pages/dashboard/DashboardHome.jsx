// src/pages/dashboard/DashboardHome.jsx
import { useState, useEffect } from "react";
import {
  FaBook,
  FaClock,
  FaChartLine,
  FaExclamationTriangle,
  FaUser,
} from "react-icons/fa";

const DashboardHome = () => {
  const [stats, setStats] = useState({
    enrolledCourses: 0,
    pendingAssignments: 0,
    completionRate: 0,
    upcomingDeadlines: 0,
  });
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch user data from ReqRes API
  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) return;

      // Since ReqRes doesn't have a GET user endpoint, we'll use the token
      // and create user data from localStorage
      setUserData({
        name: localStorage.getItem("userName") || "User",
        email: localStorage.getItem("userEmail") || "",
        avatar: localStorage.getItem("userAvatar") || "",
      });
    } catch (err) {
      console.error("Error fetching user data:", err);
    }
  };

  // Fetch courses from Fake Store API
  const fetchCourses = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products?limit=3");
      if (!response.ok) throw new Error("Failed to fetch courses");

      const data = await response.json();
      return data.length; // Return number of courses
    } catch (err) {
      console.error("Error fetching courses:", err);
      return 0;
    }
  };

  // Fetch assignments from JSONPlaceholder
  const fetchAssignments = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos?limit=5",
      );
      if (!response.ok) throw new Error("Failed to fetch assignments");

      const data = await response.json();
      const pending = data.filter((assignment) => !assignment.completed).length;
      const urgent = data.filter(
        (assignment) => !assignment.completed && assignment.id % 3 === 0,
      ).length;

      return { pending, urgent };
    } catch (err) {
      console.error("Error fetching assignments:", err);
      return { pending: 0, urgent: 0 };
    }
  };

  // Fetch all data
  useEffect(() => {
    const loadDashboardData = async () => {
      setLoading(true);
      setError("");

      try {
        const [User, coursesCount, assignmentsData] = await Promise.all([
          fetchUserData(),
          fetchCourses(),
          fetchAssignments(),
        ]);

        setStats({
          enrolledCourses: coursesCount,
          pendingAssignments: assignmentsData.pending,
          completionRate: Math.floor((assignmentsData.pending / 5) * 100),
          upcomingDeadlines: assignmentsData.urgent,
        });
      } catch (err) {
        setError("Failed to load dashboard data");
        console.error("Dashboard error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const StatCard = ({ icon: Icon, label, value, color }) => (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center">
        <div className={`p-3 rounded-full ${color} text-white mr-4`}>
          <Icon className="text-xl" />
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
          <p className="text-gray-600">{label}</p>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Welcome back, {userData?.name}!
        </h1>
        <p className="text-gray-600">
          Here's your learning progress and upcoming tasks.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={FaBook}
          label="Enrolled Courses"
          value={stats.enrolledCourses}
          color="bg-blue-500"
        />
        <StatCard
          icon={FaClock}
          label="Pending Assignments"
          value={stats.pendingAssignments}
          color="bg-yellow-500"
        />
        <StatCard
          icon={FaChartLine}
          label="Completion Rate"
          value={`${stats.completionRate}%`}
          color="bg-green-500"
        />
        <StatCard
          icon={FaExclamationTriangle}
          label="Urgent Deadlines"
          value={stats.upcomingDeadlines}
          color="bg-red-500"
        />
      </div>

      {/* User Info */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Your Account</h2>
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            <FaUser />
          </div>
          <div>
            <h3 className="font-medium text-gray-800">{userData?.name}</h3>
            <p className="text-gray-600">{userData?.email}</p>
            <p className="text-sm text-gray-500">
              Member ID: {localStorage.getItem("userId")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
