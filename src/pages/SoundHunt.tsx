import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SoundHuntGame: React.FC = () => {
  const rounds = [
    { sound: "c", correct: "🐱", options: ["🐱", "🐶", "🐵"], word: "Cat" },
    { sound: "d", correct: "🐶", options: ["🐱", "🐶", "🐵"], word: "Dog" },
    { sound: "m", correct: "🐵", options: ["🐱", "🐶", "🐵"], word: "Monkey" },
  ];

  const [roundIndex, setRoundIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("");
  const [gameOver, setGameOver] = useState(false);

  const navigate = useNavigate();
  const current = rounds[roundIndex];

  // 🔊 Speak the letter sound
  const playSound = () => {
    const utterance = new SpeechSynthesisUtterance(current.sound);
    utterance.lang = "en-US";
    utterance.rate = 0.9;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  const handleChoice = (choice: string) => {
    if (choice === current.correct) {
      setMessage("✅ Correct!");
      setScore(score + 1);
      setTimeout(() => {
        if (roundIndex < rounds.length - 1) {
          setRoundIndex(roundIndex + 1);
          setMessage("");
        } else {
          setGameOver(true);
        }
      }, 1000);
    } else {
      setMessage("❌ Try again!");
    }
  };

  const progress = ((roundIndex + (gameOver ? 1 : 0)) / rounds.length) * 100;

  // 🚀 Auto-redirect after Game Over
  useEffect(() => {
    if (gameOver) {
      const timeout = setTimeout(() => {
        navigate("/student-dashboard"); // redirect to dashboard
      }, 3000); // wait 3 seconds before redirect
      return () => clearTimeout(timeout);
    }
  }, [gameOver, navigate]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <main className="flex-1">
        {/* Dashboard container with gradient */}
        <div className="bg-gradient-to-br from-indigo-200 via-purple-200 to-blue-200 rounded-2xl shadow-lg p-6 h-full">
          
          {/* Greeting Header - Full Width */}
          <div className="w-full bg-blue-100 p-6 mb-6 flex items-center justify-between shadow">
            <div className="flex items-center gap-4">
              <span className="text-5xl">🦉</span>
              <h2 className="text-2xl font-bold text-gray-900">
                Sound Hunt 🎵
              </h2>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
            <div
              className="bg-green-500 h-4 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          {/* Score */}
          <p className="mb-6 text-gray-700 font-medium text-lg">
            Score: <span className="font-bold">{score}</span> / {rounds.length}
          </p>

          {/* Main Game Area */}
          {!gameOver ? (
            <div className="flex flex-col items-center justify-center min-h-[50vh]">
              {/* Audio Button */}
              <p className="text-xl font-semibold mb-4">Play this sound:</p>
              <button
                onClick={playSound}
                className="text-9xl mb-12 hover:scale-110 transition"
              >
                🔊
              </button>

              {/* Options */}
              <p className="mb-6 text-xl">Click the picture that starts with the sound:</p>
              <div className="flex justify-center gap-12 mb-8">
                {current.options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleChoice(opt)}
                    className="bg-white rounded-2xl p-10 text-8xl shadow-lg hover:bg-gray-100 transition"
                  >
                    {opt}
                  </button>
                ))}
              </div>

              {/* Message */}
              {message && <p className="mt-6 text-2xl font-bold">{message}</p>}
            </div>
          ) : (
            <>
              {/* Game Over Screen */}
                <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
                <h3 className="text-3xl font-bold mb-4">🎉 Game Over!</h3>
                <p className="text-xl mb-4">
                    Final Score: <span className="font-bold">{score}</span> / {rounds.length}
                </p>
                <p className="text-gray-600 text-lg">Redirecting to Dashboard...</p>
                </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default SoundHuntGame;
