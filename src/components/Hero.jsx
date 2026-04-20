import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getVideos, baseURL } from "../api/api";

export default function Hero() {
  const [videoData, setVideoData] = useState([]);
  const [current, setCurrent] = useState(0);
  const [animate, setAnimate] = useState(true);

  // Fetch API
  useEffect(() => {
    getVideos().then((data) => {
      setVideoData(data);
    });
  }, []);

  // Slider based on API data
  useEffect(() => {
    if (videoData.length === 0) return;

    const interval = setInterval(() => {
      setAnimate(false);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % videoData.length);
        setAnimate(true);
      }, 100);
    }, 6000);

    return () => clearInterval(interval);
  }, [videoData]);

  // Current slide data
  const currentSlide = videoData[current] || {};

  // Video full URL
  const videoUrl = currentSlide.video
    ? baseURL + "storage/" + currentSlide.video
    : "https://www.w3schools.com/html/mov_bbb.mp4";

  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden">
      {/* Video */}
      <video
        key={videoUrl}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        src={videoUrl}
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex items-center px-6 sm:px-10 md:px-16 lg:px-24">
        <div className={`w-full max-w-sm sm:max-w-md md:max-w-xl lg:max-w-3xl space-y-4 sm:space-y-5 text-left transition-all duration-700 ${animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>

          {/* Subtitle */}
          <p className="w-fit bg-[#5b1462] text-white px-5 py-2.5 rounded-md text-xs sm:text-sm md:text-base lg:text-lg font-medium tracking-wide">
            {currentSlide.subTitle || "Master Your Mind With"}
          </p>

          {/* Title */}
          <h1 className="w-fit bg-[#5b1462]/90 text-white text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold px-5 py-3 sm:py-4 rounded-md leading-snug">
            {currentSlide.title || "Solution-Focused Hypnotherapy"}
          </h1>

          {/* Description */}
          <p className="w-fit bg-black/50 backdrop-blur-sm text-white/90 px-5 py-3 rounded-md text-xs sm:text-sm md:text-base leading-relaxed">
            {currentSlide.shortDescription || "Loading..."}
          </p>

          {/* Button */}
          <div className="pt-1 sm:pt-2">
            <Link
              to="/appointment"
              className="inline-block bg-white text-purple-700 font-semibold px-5 py-2.5 sm:px-7 sm:py-3 md:px-8 md:py-3.5 rounded-md  text-sm sm:text-base hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Free Discovery Call
            </Link>
          </div>
        </div>
      </div>

      {/* Slide indicators */}
      {videoData.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {videoData.map((_, idx) => (
            <button
              key={idx}
              onClick={() => { setAnimate(false); setTimeout(() => { setCurrent(idx); setAnimate(true); }, 100); }}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${idx === current ? "bg-white scale-125" : "bg-white/50 hover:bg-white/75"}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}