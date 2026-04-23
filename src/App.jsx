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

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getSettings } from "./api/api";

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

function HomePage({ settings }) {
  return (
    <>
      <Hero />
      <About />
      <Steps />
      <Packages />
      <Testimonials />
      <Contact settings={settings} />
    </>
  );
}

function App() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    getSettings().then((data) => {
      if (data && typeof data === "object") {
        setSettings(data);
      }
    });
  }, []);

  useEffect(() => {
    const siteName = settings?.site_name;
    const faviconUrl = settings?.favicon_url;

    if (siteName) {
      document.title = siteName;
    }

    if (faviconUrl) {
      let favicon = document.querySelector("link[rel='icon']");

      if (!favicon) {
        favicon = document.createElement("link");
        favicon.rel = "icon";
        document.head.appendChild(favicon);
      }

      favicon.href = faviconUrl;
    }
  }, [settings]);

  return (
    <>
      <Navbar settings={settings} />
      <ScrollToHash />

      <Routes>
        <Route path="/" element={<HomePage settings={settings} />} />
        <Route path="/appointment" element={<Appointment />} />
      </Routes>

      <Footer settings={settings} />
    </>
  );
}

export default App;