import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAbout, baseURL } from "../api/api";

export default function About() {
  const [aboutData, setAboutData] = useState(null);

  // Fetch API
  useEffect(() => {
    getAbout().then((data) => {
      if (data.length > 0) {
        setAboutData(data[0]); // take first object
      }
    });
  }, []);


  return (
    <>
      {/* FIRST SECTION */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          {/* LEFT IMAGE */}
          <div className="space-y-6">
            <img
              src={
                aboutData?.image1
                  ? baseURL+"storage/" + aboutData.image1
                  : "https://via.placeholder.com/500"
              }
              alt="about"
              className="w-full rounded-lg shadow-lg object-cover"
            />

            {/* badges (static optional) */}
            <div className="flex flex-wrap items-center gap-3">
              <img
                src="https://sadiatherapy.org/cf.396cc26879090842d511.png"
                className="h-24"
                alt="badge"
              />
              <img
                src="https://sadiatherapy.org/cp.19bad03edc1bd9b9a14f.png"
                className="h-24"
                alt="badge"
              />
              <img
                src="https://sadiatherapy.org/af.6ec285c7572ec9dfbd35.png"
                className="h-24"
                alt="badge"
              />
            </div>
          </div>

          {/* RIGHT TEXT */}
          <div>
            <h2 className="text-3xl md:text-4xl text-purple-700 font-bold font-explore">
              {aboutData?.title1 || "Know Your Hero"}
            </h2>

            <p className="mt-2 text-sm sm:text-base text-justify text-gray-500 leading-relaxed">
              {aboutData?.description1 || "Loading..."}
            </p>
          </div>

        </div>
      </section>

      {/* SECOND SECTION */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">

          {/* LEFT TEXT */}
          <div>
            <h2 className="text-3xl md:text-4xl text-purple-700 font-bold font-explore">
              {aboutData?.title2 || "Explore My Therapy"}
            </h2>

            <p className="mt-2 text-sm sm:text-base text-justify text-gray-500 leading-relaxed">
              {aboutData?.description2 || "Loading..."}
            </p>

            <div className="mt-4">
              <Link
                to="/appointment"
                className="text-center px-4 py-3 bg-gradient-to-r from-purple-700 to-pink-600 text-white rounded-md text-sm font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                Free Discovery Call
              </Link>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div>
            <img
              src={
                aboutData?.image2
                  ? baseURL+"storage/" + aboutData.image2
                  : "https://via.placeholder.com/500"
              }
              alt="about"
              className="w-full rounded-lg shadow-md object-cover"
            />
          </div>

        </div>
      </section>
    </>
  );
}