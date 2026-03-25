import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Steps from "./components/Steps";
import Packages from "./components/Packages";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

import Appointment from "./pages/Appointment";

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return null;
}

function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Steps />
      <Packages />
      <Testimonials />
      <Contact />
    </>
  );
}

function App() {
  return (
    <>
      <Navbar />
      <ScrollToHash />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/appointment" element={<Appointment />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;