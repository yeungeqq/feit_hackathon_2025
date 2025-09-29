import React from "react";

const HandwritingUpload: React.FC = () => {
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
        <h1 className="text-2xl font-bold mb-4">Handwriting Analysis Upload</h1>
        <p className="text-gray-600 mb-6">
          Please upload an image of the student's homework. Ensure the page contains enough handwriting.
        </p>
        <div className="bg-white border-dashed border-2 border-gray-300 p-10 flex items-center justify-center rounded-lg mb-6">
          <span className="text-gray-400">📤 Drag & Drop / Click to Upload</span>
        </div>
        <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Upload
        </button>
      </main>
    </div>
  );
};

export default HandwritingUpload;