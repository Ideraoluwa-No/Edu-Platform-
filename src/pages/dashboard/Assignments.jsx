import { useState, useEffect } from "react";

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAssignments = async () => {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/todos");
      const data = await res.json();

      // Take only first 10 demo
      const assignmentData = data.slice(0, 10).map((item) => ({
        id: item.id,
        title: item.title,
        completed: item.completed,
        deadline: "2025-09-20",
      }));

      setAssignments(assignmentData);
    } catch (err) {
      console.error("Error fetching assignments:", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAssignments();
  }, []);

  // Toggle completed status
  const toggleStatus = (id) => {
    setAssignments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, completed: !a.completed } : a)),
    );
  };
  if (loading) return <p>Loading assignments....</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 ">My Assignments</h1>
      <ul className="space-y-3">
        {assignments.map((a) => (
          <li
            key={a.id}
            className="p-4 bg-white shadow rounded flex justify-between items-center"
          >
            <div>
              <h2 className="font-semibold">{a.title}</h2>
              <p className="text-sm text-gray-500">Deadline: {a.deadline}</p>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`px-3 py-1 text-xs rounded ${a.completed ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}
              >
                {a.completed ? "Completed" : "Pending"}
              </span>
              <button
                onClick={() => toggleStatus(a.id)}
                className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Toggle
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Assignments;
