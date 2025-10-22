import React, { useState, useEffect } from "react";
import { db, ref, get, child, update, push, set } from "../firebase";

export default function RFIDScanner() {
  const [uid, setUid] = useState("");
  const [equipment, setEquipment] = useState(null);
  const student = JSON.parse(localStorage.getItem("student"));

  const handleKeyPress = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const dbRef = ref(db);

      const snapshot = await get(child(dbRef, `equipments/${uid}`));
      if (!snapshot.exists()) {
        alert("Equipment not found!");
        setUid("");
        return;
      }

      const eq = snapshot.val();
      setEquipment(eq);

      let newStatus;
      let logAction;

      if (eq.status === "Available") {
        newStatus = "Issued";
        logAction = "Issued to student";
      } else {
        newStatus = "Available";
        logAction = "Returned to lab";
      }

      // Update equipment status
      await update(ref(db, `equipments/${uid}`), {
        status: newStatus,
        lastActionBy: student.name,
      });

      // Log transaction
      const logRef = push(ref(db, "logs"));
      await set(logRef, {
        uid,
        equipment: eq.name,
        student,
        action: logAction,
        timestamp: Date.now(),
      });

      alert(`Equipment ${logAction}!`);
      setUid("");
    }
  };

  useEffect(() => {
    window.addEventListener("keypress", handleKeyPress);
    return () => window.removeEventListener("keypress", handleKeyPress);
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-[600px] text-center">
        <h2 className="text-2xl font-semibold mb-4">RFID Scanning</h2>
        <p className="text-gray-500 mb-4">
          Place RFID tag near the reader to issue/return equipment
        </p>

        <input
          type="text"
          value={uid}
          onChange={(e) => setUid(e.target.value)}
          className="w-full border p-2 rounded-md text-center mb-4 focus:ring-2 focus:ring-blue-500"
          placeholder="Waiting for RFID input..."
        />

        {equipment && (
          <table className="w-full border-collapse border border-gray-300 mt-4">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">UID</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Range</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2">{uid}</td>
                <td className="border p-2">{equipment.name}</td>
                <td className="border p-2">{equipment.range}</td>
                <td className="border p-2">{equipment.status}</td>
                <td className="border p-2">
                  {equipment.status === "Available"
                    ? "Issue"
                    : "Return"}
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
