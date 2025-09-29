import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Homepage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear session/auth if needed
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">AdaptEd</h1>
          <p className="text-xs text-gray-500">All For Students</p>
        </div>

        {/* User icons */}
        <div className="flex items-center justify-around py-4 border-b border-gray-200">
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200">
            👤
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 relative">
            🔔
            <span className="absolute top-1 right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
              9
            </span>
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 p-4 space-y-2">
          <a
            href="#"
            className="flex items-center px-3 py-2 rounded-md bg-gray-100 text-gray-900 font-medium"
          >
            🏠 Homepage
          </a>
          <a
            href="#"
            className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
          >
            📂 Resource Management
          </a>
        </nav>

        {/* Logout button */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition"
          >
            Log Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Homepage</h1>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
            Create Student Profile
          </button>
        </div>

        <h2 className="text-blue-600 font-semibold mb-4">Student Overview</h2>

        {/* Search */}
        <div className="flex items-center mb-4">
          <input
            type="text"
            placeholder="Search"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">
                  Student
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">
                  Age
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">
                  Latest Test Date
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">
                  Average Test Score
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">
                  Parent's Email
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">
                  Parent's Contact
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 8 }).map((_, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                        👤
                      </div>
                      <div>
                        <p className="text-sm font-medium text-blue-600 hover:underline">
                          <Link to="/student/123456">Jane Doe</Link>
                        </p>
                        <p className="text-xs text-gray-500">Student ID</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">Cell Text</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Cell Text</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Cell Text</td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    Mother/Father/Guardian <br />
                    Email Address
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    Mother/Father/Guardian <br />
                    Contact Number
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center space-x-2 mt-6">
          <button className="text-gray-600 text-sm">Previous</button>
          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              className={`px-3 py-1 text-sm rounded ${
                page === 2
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {page}
            </button>
          ))}
          <span className="text-sm text-gray-500">... 11</span>
          <button className="text-blue-600 text-sm font-medium">Next</button>
        </div>
      </main>
    </div>
  );
};

export default Homepage;