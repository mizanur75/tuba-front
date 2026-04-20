import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPackages } from "../api/api";

export default function Packages() {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    getPackages()
      .then((data) => {
        const active = data.filter((item) => item.status === "1");
        setPackages(active);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <section id="packages" className="max-w-6xl mx-auto px-6 py-16">

      {/* Section Header */}
      <div className="text-center mb-12">
        <h3 className="text-3xl md:text-4xl text-purple-700 font-bold font-explore">
          Packages
        </h3>
        <div className="w-16 h-1 bg-gradient-to-r from-purple-700 to-pink-500 mx-auto mt-3 rounded-full" />
        <p className="mt-4 text-gray-500 text-sm md:text-base max-w-md mx-auto">
          Choose a plan that suits your needs
        </p>
      </div>

      {/* Cards */}
      <div className={`grid grid-cols-1 sm:grid-cols-2 ${packages.length > 3 ? "lg:grid-cols-4" : "lg:grid-cols-3"} gap-6`}>

        {packages.length === 0 ? (
          <div className="col-span-full flex justify-center py-12">
            <div className="flex items-center gap-3 text-gray-400">
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
              Loading packages...
            </div>
          </div>
        ) : (
          packages.map((item, index) => (
            <div
              key={item.id}
              className={`group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col ${
                index === 1 ? "border-2 border-purple-700" : "border border-gray-100"
              }`}
            >
              {/* Top gradient accent */}
              <div className="h-1.5 bg-gradient-to-r from-purple-700 to-pink-500" />

              {/* Popular badge for second card */}
              {index === 1 && (
                <div className="absolute top-4 right-4 bg-purple-700 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                  Popular
                </div>
              )}

              <div className="p-6 flex flex-col flex-1">
                {/* Package Name */}
                <h4 className="text-lg font-bold text-gray-800 mb-3">
                  {item.name}
                </h4>

                {/* Price */}
                <div className="mb-4">
                  <span className="text-sm text-gray-400 align-top">£</span>
                  <span className="text-4xl font-extrabold text-purple-700">
                    {item.price}
                  </span>
                  <span className="text-sm text-gray-400 ml-1">/session</span>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-500 leading-relaxed flex-1 line-clamp-4">
                  {item.description}
                </p>

                {/* Divider */}
                <div className="border-t border-gray-100 my-5" />

                {/* CTA Button */}
                <Link
                  to={`/appointment?package=${item.id}`}
                  className="block w-full text-center px-4 py-3 bg-gradient-to-r from-purple-700 to-pink-600 text-white rounded-xl text-sm font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  Book an Appointment
                </Link>
              </div>
            </div>
          ))
        )}

      </div>
    </section>
  );
}