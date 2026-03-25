import { Link } from "react-router-dom";

export default function Testimonials() {
  return (
    <>
      {/* Need Solution Section */}
      <section id="need" className="max-w-6xl mx-auto px-6 py-12">
        <aside className="bg-white rounded-lg p-6 shadow-md">
          <div className="text-center">
            <h4 className="text-lg font-semibold text-purple-700">
              Need A Solution?
            </h4>
            <p className="mt-3 text-gray-600">Explore my programs</p>
          </div>

          <div className="mt-6 space-y-4">

            <div className="bg-gray-50 p-3 rounded border">
              <p className="text-sm text-gray-600">
                Free discovery call available — no obligation, 20 minutes.
              </p>
              <Link
                to="/appointment"
                className="mt-3 inline-block px-3 py-2 bg-white border rounded text-purple-700"
              >
                Free Discovery Call
              </Link>
            </div>
          </div>
        </aside>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="max-w-6xl mx-auto px-6 py-12">
        <div className="bg-slate-200 rounded-lg p-8 shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">

            <div className="md:col-span-3">
              <blockquote className="text-lg italic text-slate-800">
                “With hypnosis your mind is relaxed, you are fully present and
                it’s easier to access your inner positive emotions and creative mind.”
              </blockquote>
            </div>

            <div className="md:col-span-1 text-right">
              <div className="text-sm text-purple-700 font-bold">
                — Sadia Afrin
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}