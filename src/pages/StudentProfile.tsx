import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const StudentProfile: React.FC = () => {
  const { id } = useParams(); // capture student ID
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">AdaptEd</h1>
          <p className="text-xs text-gray-500">All For Students</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link
            to="/homepage"
            className="flex items-center px-3 py-2 rounded-md hover:bg-gray-100"
          >
            🏠 Homepage
          </Link>
          <a
            href="#"
            className="flex items-center px-3 py-2 rounded-md hover:bg-gray-100"
          >
            📂 Resource Management
          </a>
        </nav>
        <div className="p-4 border-t border-gray-200">
          <Link
            to="/login"
            className="w-full block bg-red-500 text-white py-2 text-center rounded-md hover:bg-red-600 transition"
          >
            Log Out
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Student Profile
        </h1>

        {/* Student + Parents Info */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-md shadow">
            <h2 className="text-lg font-bold mb-2">Jane Doe</h2>
            <p className="text-sm text-gray-600">Date of Birth: May/23/2020</p>
            <p className="text-sm text-gray-600">Enrolment: Sep/20/2023</p>
            <p className="text-sm text-gray-600">Student ID: {id}</p>
          </div>

          <div className="col-span-2 bg-white p-4 rounded-md shadow">
            <h2 className="text-lg font-bold mb-2">Parents/Guardians</h2>
            <div className="flex justify-between">
              <div>
                <p className="font-medium">John Doe (Father)</p>
                <p className="text-sm text-gray-600">
                  📞 04678919027 | 📧 john.d@gmail.com
                </p>
              </div>
              <div>
                <p className="font-medium">Sarah Doe (Mother)</p>
                <p className="text-sm text-gray-600">
                  📞 04678992737 | 📧 sarah.d@gmail.com
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Consent Section */}
        <div className="space-y-4 mb-6">
          <div className="bg-white p-4 flex items-center justify-between rounded-md shadow">
            <p className="text-gray-700">Consent for Test</p>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => navigate(`/consent-test-email`)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Edit Email Template
              </button>
              <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded">
                Incomplete
              </span>
            </div>
          </div>

          <div className="bg-white p-4 flex items-center justify-between rounded-md shadow">
            <p className="text-gray-700">Consent for Intervention</p>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => navigate(`/consent-intervention-email`)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Edit Email Template
              </button>
              <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded">
                Incomplete
              </span>
            </div>
          </div>

          <div className="bg-white p-4 flex items-center justify-between rounded-md shadow">
            <p className="text-gray-700">Share Diagnosis Report</p>
            <div className="flex items-center space-x-3">
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Send Email
              </button>
              <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded">
                Incomplete
              </span>
            </div>
          </div>
        </div>

        {/* Tests */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-md shadow">
            <h3 className="font-bold">Dysgraphia</h3>
            <p className="text-sm">Handwriting Analysis</p>
            <button
                onClick={() => navigate("/handwriting-upload")}
                className="w-full bg-blue-600 text-white mt-2 py-2 rounded-md hover:bg-blue-700"
                >
                Upload Picture Now
            </button>
          </div>
          <div className="bg-white p-4 rounded-md shadow">
            <h3 className="font-bold">Dyslexia</h3>
            <p className="text-sm">Rapid Automatized Naming (RAN)</p>
            <button
                onClick={() => navigate("/ran-test")}
                className="w-full bg-blue-600 text-white mt-2 py-2 rounded-md hover:bg-blue-700"
                >
                Start Test Now
            </button>
          </div>
          <div className="bg-white p-4 rounded-md shadow">
            <h3 className="font-bold">ADHD</h3>
            <p className="text-sm">Behavioural Questionnaire</p>
            <button
                onClick={() => navigate("/behavioural-questionnaire")}
                className="w-full bg-blue-600 text-white mt-2 py-2 rounded-md hover:bg-blue-700"
                >
                Start Test Now
            </button>
          </div>
        </div>

        {/* Charts Placeholder */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-md shadow h-40 flex items-center justify-center text-gray-400">
            📊 Monthly Posts (Chart Placeholder)
          </div>
          <div className="bg-white p-4 rounded-md shadow h-40 flex items-center justify-center text-gray-400">
            📊 Monthly Posts (Chart Placeholder)
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentProfile;