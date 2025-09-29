import React from "react";

const Homepage: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 p-4">
        <div className="flex items-center mb-8">
          <span className="text-lg font-bold">WebbyFrames</span>
        </div>

        <div className="mb-6">
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 mb-2">
            👤
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200">
            🔔
          </button>
        </div>

        <input
          type="text"
          placeholder="Search for..."
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm mb-4"
        />

        <nav>
          <a
            href="#"
            className="flex items-center px-3 py-2 rounded-md bg-gray-100 text-gray-900 font-medium"
          >
            🏠 Homepage
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Homepage</h1>

        <h2 className="text-blue-600 font-semibold mb-4">Student Overview</h2>

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
              <tr className="border-b">
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                      👤
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Jane Doe
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