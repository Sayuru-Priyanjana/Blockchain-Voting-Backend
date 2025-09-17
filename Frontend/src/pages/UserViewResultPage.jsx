import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const UserViewResultPage = () => {
  const [timeLeft, setTimeLeft] = useState("");
  const [showResults, setShowResults] = useState(false);

  const results = {
    votingSection: "Best Hackathon Team",
    startTime: "2025-09-10 09:00:00",
    endTime: "2025-09-20 09:00:00", // 🔴 voting closes here
    candidates: [
      { name: "Team A", votes: 50 },
      { name: "Team B", votes: 35 },
      { name: "Team C", votes: 15 },
    ],
  };

  // countdown logic
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const end = new Date(results.endTime);
      const diff = end - now;

      if (diff <= 0) {
        setShowResults(true);
        setTimeLeft("Voting has ended!");
        clearInterval(interval);
      } else {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // chart data
  const data = {
    labels: results.candidates.map((c) => c.name),
    datasets: [
      {
        label: "Votes",
        data: results.candidates.map((c) => c.votes),
        backgroundColor: "rgba(99, 102, 241, 0.7)",
        borderColor: "rgba(255, 255, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-gray-900 to-black text-white p-8">
      <div className="max-w-4xl mx-auto bg-white/10 p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">{results.votingSection}</h1>

        {!showResults ? (
          <div className="text-center text-xl text-yellow-400">
            Voting ends in: <span className="font-bold">{timeLeft}</span>
          </div>
        ) : (
          <>
            <h2 className="text-xl font-semibold mb-4">Results</h2>
            <Bar data={data} options={{ responsive: true }} />
          </>
        )}
      </div>
    </div>
  );
};

export default UserViewResultPage;
