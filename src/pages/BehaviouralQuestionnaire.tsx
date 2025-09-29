import React, { useState } from "react";

const questions = [
  "Has difficulty sustaining attention in tasks or play (e.g., gets distracted easily).",
  "Makes careless mistakes in schoolwork.",
  "Does not seem to listen when spoken to directly.",
  "Fails to finish schoolwork, chores, or duties."
];

const options = ["Never/Rarely", "Sometimes", "Often", "Very Often"];

const BehaviouralQuestionnaire: React.FC = () => {
  const [answers, setAnswers] = useState<number[]>(Array(questions.length).fill(-1));

  const handleSelect = (qIndex: number, optionIndex: number) => {
    const updated = [...answers];
    updated[qIndex] = optionIndex;
    setAnswers(updated);
  };

  const handleSubmit = () => {
    console.log("Submitted Answers:", answers);
    alert("Responses submitted successfully ✅");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 p-6">
        <h1 className="font-bold text-xl mb-6">AdaptEd</h1>
        <nav className="space-y-2">
          <a href="/homepage" className="block hover:bg-gray-100 p-2 rounded">
            🏠 Homepage
          </a>
          <a href="#" className="block hover:bg-gray-100 p-2 rounded">
            📂 Resource Management
          </a>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-2">Behavioral Questionnaires</h1>
        <p className="text-sm text-gray-500 mb-6">
          <span className="text-red-600 font-bold">⚠ Note:</span> This is only for screening — not a diagnosis.
        </p>

        <div className="bg-white shadow-md rounded-md p-6">
          <h2 className="font-semibold text-lg mb-4">Part 1: Inattention</h2>
          {questions.map((q, qIndex) => (
            <div key={qIndex} className="mb-6">
              <p className="mb-2 font-medium">
                {qIndex + 1}. {q}
              </p>
              <div className="flex space-x-3">
                {options.map((opt, optIndex) => (
                  <button
                    key={optIndex}
                    onClick={() => handleSelect(qIndex, optIndex)}
                    className={`px-4 py-2 rounded-md border ${
                      answers[qIndex] === optIndex
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-gray-100 text-gray-700 border-gray-300"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Next
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BehaviouralQuestionnaire;