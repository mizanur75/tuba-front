import { useState } from "react";

export default function Appointment() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
    packageId: ""
  });

  const packages = [
    { id: 1, name: "Relaxation Session (£40)" },
    { id: 2, name: "Single Session (£120)" },
    { id: 3, name: "Three Session Package (£300)" },
    { id: 4, name: "Five Session Package (£500)" }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      name: formData.name,
      email: formData.email,
      date: formData.date,
      time: formData.time,
      package_id: formData.packageId // only sending ID
    };

    console.log("Send to backend:", payload);

    // Example API call
    /*
    fetch("http://localhost:5000/api/appointment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
    */

    alert("Appointment request sent!");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">

        <h1 className="text-3xl font-bold text-purple-700 mb-6">
          Book an Appointment
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name */}
          <input
            required
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border rounded"
          />

          {/* Email */}
          <input
            required
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border rounded"
          />

          {/* Package Dropdown */}
          <select
            required
            name="packageId"
            value={formData.packageId}
            onChange={handleChange}
            className="w-full p-3 border rounded"
          >
            <option value="">Select Package</option>
            {packages.map((pkg) => (
              <option key={pkg.id} value={pkg.id}>
                {pkg.name}
              </option>
            ))}
          </select>

          {/* Date & Time Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <input
                required
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full p-3 border rounded"
            />

            <input
                required
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full p-3 border rounded"
            />

            </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-purple-700 text-white rounded hover:bg-purple-800 transition"
          >
            Confirm Appointment
          </button>

        </form>
      </div>
    </div>
  );
}