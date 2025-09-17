import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const [nationalId, setNationalId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await axios.post("http://localhost:5000/auth/login", {
        nic: nationalId,
        password: password
      });

      // Save user data and token to localStorage
      console.log(res.data.user);
      localStorage.setItem("user", JSON.stringify(res));
      localStorage.setItem("token", res.data.token);

      setSuccess("login successful...");

      // Navigate based on isAdmin
      if (res.data.isAdmin) {
        setTimeout(() => navigate("/admin"), 1000);
      } else {
        setTimeout(() => navigate("/sessions"), 1000);
      }
      console.log(res.data);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError("Server error. Try again later.");
      }
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background: "linear-gradient(270deg, #1A2A80, #3B38A0, #7A85C1)",
        backgroundSize: "600% 600%",
        animation: "gradientMove 20s ease infinite",
      }}
    >
      <style>
        {`
          @keyframes gradientMove {
            0% { background-position: 0% 50%; }
            25% { background-position: 50% 50%; }
            50% { background-position: 100% 50%; }
            75% { background-position: 50% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>

      <div className="w-full max-w-md bg-white/80 backdrop-blur-md border border-white/30 rounded-3xl shadow-2xl p-6 sm:p-10 flex flex-col">
        <h2 className="text-4xl font-extrabold text-center mb-6 text-white drop-shadow-lg tracking-wide">
          VoteChain Login
        </h2>
        <p className="text-center text-[#7A85C1] mb-6 drop-shadow-md">
          Create your account to start voting securely
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            label="National ID"
            value={nationalId}
            onChange={setNationalId}
            placeholder="Enter your National ID"
          />
          <InputField
            label="Password"
            value={password}
            onChange={setPassword}
            placeholder="Enter your password"
            type="password"
          />

          {error && (
            <p className="text-red-600 text-sm text-center animate-pulse drop-shadow">{error}</p>
          )}
          {success && (
            <p className="text-green-400 text-sm text-center animate-pulse drop-shadow">{success}</p>
          )}

          <button
            type="submit"
            className="w-full py-3 px-5 rounded-2xl bg-gradient-to-r from-[#1A2A80] via-[#3B38A0] to-[#7A85C1] text-white font-bold text-lg shadow-lg hover:scale-105 hover:brightness-110 transition-all duration-300"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-4 text-[#7A85C1] text-sm drop-shadow">
          Already have an account?{" "}
          <span className="underline cursor-pointer" onClick={() => navigate("/register")}>
            Register
          </span>
        </p>
      </div>
    </div>
  );
}

// Reusable input field
// Reusable input field
function InputField({ label, value, onChange, placeholder, type = "text" }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-[#3B38A0] mb-2 drop-shadow">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl bg-white/20 border border-[#3B38A0] text-gray-900 placeholder-black focus:outline-none focus:ring-2 focus:ring-[#1A2A80] focus:border-[#3B38A0]"
      />
    </div>
  );
}

