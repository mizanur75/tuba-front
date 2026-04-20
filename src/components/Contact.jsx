import { useState } from "react"
import { Link } from "react-router-dom"

export default function Contact() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    phone: "",
    message: ""
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form Data:", formData)
    alert("Message sent successfully!")
    
    // reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      phone: "",
      message: ""
    })
  }

  return (
    <section id="contact" className="bg-white py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* LEFT SIDE */}
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-3xl font-bold text-purple-700">
                Sadia Afrin
              </h2>
              <p className="text-gray-600 mt-2">
                Master Your Mind With Solution-Focused Hypnotherapy
              </p>
            </div>

            <p className="text-gray-600">
              If you'd like to enquire about sessions or availability,
              send a message below or book a free discovery call.
            </p>

            <Link
              to="/appointment"
              className="inline-block px-6 py-3 bg-gradient-to-r from-purple-700 to-pink-600 text-white rounded-md text-sm font-semibold text-center shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              Book Appointment
            </Link>
          </div>

          {/* RIGHT SIDE (FORM) */}
          <form
            onSubmit={handleSubmit}
            className="bg-white border rounded-lg p-6 shadow-sm"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <input
                required
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="p-3 border rounded"
              />

              <input
                required
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="p-3 border rounded"
              />

              <input
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                className="p-3 border rounded"
              />

              <input
                name="phone"
                placeholder="Phone (optional)"
                value={formData.phone}
                onChange={handleChange}
                className="p-3 border rounded"
              />

              <textarea
                name="message"
                rows="4"
                placeholder="Write your message"
                value={formData.message}
                onChange={handleChange}
                className="sm:col-span-2 p-3 border rounded"
              />

              <div className="sm:col-span-2 flex justify-between items-center">
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-purple-700 to-pink-600 text-white rounded-md text-sm font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  Send Message
                </button>

                <span className="text-xs text-gray-500">
                  We respect your privacy
                </span>
              </div>

            </div>
          </form>

        </div>
      </div>
    </section>
  )
}