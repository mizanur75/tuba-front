import { useEffect, useState } from "react";
import { getSteps } from "../api/api";

export default function Steps() {
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    getSteps()
      .then((data) => {
        setSteps(data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="bg-[#4b1650] text-white py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="space-y-10">

          {/* Loading State */}
          {steps.length === 0 ? (
            <p className="text-center text-white/70">Loading steps...</p>
          ) : (
            steps.map((step, index) => (
              <div key={step.id} className="flex gap-6 items-start">

                {/* LEFT SIDE (Number + Line) */}
                <div className="w-20 flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-white text-[#4b1650] font-bold text-lg flex items-center justify-center shadow">
                    {index + 1}
                  </div>

                  {/* Line (hide for last item) */}
                  {index !== steps.length - 1 && (
                    <div className="flex-1 w-px bg-white/30 mt-2"></div>
                  )}
                </div>

                {/* RIGHT SIDE (Content) */}
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-semibold">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm text-white/90 leading-relaxed">
                    {step.description}
                  </p>
                </div>

              </div>
            ))
          )}

        </div>
      </div>
    </section>
  );
}