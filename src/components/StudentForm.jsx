import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, ref, push, set } from "../firebase";
import { UserCircle, BookOpen, GraduationCap, FlaskConical } from 'lucide-react';
export default function StudentForm() {
  const [form, setForm] = useState({
    name: "",
    roll: "",
    class: "",
    experiment: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const studentRef = push(ref(db, "students"));
    await set(studentRef, form);
    localStorage.setItem("student", JSON.stringify(form));
    navigate("/scan");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Student Details</h2>
        {["name", "roll", "class", "experiment"].map((field) => (
          <input
            key={field}
            name={field}
            type="text"
            value={form[field]}
            onChange={handleChange}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            className="w-full p-2 mb-4 border rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
        ))}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Next → Scan RFID
        </button>
      </form>
    </div>
  );
}
