import { useState } from "react";
// import { Link } from "react-router-dom";
import { FaGraduationCap } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
    // Close mobile menu after clicking
  };
  return (
    <header className="bg-white shadow-sm py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo - scroll to the top */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-2xl font-bold text-blue-600 hover:text-blue-700 flex justify-center "
        >
          <FaGraduationCap className="mr-2" />
          EduPlatform
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          <button
            onClick={() => scrollToSection("home")}
            className="text-gray-700 hover:text-blue-600 font-medium"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection("features")}
            className="text-gray-700 hover:text-blue-600 font-medium"
          >
            Features
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className="text-gray-700 hover:text-blue-600 font-medium"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection("courses")}
            className="text-gray-700 hover:text-blue-600 font-medium"
          >
            Courses
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="text-gray-700 hover:text-blue-600 font-medium"
          >
            Contact
          </button>
        </nav>

        {/* Auth Buttons */}

        <div className="hidden md:flex space-x-4">
          <Link
            to="/login"
            className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="text-xl">{"\u2630"}</span>
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-3">
            <button
              onClick={() => scrollToSection("home")}
              className="text-left text-gray-700 hover:text-blue-600 py-2"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("features")}
              className="text-left text-gray-700 hover:text-blue-600 py-2"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-left text-gray-700 hover:text-blue-600 py-2"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("courses")}
              className="text-left text-gray-700 hover:text-blue-600 py-2"
            >
              Courses
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-left text-gray-700 hover:text-blue-600 py-2"
            >
              Contact
            </button>
            <Link
              to="/login"
              className="text-left text-blue-600 hover:bg-blue-50 py-2 px-2 rounded-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="text-left bg-blue-600 text-white hover:bg-blue-700 py-2 px-2 rounded-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
