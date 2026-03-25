import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getVideos, baseURL } from "../api/api";

export default function Hero() {
  const [videoData, setVideoData] = useState([]);
  const [current, setCurrent] = useState(0);

  // ✅ Fetch API
  useEffect(() => {
    getVideos().then((data) => {
      setVideoData(data);
    });
  }, []);

  // ✅ Slider based on API data
  useEffect(() => {
    if (videoData.length === 0) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % videoData.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [videoData]);

  // ✅ Current slide data
  const currentSlide = videoData[current] || {};

  // ✅ Video full URL
  const videoUrl = currentSlide.video
    ? baseURL + currentSlide.video
    : "https://www.w3schools.com/html/mov_bbb.mp4";

  return (
    <section className="relative min-h-[500px] md:h-[520px] overflow-hidden">

      {/* Video */}
      <video
        key={videoUrl} // 🔥 important for refresh on slide change
        className="absolute w-full h-full object-cover"
        autoPlay
        muted
        loop
        src={videoUrl}
      />

      {/* Overlay */}
      <div className="absolute inset-0 flex items-center px-6 md:px-0 md:ml-32">

        <div className="max-w-2xl space-y-4 text-left">

          {/* Subtitle */}
          <div className="bg-[#5b1462] text-white inline-block px-4 py-2 rounded text-sm md:text-base">
            {currentSlide.subTitle || "Master Your Mind With"}
          </div>

          {/* Title */}
          <div className="bg-[#5b1462] text-white text-2xl sm:text-3xl md:text-4xl font-bold px-4 py-2 rounded leading-tight">
            {currentSlide.title || "Solution-Focused Hypnotherapy"}
          </div>

          {/* Description */}
          <div className="bg-black/50 text-white px-4 py-2 rounded text-sm md:text-base">
            {currentSlide.shortDescription || "Loading..."}
          </div>

          {/* Button */}
          <div>
            <Link
              to="/appointment"
              className="inline-block bg-white text-purple-700 font-semibold px-6 py-2 rounded hover:bg-gray-100 transition"
            >
              Free Discovery Call
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}