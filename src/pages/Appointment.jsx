import { useEffect, useState } from "react";
import { getPackages, createAppointment } from "../api/api";

export default function Appointment() {

  const [packages, setPackages] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    sex: "",
    age: "",
    address: "",
    phone: "",
    email: "",
    date: "",
    time: "",
    packageId: "",
    comments: ""
  });

  // ✅ Fetch packages from API
  useEffect(() => {
    getPackages().then((data) => {
      const active = data.filter((item) => item.status === "1");
      setPackages(active);
    });
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: formData.name,
      sex: formData.sex,
      age: formData.age,
      email: formData.email,
      address: formData.address,
      date: formData.date,
      time: formData.time,
      phone: formData.phone || null,
      comments: formData.comments || null,
      package_id: formData.packageId
    };

    try {
      const res = await createAppointment(payload);
      console.log("Response:", res);

      alert("Appointment booked successfully!");

      // Reset form
      setFormData({
        name: "",
        sex: "",
        age: "",
        phone: "",
        email: "",
        address: "",
        date: "",
        time: "",
        packageId: "",
        comments: ""
      });

    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-28 px-6">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">

        <h1 className="text-3xl font-bold text-purple-700 mb-6">
          Book an Appointment
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-12 gap-4">

            {/* Name - 6 columns */}
            <input
              required
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="col-span-12 md:col-span-6 p-3 border rounded"
            />

            {/* Sex - 3 columns */}
            <select
              required
              name="sex"
              value={formData.sex}
              onChange={handleChange}
              className="col-span-6 md:col-span-3 p-3 border rounded"
            >
              <option value="" disabled>Select Sex</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Third Gender">Third Gender</option>
            </select>

            {/* Age - 3 columns */}
            <input
              required
              type="number"
              name="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleChange}
              className="col-span-6 md:col-span-3 p-3 border rounded"
            />

          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <input
            required
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-3 border rounded"
          />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
            required
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-3 border rounded"
          />
          {/* Package Dropdown (Dynamic) */}
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
                {pkg.name} (£{pkg.price})
              </option>
            ))}

          </select>
        </div>
          {/* Date & Time */}
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
          <textarea
            required
            type="text"
            name="comments"
            placeholder="Input you comments"
            value={formData.comments}
            onChange={handleChange}
            className="w-full p-3 border rounded"
          ></textarea>

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