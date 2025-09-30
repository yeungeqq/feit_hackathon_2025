import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

type Score = { task: string; score: number };

const StudentProfile: React.FC = () => {
  const { id } = useParams(); // capture student ID
  const navigate = useNavigate();

  const assignedTasks = [
    "Assigned Exercises 1",
    "Assigned Exercises 2",
    "Assigned Exercises 3",
    "Assigned Exercises 4",
  ];

  const [previousScores, setPreviousScores] = useState<Score[]>([
    { task: "Assigned Exercises 1", score: 80 },
    { task: "Assigned Exercises 2", score: 55 },
    { task: "Assigned Exercises 3", score: 97 },
    { task: "Assigned Exercises 4", score: 70 },
  ]);

  const [selectedTask, setSelectedTask] = useState<string | null>(null);

  const suggestedTasks = [
    {
      title: "Suggested Exercise 1",
      content: `Look at the pictures! Can you find the one that starts with the sound /m/?

Here are the pictures: 🐭 🐶 🌞

Say the name of each picture out loud: mouse, dog, sun.
Which one begins with /m/? Tap it!

Yay! If you get it right, you win a cheer! 🎉 If not, try again—you’re getting better every time!`,
    },
    {
      title: "Suggested Exercise 2",
      content: "Custom instructions for Suggested Exercise 2.",
    },
    {
      title: "Suggested Exercise 3",
      content: "Custom instructions for Suggested Exercise 3.",
    },
    {
      title: "Suggested Exercise 4",
      content: "Custom instructions for Suggested Exercise 4.",
    },
  ];

  // 🔹 Fetch latest RAN test accuracy
  useEffect(() => {
    async function fetchLatestScore() {
      try {
        const res = await fetch(`/api/ran/latest/${id}`);
        const data = await res.json();

        if (data?.score !== undefined) {
          const newScore: Score = {
            task: "Latest RAN Test",
            score: Math.round(data.score * 100), // accuracy 0–1 → %
          };

          // Put latest score on top, drop last one
          setPreviousScores((prev) => [newScore, ...prev.slice(0, 3)]);
        }
      } catch (err) {
        console.error("Failed to fetch latest score:", err);
      }
    }

    if (id) {
      fetchLatestScore();
    }
  }, [id]);

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
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
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

        {/* Tasks + Scores */}
        <div className="grid grid-cols-3 gap-4">
          {/* Assigned Tasks */}
          <div className="bg-white p-4 rounded-md shadow">
            <h3 className="font-bold mb-2">Assigned Tasks</h3>
            {assignedTasks.map((task, idx) => (
              <div key={idx} className="flex items-center justify-between py-1">
                <span className="text-sm">{task}</span>
                <div className="space-x-2">
                  <button className="text-gray-600 hover:text-blue-600">✏️</button>
                  <button className="text-gray-600 hover:text-red-600">🗑️</button>
                </div>
              </div>
            ))}
          </div>

          {/* Previous Scores */}
          <div className="bg-white p-4 rounded-md shadow">
            <h3 className="font-bold mb-2">Previous Score</h3>
            {previousScores.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center py-1">
                <span className="text-sm">{item.task}</span>
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    item.score >= 75
                      ? "bg-green-100 text-green-800"
                      : item.score >= 60
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {item.score}%
                </span>
              </div>
            ))}
          </div>

          {/* Suggested Tasks */}
          <div className="bg-white p-4 rounded-md shadow">
            <h3 className="font-bold mb-2">Suggested Tasks</h3>
            {suggestedTasks.map((task, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between py-1 text-sm"
              >
                <span>{task.title}</span>
                <button
                  onClick={() => setSelectedTask(task.title)}
                  className="bg-gray-200 text-gray-800 px-2 py-1 rounded hover:bg-gray-300"
                >
                  More Info
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Modal */}
      {selectedTask && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
              onClick={() => setSelectedTask(null)}
            >
              ✖
            </button>

            {/* Task Content */}
            {suggestedTasks
              .filter((task) => task.title === selectedTask)
              .map((task, idx) => (
                <div key={idx}>
                  <h2 className="text-xl font-bold mb-4 text-center">
                    {task.title}
                  </h2>
                  <p className="text-sm text-gray-700 whitespace-pre-line mb-4">
                    {task.content}
                  </p>
                  <button
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                    onClick={() => {
                      alert(`${task.title} assigned!`);
                      setSelectedTask(null);
                    }}
                  >
                    Assign
                  </button>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentProfile;