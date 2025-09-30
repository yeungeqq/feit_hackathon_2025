import React from "react";
import { Link } from "react-router-dom";

const StudentDashboard: React.FC = () => {
  const games = [
    { title: "Sound Hunt", emoji: "🎵", color: "bg-yellow-300" },
    { title: "Word Builder", emoji: "🔤", color: "bg-green-300" },
    { title: "Number Fun", emoji: "🔢", color: "bg-blue-300" },
    { title: "Letter Tracing", emoji: "✍️", color: "bg-pink-300" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Main content */}
      <main className="flex-1">
        {/* Dashboard container with gradient */}
        <div className="bg-gradient-to-br from-indigo-200 via-purple-200 to-blue-200 rounded-2xl shadow-lg p-6">
          
         {/* Greeting Header - Full Width */}
        <div className="w-full bg-blue-100 p-6 mb-6 flex items-center justify-between shadow">
        <div className="flex items-center gap-4">
            <span className="text-5xl">🦉</span>
            <h2 className="text-2xl font-bold text-gray-900">
            Hi Jane! <span className="ml-2">⭐</span>
            </h2>
        </div>
        </div>


            {/* Games Grid - 2x2 layout */}
            <div className="grid grid-cols-2 md:grid-cols-2 gap-6 w-full h-[calc(100vh-180px)]">
            {games.map((game) => (
                <div
                key={game.title}
                className={`${game.color} rounded-xl shadow-md flex flex-col items-center justify-center text-center p-6 h-81`}
                >
                <div className="text-7xl mb-4">{game.emoji}</div>
                <h2 className="text-2xl font-bold mb-4 text-gray-800">
                    {game.title}
                </h2>
                <button className="bg-white px-5 py-2 rounded-full font-medium shadow hover:bg-gray-100">
                    Play!
                </button>
                </div>
            ))}
            </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
