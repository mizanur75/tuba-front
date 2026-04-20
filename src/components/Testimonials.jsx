import { Link } from "react-router-dom";

export default function Testimonials() {
  return (
    <>
      {/* Testimonials / Quote Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#5b1462] to-[#3a0d40] py-20">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-purple-500/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500/10 rounded-full translate-x-1/3 translate-y-1/3" />

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          {/* Quote icon */}
          <svg className="w-12 h-12 mx-auto mb-6 text-white/20" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>

          <blockquote className="text-xl sm:text-2xl md:text-3xl text-white font-light leading-relaxed italic">
            "With hypnosis your mind is relaxed, you are fully present and
            it's easier to access your inner positive emotions and creative mind."
          </blockquote>

          <div className="mt-8 flex items-center justify-center gap-3">
            <div className="w-10 h-[1px] bg-white/30" />
            <span className="text-sm font-semibold text-white/80 tracking-wider uppercase">
              Sadia Afrin
            </span>
            <div className="w-10 h-[1px] bg-white/30" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">

            {/* Left - Content */}
            <div className="p-8 md:p-10 flex flex-col justify-center">
              <h4 className="text-2xl md:text-3xl font-bold text-gray-800 font-explore">
                Need A Solution?
              </h4>
              <p className="mt-3 text-gray-500 leading-relaxed">
                Take the first step towards positive change. Book a free 20-minute
                discovery call — no obligation, just a friendly conversation about
                how hypnotherapy can help you.
              </p>
              <div className="mt-6">
                <Link
                  to="/appointment"
                  className="inline-block px-7 py-3 bg-gradient-to-r from-purple-700 to-pink-600 text-white rounded-md text-sm font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  Book a Free Discovery Call
                </Link>
              </div>
            </div>

            {/* Right - Visual */}
            <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50 p-10">
              <div className="text-center space-y-4">
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-purple-700 to-pink-500 flex items-center justify-center">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-sm text-gray-500 font-medium">Free 20-min Session</p>
                <p className="text-xs text-gray-400">No obligation · 100% confidential</p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
