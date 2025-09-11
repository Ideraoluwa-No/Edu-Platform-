// src/pages/dashboard/Courses.jsx
import { useState, useEffect } from "react";
import { FaStar, FaShoppingCart } from "react-icons/fa";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch courses from Fake Store API
  const fetchCourses = async () => {
    try {
      const response = await fetch(
        "https://openlibrary.org/search.json?q=javascript",
      );
      const data = await response.json();

      // Transform products into courses
      const courseData = data.docs.slice(0, 9).map((book, index) => ({
        id: book.key || index,
        title: book.title,
        price: `$${Math.floor(Math.random() * 50) + 10}`,
        image: book.cover_i
          ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
          : "https://via.placeholder.com/200x300?text=No+Cover",
        rating: Math.floor(Math.random() * 5) + 1,
        category: book.subject ? book.subject[0] : "General",
        instructor: book.author_name ? book.author_name[0] : "Unknown Author",
      }));

      setCourses(courseData);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Available Courses
        </h1>
        <p className="text-gray-600">Browse our collection of courses</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-48 object-cover"
            />

            <div className="p-4">
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                {course.category}
              </span>

              <h3 className="text-lg font-semibold mt-2 mb-2 line-clamp-2">
                {course.title}
              </h3>

              <p className="text-gray-600 text-sm mb-2">
                by {course.instructor}
              </p>

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <FaStar className="text-yellow-400 mr-1" />
                  <span className="text-sm">{course.rating}</span>
                </div>
                <span className="text-lg font-bold text-blue-600">
                  {course.price}
                </span>
              </div>

              <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center">
                <FaShoppingCart className="mr-2" />
                Enroll Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
