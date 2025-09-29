import React from "react";

const RANTest: React.FC = () => {
  const colors = ["red","black","green","blue","yellow","orange","purple","gray"];
  const grid = Array(6).fill(null).map(() => Array(8).fill(null).map(
    () => colors[Math.floor(Math.random() * colors.length)]
  ));

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-white border-r border-gray-200 p-6">
        <h1 className="font-bold text-xl mb-6">AdaptEd</h1>
        <nav className="space-y-2">
          <a href="/homepage" className="block hover:bg-gray-100 p-2 rounded">🏠 Homepage</a>
          <a href="#" className="block hover:bg-gray-100 p-2 rounded">📂 Resource Management</a>
        </nav>
      </aside>

      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-4">Rapid Automatized Naming (RAN) Test</h1>
        <p className="text-gray-600 mb-6">Please enable microphone access before starting this test.</p>

        <div className="grid grid-cols-8 gap-4 mb-6">
          {grid.flat().map((c, idx) => (
            <div
              key={idx}
              className={`w-10 h-10 rounded-full`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>

        <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Submit
        </button>
      </main>
    </div>
  );
};

export default RANTest;