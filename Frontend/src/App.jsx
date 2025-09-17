import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import AddVotingSection from "./pages/AddVotingSection";
import ViewResult from "./pages/ViewResultPage";
import LandingPage from "./pages/LandingPage";
import UserDashboard from "./pages/UserDashboard";
import UserVotingPage from "./pages/UserVotingPage";
import UserViewResultPage from "./pages/UserViewResultPage";
import VotingSessions from "./pages/VotingSessions";
import Login from "./pages/Login";
import Register from "./pages/SignUp";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/add-voting-section" element={<AddVotingSection />} />
        <Route path="/admin/viewresult" element={<ViewResult />} />
        <Route path="/" element={<LandingPage />} />
        
        
        <Route path="/user/viewresult" element={<UserViewResultPage />} />
        <Route path="/sessions" element={<VotingSessions />} />

        <Route path="/user/dashboard/:chainId" element={<UserDashboard />} />
        <Route path="/user/:chainId/voting" element={<UserVotingPage />} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login/>} />

      </Routes>
    </Router>
  );
}

export default App;
