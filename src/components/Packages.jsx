import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPackages } from "../api/api";

export default function Packages() {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    getPackages()
      .then((data) => {
        // Optional: filter active only
        const active = data.filter((item) => item.status === "1");
        setPackages(active);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <section id="packages" className="max-w-6xl mx-auto px-6 py-12">

      {/* Title */}
      <h3 className="text-center text-2xl text-purple-700 font-bold">
        Packages
      </h3>

      <p className="text-center mt-3 text-gray-600">
        Choose a plan that suits your needs
      </p>

      {/* Cards */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {packages.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">
            Loading packages...
          </p>
        ) : (
          packages.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition duration-300 flex flex-col h-full"
            >

              <div className="flex flex-col h-full justify-between">

                {/* Content */}
                <div>
                  <div className="text-xl font-bold text-purple-700">
                    £{item.price}
                  </div>

                  <div className="mt-2 text-sm text-gray-600">
                    {item.name}
                  </div>

                  <p className="mt-4 text-sm text-gray-700">
                    {item.description}
                  </p>
                </div>

                {/* Button */}
                <div className="mt-6">
                  <Link
                    to="/appointment"
                    className="inline-block px-4 py-2 bg-purple-700 text-white rounded-full text-sm hover:bg-purple-800 transition"
                  >
                    Free Discovery Call
                  </Link>
                </div>

              </div>

            </div>
          ))
        )}

      </div>
    </section>
  );
}