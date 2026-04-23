import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
  getPackages,
  createAppointment,
  fetchAPI,
  createStripeCheckoutSession
} from "../api/api";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY_LIVE || "");

// Custom Calendar Component
function Calendar({ selectedDate, onSelectDate }) {
  const [viewDate, setViewDate] = useState(() => {
    if (selectedDate) return new Date(selectedDate + "T00:00:00");
    return new Date();
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDay = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1; // Mon=0

  const daysInMonth = lastDay.getDate();
  const weeks = [];
  let week = new Array(startDay).fill(null);

  for (let d = 1; d <= daysInMonth; d++) {
    week.push(d);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }
  if (week.length > 0) {
    while (week.length < 7) week.push(null);
    weeks.push(week);
  }

  const isWeekend = (day) => {
    if (!day) return false;
    const date = new Date(year, month, day);
    const dow = date.getDay();
    return dow === 0 || dow === 6;
  };

  const isPast = (day) => {
    if (!day) return false;
    const date = new Date(year, month, day);
    return date < today;
  };

  const isSelected = (day) => {
    if (!day || !selectedDate) return false;
    const formatted = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return formatted === selectedDate;
  };

  const isToday = (day) => {
    if (!day) return false;
    return day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
  };

  const handleClick = (day) => {
    if (!day || isPast(day) || isWeekend(day)) return;
    const formatted = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    onSelectDate(formatted);
  };

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1));

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button type="button" onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <h3 className="text-sm font-semibold text-gray-800">{monthNames[month]} {year}</h3>
        <button type="button" onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 mb-2">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
          <div key={d} className="text-center text-xs font-medium text-gray-400 py-1">{d}</div>
        ))}
      </div>

      {/* Dates */}
      {weeks.map((week, wi) => (
        <div key={wi} className="grid grid-cols-7">
          {week.map((day, di) => {
            const disabled = !day || isPast(day) || isWeekend(day);
            const selected = isSelected(day);
            const todayMark = isToday(day);

            return (
              <div key={di} className="flex items-center justify-center py-1">
                {day ? (
                  <button
                    type="button"
                    disabled={disabled}
                    onClick={() => handleClick(day)}
                    className={`w-9 h-9 rounded-full text-sm font-medium transition-all duration-200 ${
                      selected
                        ? "bg-purple-700 text-white shadow-md"
                        : todayMark
                        ? "ring-2 ring-purple-400 text-purple-700 hover:bg-purple-50"
                        : disabled
                        ? "text-gray-300 cursor-not-allowed"
                        : "text-gray-700 hover:bg-purple-50 hover:text-purple-700"
                    }`}
                  >
                    {day}
                  </button>
                ) : (
                  <span className="w-9 h-9" />
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

// Time Slot Grid Component
function TimeSlotGrid({ slots, bookedSlots, selectedTime, onSelectTime, hasDate }) {
  if (!hasDate) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm flex items-center justify-center min-h-[280px]">
        <div className="text-center">
          <svg className="w-12 h-12 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <p className="text-gray-400 text-sm">Please select a date first</p>
        </div>
      </div>
    );
  }

  // Convert 24h to 12h format
  const to12h = (time) => {
    const [h, m] = time.split(":");
    const hour = parseInt(h);
    const ampm = hour >= 12 ? "PM" : "AM";
    const h12 = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${h12}:${m} ${ampm}`;
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
      <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
        <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        Available Time Slots
      </h3>

      {slots.length === 0 ? (
        <div className="text-center py-8">
          <svg className="w-10 h-10 mx-auto text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636" /></svg>
          <p className="text-gray-400 text-sm">No slots available for this date</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {slots.map((slot) => {
            const isBooked = bookedSlots.includes(slot);
            const isSelected = slot === selectedTime;

            return (
              <button
                key={slot}
                type="button"
                disabled={isBooked}
                onClick={() => onSelectTime(slot)}
                className={`px-2 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 border ${
                  isSelected
                    ? "bg-purple-700 text-white border-purple-700 shadow-md"
                    : isBooked
                    ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed line-through"
                    : "bg-white text-gray-700 border-purple-200 hover:border-purple-500 hover:bg-purple-50"
                }`}
              >
                {to12h(slot)}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function Appointment() {
  const [searchParams] = useSearchParams();
  const [packages, setPackages] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [embeddedClientSecret, setEmbeddedClientSecret] = useState("");
  const [notification, setNotification] = useState(null);
  const checkoutRef = useRef(null);
  const notificationTimeoutRef = useRef(null);

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

  const destroyEmbeddedCheckout = () => {
    if (checkoutRef.current) {
      checkoutRef.current.destroy();
      checkoutRef.current = null;
    }
  };

  const closeNotification = useCallback(() => {
    if (notificationTimeoutRef.current) {
      clearTimeout(notificationTimeoutRef.current);
      notificationTimeoutRef.current = null;
    }
    setNotification(null);
  }, []);

  const showNotification = useCallback((type, title, message) => {
    setNotification({ type, title, message });

    if (notificationTimeoutRef.current) {
      clearTimeout(notificationTimeoutRef.current);
    }

    notificationTimeoutRef.current = setTimeout(() => {
      setNotification(null);
      notificationTimeoutRef.current = null;
    }, 5000);
  }, []);

  useEffect(() => {
    return () => {
      if (notificationTimeoutRef.current) {
        clearTimeout(notificationTimeoutRef.current);
      }
    };
  }, []);

  // Fetch packages & pre-select from URL
  useEffect(() => {
    getPackages().then((data) => {
      const active = data.filter((item) => item.status === "1");
      setPackages(active);
      const pkgParam = searchParams.get("package");
      if (pkgParam) {
        setFormData((prev) => ({ ...prev, packageId: pkgParam }));
      }
    });
  }, [searchParams]);

  // Fetch booked slots when date changes
  useEffect(() => {
    if (formData.date) {
      fetchAPI(`/appointments?date=${formData.date}`).then((data) => {
        const times = data.map((item) => item.time.slice(0, 5));
        setBookedSlots(times);
        setFormData((prev) => ({ ...prev, time: "" }));
      });
    }
  }, [formData.date]);

  // Handle payment return from Stripe Checkout
  useEffect(() => {
    const paymentStatus = searchParams.get("payment");
    const pendingPayloadRaw = sessionStorage.getItem("pendingAppointmentPayload");
    const processingKey = "pendingAppointmentProcessing";

    if (paymentStatus === "success" && pendingPayloadRaw) {
      // Guard against duplicate inserts if this effect runs multiple times.
      if (sessionStorage.getItem(processingKey) === "1") return;
      sessionStorage.setItem(processingKey, "1");

      const createAfterPayment = async () => {
        let parsedPayload;

        try {
          parsedPayload = JSON.parse(pendingPayloadRaw);
          // Remove first so repeated effect runs cannot submit twice.
          sessionStorage.removeItem("pendingAppointmentPayload");

          await createAppointment(parsedPayload);
          showNotification(
            "success",
            "Appointment Confirmed",
            "Payment successful. Your appointment has been booked."
          );
        } catch (error) {
          console.error(error);
          // Restore payload to allow retry if request failed after removal.
          if (parsedPayload) {
            sessionStorage.setItem("pendingAppointmentPayload", JSON.stringify(parsedPayload));
          }
          alert("Payment succeeded, but booking failed. Please contact support.");
        } finally {
          sessionStorage.removeItem(processingKey);
        }
      };

      createAfterPayment();
    }

    if (paymentStatus === "cancelled" && pendingPayloadRaw) {
      sessionStorage.removeItem("pendingAppointmentPayload");
      sessionStorage.removeItem(processingKey);
      alert("Payment was cancelled. Your appointment was not booked.");
    }
  }, [searchParams, showNotification]);

  // Initialize Stripe Embedded Checkout inside appointment page
  useEffect(() => {
    if (!embeddedClientSecret) return;

    let active = true;

    const initEmbeddedCheckout = async () => {
      try {
        const stripe = await stripePromise;
        if (!stripe) {
          throw new Error("Stripe publishable key is missing. Set VITE_STRIPE_PUBLISHABLE_KEY_LIVE.");
        }

        const checkout = await stripe.createEmbeddedCheckoutPage({
          clientSecret: embeddedClientSecret,
          onComplete: () => {
            window.location.href = `${window.location.origin}/appointment?payment=success`;
          },
        });

        if (!active) {
          checkout.destroy();
          return;
        }

        checkoutRef.current = checkout;
        checkout.mount("#embedded-checkout");
      } catch (error) {
        console.error(error);
        alert(error.message || "Unable to load embedded checkout.");
        sessionStorage.removeItem("pendingAppointmentPayload");
        setEmbeddedClientSecret("");
      } finally {
        setSubmitting(false);
      }
    };

    initEmbeddedCheckout();

    return () => {
      active = false;
      destroyEmbeddedCheckout();
    };
  }, [embeddedClientSecret]);

  // Generate 15-min slots
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
  const currentTime = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

  const allSlots = generateTimeSlots();
  const availableSlots = allSlots.filter((slot) => {
    const isBooked = bookedSlots.includes(slot);
    if (isToday) return !isBooked && slot > currentTime;
    return !isBooked;
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateSelect = (date) => {
    const isWeekend = (d) => {
      const day = new Date(d).getDay();
      return day === 0 || day === 6;
    };
    if (isWeekend(date)) {
      alert("Weekends are not available. Please select a weekday.");
      return;
    }
    setFormData((prev) => ({ ...prev, date }));
  };

  const handleTimeSelect = (time) => {
    setFormData((prev) => ({ ...prev, time }));
  };

  const handleCloseEmbeddedCheckout = () => {
    destroyEmbeddedCheckout();
    setEmbeddedClientSecret("");
    setSubmitting(false);
    sessionStorage.removeItem("pendingAppointmentPayload");
  };

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

    const selectedPackage = packages.find((pkg) => String(pkg.id) === String(formData.packageId));
    const packagePrice = Number(selectedPackage?.price);
    const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY_LIVE;

    if (!selectedPackage) {
      alert("Please select a valid package.");
      return;
    }

    if (!publishableKey) {
      alert("Stripe publishable key is missing. Set VITE_STRIPE_PUBLISHABLE_KEY_LIVE.");
      return;
    }

    if (!Number.isFinite(packagePrice) || packagePrice <= 0) {
      alert("Selected package price is invalid.");
      return;
    }

    setSubmitting(true);
    try {
      sessionStorage.setItem("pendingAppointmentPayload", JSON.stringify(payload));

      const returnUrl = `${window.location.origin}/appointment?payment=success`;

      const session = await createStripeCheckoutSession({
        package_id: Number(formData.packageId),
        package_name: selectedPackage.name,
        amount: packagePrice,
        currency: "gbp",
        customer_email: formData.email,
        ui_mode: "embedded_page",
        return_url: returnUrl,
        metadata: {
          appointment_name: formData.name,
          appointment_date: formData.date,
          appointment_time: formData.time,
        },
      });

      const clientSecret = session?.client_secret;

      if (!clientSecret || typeof clientSecret !== "string") {
        throw new Error("Checkout session created, but client secret is missing.");
      }

      setEmbeddedClientSecret(clientSecret);
    } catch (error) {
      console.error(error);
      sessionStorage.removeItem("pendingAppointmentPayload");
      alert(
        error.message ||
        "Unable to start embedded checkout. Make sure backend endpoint /api/v1/checkout/session is implemented."
      );
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-28 px-4 sm:px-6">
      {notification && (
        <div className="fixed top-6 right-4 sm:right-6 z-50 w-[calc(100%-2rem)] sm:w-auto sm:max-w-md" role="status" aria-live="polite">
          <div className="rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-500 text-white shadow-2xl border border-white/20 px-4 py-3">
            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm">{notification.title}</p>
                <p className="text-sm text-emerald-50 mt-0.5">{notification.message}</p>
              </div>
              <button
                type="button"
                onClick={closeNotification}
                className="text-emerald-50 hover:text-white transition-colors"
                aria-label="Close notification"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-purple-700 font-explore">
            Book an Appointment
          </h1>
          <p className="mt-2 text-gray-500 text-sm">Fill in your details and choose your preferred date & time</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Personal Info Card */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              Personal Information
            </h2>

            <div className="space-y-4">
              <div className="grid grid-cols-12 gap-4">
                <input required type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange}
                  className="col-span-12 md:col-span-6 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition" />
                <select required name="sex" value={formData.sex} onChange={handleChange}
                  className="col-span-6 md:col-span-3 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition">
                  <option value="" disabled>Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Third Gender">Third Gender</option>
                </select>
                <input required type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange}
                  className="col-span-6 md:col-span-3 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input required type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition" />
                <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input required type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition" />
                <select required name="packageId" value={formData.packageId} onChange={handleChange}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition">
                  <option value="">Select Package</option>
                  {packages.map((pkg) => (
                    <option key={pkg.id} value={pkg.id}>{pkg.name} (£{pkg.price})</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Date & Time Card */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              Select Date & Time
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Calendar selectedDate={formData.date} onSelectDate={handleDateSelect} />
              <TimeSlotGrid
                slots={formData.date ? availableSlots : []}
                bookedSlots={bookedSlots}
                selectedTime={formData.time}
                onSelectTime={handleTimeSelect}
                hasDate={!!formData.date}
              />
            </div>

            {/* Hidden inputs for form validation */}
            <input type="hidden" name="date" value={formData.date} required />
            <input type="hidden" name="time" value={formData.time} required />

            {/* Selected summary */}
            {formData.date && formData.time && (
              <div className="mt-4 p-3 bg-purple-50 rounded-lg border border-purple-100 text-sm text-purple-700 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                Selected: <strong>{formData.date}</strong> at <strong>{formData.time}</strong>
              </div>
            )}
          </div>

          {/* Comments */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <textarea
              name="comments"
              placeholder="Additional comments (optional)"
              value={formData.comments}
              onChange={handleChange}
              rows={3}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition resize-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting || !formData.date || !formData.time || !!embeddedClientSecret}
            className="w-full py-3.5 bg-gradient-to-r from-purple-700 to-pink-600 text-white rounded-xl font-semibold text-base shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {submitting ? "Preparing secure checkout..." : "Pay & Confirm Appointment"}
          </button>

          {embeddedClientSecret && (
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-700">Secure Checkout</h3>
                <button
                  type="button"
                  onClick={handleCloseEmbeddedCheckout}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Close
                </button>
              </div>
              <div id="embedded-checkout" className="min-h-[680px]" />
            </div>
          )}

        </form>
      </div>
    </div>
  );
}