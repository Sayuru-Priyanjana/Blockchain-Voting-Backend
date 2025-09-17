// src/pages/ViewResultPage.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import axios from "axios";
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

const ViewResultPage = () => {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const chainId = JSON.parse(localStorage.getItem("chainId")) || '68cab29d950ca6be885bd240';

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/statistics/68cab29d950ca6be885bd240"
        );
        setResults(res.data);
      } catch (err) {
        console.error("Error fetching results:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  if (loading) return <p className="text-white text-xl">Loading...</p>;
  if (!results) return <p className="text-white text-xl">No results found.</p>;

  const candidatesWithPercentage = results.results.map((c) => ({
    ...c,
    percentage: c.percentage?.toFixed ? c.percentage.toFixed(2) : c.percentage,
  }));

  // Chart data
  const data = {
    labels: candidatesWithPercentage.map((c) => c.name),
    datasets: [
      {
        label: "Votes",
        data: candidatesWithPercentage.map((c) => c.votes),
        backgroundColor: [
          "rgba(43, 46, 237, 0.9)", // Indigo
          "rgba(16, 185, 129, 0.9)", // Emerald
          "rgba(239, 68, 68, 0.9)",  // Red
        ],
        borderColor: [
          "rgba(43, 46, 237, 1)",
          "rgba(16, 185, 129, 1)",
          "rgba(239, 68, 68, 1)",
        ],
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-900 via-gray-900 to-black text-white flex flex-col items-center py-16 px-4">
      <div className="max-w-6xl mx-auto flex flex-col gap-10 w-full">

        {/* Title */}
        <h1 className="text-5xl font-extrabold text-center bg-gradient-to-r from-indigo-400 via-emerald-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
  {results.sessionName}
</h1>

{/* Voting Info */}
<div className="flex flex-col lg:flex-row gap-6">
  <div className="flex-1 bg-white/10 backdrop-blur-md border border-indigo-400/40 rounded-2xl p-6 shadow-lg hover:shadow-indigo-600/30 transition-all">
    <p className="text-lg mb-2">
      <span className="font-semibold text-indigo-300">Total Votes:</span>{" "}
      {results.totalVotes}
    </p>
  </div>
</div>

      

        {/* Results Table */}
        <div className="bg-white/10 backdrop-blur-md border border-emerald-400/40 rounded-2xl p-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-emerald-300">Voting Results</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-white/90 border-collapse rounded-lg overflow-hidden">
              <thead className="bg-white/10 text-indigo-300">
                <tr>
                  <th className="px-4 py-3 text-left">Candidate</th>
                  <th className="px-4 py-3 text-left">Votes</th>
                  <th className="px-4 py-3 text-left">Percentage</th>
                </tr>
              </thead>
              <tbody>
                {candidatesWithPercentage.map((c, i) => (
                  <tr
                    key={i}
                    className={`${
                      i % 2 === 0 ? "bg-white/5" : "bg-white/0"
                    } hover:bg-white/10 transition`}
                  >
                    <td className="px-4 py-3">{c.name}</td>
                    <td className="px-4 py-3">{c.votes}</td>
                    <td className="px-4 py-3">{c.percentage}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white/10 backdrop-blur-md border border-pink-400/40 rounded-2xl p-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-pink-300">Votes Distribution</h2>
          <div className="h-72">
            <Bar data={data} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>

        {/* Winner */}
        <div className="bg-gradient-to-r from-yellow-500 to-yellow-400 text-black rounded-2xl p-6 shadow-2xl text-center border-4 border-yellow-300 animate-pulse">
          <h2 className="text-3xl font-extrabold tracking-wide drop-shadow-lg">
            🏆 Winner: {candidatesWithPercentage[0].name}
          </h2>
        </div>

        {/* Back Button */}
        <div className="text-center">
          <Link
            to="/"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-bold shadow-lg transition-transform transform hover:scale-105"
          >
            ⬅ Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ViewResultPage;
