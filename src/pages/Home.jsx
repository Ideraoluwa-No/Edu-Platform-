import { Link } from "react-router-dom";
import { FaLaptop } from "react-icons/fa";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaCertificate } from "react-icons/fa";
import { FaDatabase } from "react-icons/fa";
import { MdDeveloperMode } from "react-icons/md";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* {Hero Section} */}
      <section
        id="home"
        className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20"
      >
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Learn without Limits
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Start your learning journey with our comprehensive platform
            featuring thouands of courses and expert instructors
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/signup"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Get Started
            </Link>
            <button
              onClick={() =>
                document
                  .getElementById("courses")
                  .scrollIntoView({ behavior: "smooth" })
              }
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              View Courses
            </button>
          </div>
        </div>
      </section>

      {/* {Features Section} */}

      <section id="features" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">
            Why <span className="text-blue-700">Choose</span> Us
          </h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            We provide the best learning experience with cutting-edge technology
            and expert instructors
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <div className="text-4xl mb-4 flex justify-center">
                <FaLaptop className="text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Intensive Learning</h3>
              <p className="text-gray-600">
                Engage with interactive exercises and real projects.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <div className="text-4xl mb-4 flex justify-center">
                <FaChalkboardTeacher className="text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Instructors</h3>
              <p className="text-gray-600">
                Learn from industry experts with practical experience.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <div className="text-4xl mb-4 flex justify-center">
                <FaCertificate className="text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Certified</h3>
              <p className="text-gray-600">
                Earn certificate that boost your career prospects.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-16 bg-gradient-to-r from-blue-600 to-purple-700 text-white"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            About EduPlatform
          </h2>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xl text-white mb-6">
              EduPlatform is a leading online learning platform dedicated to
              providing high-quality education to students worldwide. Our
              mission is to make education accessible, engaging, and effective
              for everyone.
            </p>
            <p className="text-xl text-white">
              With thousands of courses across various disciplines, we empower
              learners to achive their personal and professional goals at their
              own pace.
            </p>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold text-center mb-4 text-gray-800">
            Popular <span className="text-blue-600 text-3xl">Courses</span>
          </h3>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Explore our most popular courses and start your learning journey
            today.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {/* course 1 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-blue-100 flex items-center justify-center ">
                <span className="text-6xl text-blue-600">
                  <FaLaptop />
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Web Development</h3>
                <p className="text-gray-600 mb-4">
                  Learn full-stack web development from scratch.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-blue-600">
                    $89.99
                  </span>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    Enroll Now
                  </button>
                </div>
              </div>
            </div>
            {/* course 2 */}

            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-blue-100 flex items-center justify-center ">
                <span className="text-6xl text-blue-600">
                  <FaDatabase />
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Data Science</h3>
                <p className="text-gray-600 mb-4">
                  Master data analysis and machine learning.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-blue-600">
                    $94.99
                  </span>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    Enroll Now
                  </button>
                </div>
              </div>
            </div>

            {/* course 3 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-blue-100 flex items-center justify-center ">
                <span className="text-6xl text-blue-600">
                  <MdDeveloperMode />
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  Mobile Development
                </h3>
                <p className="text-gray-600 mb-4">
                  Build cross-platform mobile applications.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-blue-600">
                    $79.99
                  </span>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    Enroll Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-white">10,000+</div>
              <p>Active Students</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">500+</div>
              <p>Expert Instructor</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">2,000+</div>
              <p>Courses</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">95%</div>
              <p>Success Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4 text-blue-600">
            Contact Us
          </h2>
          <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  row="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your message"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="container max-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of students who have already transformed their
            careers with our courses
          </p>
          <Link
            to="/signup"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
          >
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
