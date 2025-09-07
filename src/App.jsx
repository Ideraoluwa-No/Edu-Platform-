import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/login";
import SignUp from "./pages/SignUp";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";
import Courses from "./pages/dashboard/Courses";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Show header on all pages */}
        <Header />

        <main className="flex-grow">
          <Routes>
            {/* Landing page as the default route */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/dashboard/*"
              element={
                <DashboardLayout>
                  <Routes>
                    <Route path="" element={<DashboardHome />} />
                    <Route path="profile" element={<div>Profile</div>} />
                    <Route path="courses" element={<Courses />} />
                    <Route
                      path="assignments"
                      element={<div>Assignment Page</div>}
                    />
                  </Routes>
                </DashboardLayout>
              }
            />
          </Routes>
        </main>

        {/* Footer shows only except auth pages */}
        <Routes>
          <Route path="/" element={<Footer />} />
          <Route path="/*" element={null} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
