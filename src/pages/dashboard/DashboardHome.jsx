// src/pages/dashboard/DashboardHome.jsx
import { useState, useEffect } from "react";
import {
  FaUsers,
  FaBook,
  FaClock,
  FaChartLine,
  FaExclamationTriangle,
} from "react-icons/fa";

const DashboardHome = () => {
  const [stats, setStats] = useState({
    enrolledCourses: 0,
    pendingAssignments: 0,
    completionRate: 0,
    upcomingDeadlines: 0,
  });

  const [userData, setUserData] = useState(null);
  const [courses, setCourses] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch user data from ReqRes API (using stored token)
  const fetchUserData = async () => {
    const token = localStorage.getItem("authToken");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) return;

    try {
      setUserData({
        id: userId,
        email: localStorage.getItem("userEmail"),
        name: localStorage.getItem("userName"),
        avatar: `https://reqres.in/img/faces/${userId}-image.jpg`,
      });
    } catch (err) {
      console.error("Error fetching user data:", err);
    }
  };

  // Fetch courses from JSONPlaceholder (mock data)
  const fetchCourses = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts?_limit=3",
      );
      if (!response.ok) throw new Error("Failed to fetch courses");

      const data = await response.json();
      const mockCourses = data.map((post, index) => ({
        id: post.id,
        title: post.title,
        description: post.body.substring(0, 100) + "...",
        progress: Math.floor(Math.random() * 100),
        instructor: `Instructor ${index + 1}`,
        enrolled: Math.floor(Math.random() * 1000) + 100,
      }));

      setCourses(mockCourses);
      return mockCourses.length;
    } catch (err) {
      console.error("Error fetching courses:", err);
      return 0;
    }
  };

  // Fetch assignments/todos from JSONPlaceholder
  const fetchAssignments = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=5",
      );
      if (!response.ok) throw new Error("Failed to fetch assignments");

      const data = await response.json();
      const mockAssignments = data.map((todo) => ({
        id: todo.id,
        title: `Assignment ${todo.id}`,
        course: `Course ${todo.userId}`,
        dueDate: new Date(Date.now() + todo.id * 86400000).toLocaleDateString(),
        completed: todo.completed,
        priority:
          todo.id % 3 === 0 ? "High" : todo.id % 3 === 1 ? "Medium" : "Low",
      }));

      setAssignments(mockAssignments);

      // Calculate stats
      const pending = mockAssignments.filter((a) => !a.completed).length;
      const upcoming = mockAssignments.filter(
        (a) => !a.completed && a.priority === "High",
      ).length;

      return { pending, upcoming };
    } catch (err) {
      console.error("Error fetching assignments:", err);
      return { pending: 0, upcoming: 0 };
    }
  };

  // Fetch all data on component mount
  useEffect(() => {
    const loadDashboardData = async () => {
      setLoading(true);
      setError("");

      try {
        const [coursesCount, assignmentsData] = await Promise.all([
          fetchUserData(),
          fetchCourses(),
          fetchAssignments(),
        ]);

        setStats({
          enrolledCourses: coursesCount,
          pendingAssignments: assignmentsData.pending,
          completionRate: Math.floor((assignmentsData.pending / 5) * 100),
          upcomingDeadlines: assignmentsData.upcoming,
        });
      } catch (err) {
        setError("Failed to load dashboard data. Please try again.");
        console.error("Dashboard loading error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  // Fixed StatCard component
  const StatCard = ({ icon: label, value, color }) => (
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
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Welcome back, {userData?.name || "Student"}!
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

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enrolled Courses */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Your Courses</h2>
          <div className="space-y-4">
            {courses.map((course) => (
              <div
                key={course.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800">{course.title}</h3>
                  <p className="text-sm text-gray-600">{course.instructor}</p>
                </div>
                <div className="text-right">
                  <div className="w-16 h-2 bg-gray-200 rounded-full mb-1">
                    <div
                      className="h-2 bg-blue-500 rounded-full"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500">
                    {course.progress}% complete
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Assignments */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Upcoming Assignments</h2>
          <div className="space-y-3">
            {assignments
              .filter((a) => !a.completed)
              .slice(0, 3)
              .map((assignment) => (
                <div
                  key={assignment.id}
                  className={`p-3 border-l-4 rounded ${
                    assignment.priority === "High"
                      ? "bg-red-50 border-red-500"
                      : assignment.priority === "Medium"
                        ? "bg-yellow-50 border-yellow-500"
                        : "bg-blue-50 border-blue-500"
                  }`}
                >
                  <p className="font-medium text-gray-800">
                    {assignment.title}
                  </p>
                  <p className="text-sm text-gray-600">{assignment.course}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-gray-500">
                      Due: {assignment.dueDate}
                    </span>
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        assignment.priority === "High"
                          ? "bg-red-100 text-red-800"
                          : assignment.priority === "Medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {assignment.priority}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* User Info Card */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Your Account</h2>
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {userData?.name?.charAt(0) || "U"}
          </div>
          <div>
            <h3 className="font-medium text-gray-800">
              {userData?.name || "User"}
            </h3>
            <p className="text-gray-600">{userData?.email}</p>
            <p className="text-sm text-gray-500">
              Member since: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
