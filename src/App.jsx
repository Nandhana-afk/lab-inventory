import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StudentForm from "./components/StudentForm";
import RFIDScanner from "./components/RFIDScanner";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StudentForm />} />
        <Route path="/scan" element={<RFIDScanner />} />
      </Routes>
    </Router>
  );
}
