import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Booking from "./components/Booking";
import Profile from "./components/Profile";
import Register from "./components/Register";
import NotFound from "./components/NotFound";
import Homepage from "./components/Homepage";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/appointment" element={<Booking />} />
          <Route path="/appointments/edit/:id" element={<Booking />} />
          <Route path="/appointments/cancel/:id" element={<Booking />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
