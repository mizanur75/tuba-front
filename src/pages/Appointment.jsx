import { useEffect, useState } from "react";
import {
  getPackages,
  createAppointment,
  fetchAPI
} from "../api/api";

export default function Appointment() {
  const [packages, setPackages] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);

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

  // ✅ Fetch packages
  useEffect(() => {
    getPackages().then((data) => {
      const active = data.filter((item) => item.status === "1");
      setPackages(active);
    });
  }, []);

  // ✅ Fetch booked slots when date changes
  useEffect(() => {
    if (formData.date) {
      fetchAPI(`/appointments?date=${formData.date}`).then((data) => {

        // 🔥 FIX: convert 16:00:00 → 16:00
        const times = data.map((item) => item.time.slice(0, 5));

        setBookedSlots(times);

        // reset selected time
        setFormData((prev) => ({ ...prev, time: "" }));
      });
    }
  }, [formData.date]);

  // ✅ Generate 15-min slots
  const generateTimeSlots = () => {
    const slots = [];
    let start = 16 * 60;
    let end = 18 * 60;

    for (let i = start; i <= end; i += 15) {
      const h = String(Math.floor(i / 60)).padStart(2, "0");
      const m = String(i % 60).padStart(2, "0");
      slots.push(`${h}:${m}`);
    }

    return slots;
  };

  const today = new Date().toISOString().split("T")[0];

  const isToday = formData.date === today;

  const now = new Date();
  const currentTime = `${String(now.getHours()).padStart(2, "0")}:${String(
    now.getMinutes()
  ).padStart(2, "0")}`;

  // ✅ Filter available slots
  const availableSlots = generateTimeSlots().filter((slot) => {
    const isBooked = bookedSlots.includes(slot);

    if (isToday) {
      return !isBooked && slot > currentTime;
    }

    return !isBooked;
  });

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
      package_id: Number(formData.packageId)
    };

    try {
      const res = await createAppointment(payload);
      console.log("Response:", res);

      alert("Appointment booked successfully!");

      setFormData({
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

          {/* Name / Sex / Age */}
          <div className="grid grid-cols-12 gap-4">

            <input
              required
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="col-span-12 md:col-span-6 p-3 border rounded"
            />

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

          {/* Email / Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

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
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 border rounded"
            />

          </div>

          {/* Address + Package */}
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

          {/* Date + Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <input
              required
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-3 border rounded"
            />

            <select
              required
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full p-3 border rounded"
            >
              <option value="">Select Time</option>

              {availableSlots.length === 0 ? (
                <option disabled>No slots available</option>
              ) : (
                availableSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))
              )}
            </select>

          </div>

          {/* Comments */}
          <textarea
            name="comments"
            placeholder="Write your comments"
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