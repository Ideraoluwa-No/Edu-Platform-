import { Link } from "react-router-dom";

const Footer = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">EduPlatform</h3>
            <p className="text-gray-400">
              Empowering learners worldwide with high-quality education and
              resources.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <div className="flex flex-col space-y-2">
              <button
                onClick={() => scrollToSection("home")}
                className="text-gray-400 hover:text-white"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("features")}
                className="text-gray-400 hover:text-white"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-gray-400 hover:text-white"
              >
                About
              </button>
            </div>
          </div>

          {/* <div>
            <h4 className="text-lg font-semibold mb-4 ">Company</h4>
            <div className="flex flex-col space-y2">
              <button
                onClick={() => scrollToSection("courses")}
                className="text-gray-400 hover:text-white"
              >
                Courses
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-gray-400 hover:text-white"
              >
                Contact Us
              </button>
            </div>
          </div> */}

          <div>
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <div className="text-gray-400 space-y-2">
              <p>Email: info@eduplatform.com</p>
              <p>Phone: +234 816 243 0516</p>
              <p>Phone: +234 904 628 2466</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 EduPlatform. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
