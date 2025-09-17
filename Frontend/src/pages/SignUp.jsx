import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const [nic, setNic] = useState("");
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [gender, setGender] = useState("");
  const [district, setDistrict] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await axios.post("http://localhost:5000/auth/signup", {
        nic,
        name: fullName,      // backend expects 'name'
        username: userName,  // optional
        gender,
        district,
        age,
        email,
        password,
      });

      setSuccess("Signup successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Server error. Try again later.");
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

      <div className="w-full max-w-lg bg-white/80 backdrop-blur-md border border-white/30 rounded-3xl shadow-2xl p-6 sm:p-10 flex flex-col">
        <h2 className="text-4xl font-extrabold text-center mb-6 text-white drop-shadow-lg tracking-wide">
          VoteChain Signup
        </h2>
        <p className="text-center text-[#7A85C1] mb-6 drop-shadow-md">
          Create your account to start voting securely
        </p>

        <div className="max-h-[75vh] overflow-y-auto pr-2 space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField
              label="NIC Number"
              value={nic}
              onChange={setNic}
              placeholder="Enter your NIC number"
            />
            <InputField
              label="Name"
              value={fullName}
              onChange={setFullName}
              placeholder="Enter your full name"
            />
            <SelectField
              label="Gender"
              value={gender}
              onChange={setGender}
              options={["Male", "Female"]}
            />
            <InputField
              label="District"
              value={district}
              onChange={setDistrict}
              placeholder="Enter your district"
            />
            <InputField
              label="Age"
              value={age}
              onChange={setAge}
              placeholder="Enter your age"
              type="number"
            />
            <InputField
              label="Email"
              value={email}
              onChange={setEmail}
              placeholder="Enter your email"
              type="email"
            />
            <InputField
              label="Password"
              value={password}
              onChange={setPassword}
              placeholder="Enter your password"
              type="password"
            />

            {error && (
              <p className="text-red-600 text-sm text-center animate-pulse drop-shadow">
                {error}
              </p>
            )}
            {success && (
              <p className="text-green-400 text-sm text-center animate-pulse drop-shadow">
                {success}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 px-5 rounded-2xl bg-gradient-to-r from-[#1A2A80] via-[#3B38A0] to-[#7A85C1] text-white font-bold text-lg shadow-lg hover:scale-105 hover:brightness-110 transition-all duration-300"
            >
              Sign Up
            </button>
          </form>
        </div>

        <p className="text-center mt-4 text-[#7A85C1] text-sm drop-shadow">
          Already have an account?{" "}
          <span
            className="underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

// Reusable input field
function InputField({ label, value, onChange, placeholder, type = "text" }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-[#3B38A0] mb-2 drop-shadow">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl bg-white/20 border border-[#3B38A0] text-gray-900 placeholder-black focus:outline-none focus:ring-2 focus:ring-[#3B38A0] focus:border-[#3B38A0]"
      />
    </div>
  );
}

// Reusable select field
function SelectField({ label, value, onChange, options }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-[#B2B0E8] mb-2 drop-shadow">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        className="w-full px-4 py-3 rounded-xl bg-white/20 border border-[#3B38A0] text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#3B38A0] focus:border-[#3B38A0]"
      >
        <option value="" disabled className="text-gray-500">
          Select {label.toLowerCase()}
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
