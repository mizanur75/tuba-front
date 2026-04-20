import { Link } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-br from-[#1a0a1e] to-[#2d1233] text-white">

      {/* Main Footer */}
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
                ST
              </div>
              <div>
                <div className="text-lg font-semibold">Sadia Therapy</div>
                <div className="text-xs text-white/50">Solution-Focused Hypnotherapy</div>
              </div>
            </div>
            <p className="text-sm text-white/60 leading-relaxed mt-2">
              Empowering positive change through solution-focused hypnotherapy. 
              Take the first step towards a better you.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/80 mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/" className="text-sm text-white/60 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/#packages" className="text-sm text-white/60 hover:text-white transition-colors">Packages</Link>
              </li>
              <li>
                <Link to="/#contact" className="text-sm text-white/60 hover:text-white transition-colors">Contact</Link>
              </li>
              <li>
                <Link to="/appointment" className="text-sm text-white/60 hover:text-white transition-colors">Book Appointment</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/80 mb-4">Get In Touch</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-white/60">
                <svg className="w-4 h-4 text-purple-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                info@sadiatherapy.org
              </li>
              <li className="flex items-center gap-3 text-sm text-white/60">
                <svg className="w-4 h-4 text-purple-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                United Kingdom
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-white/40">
            © {year} Sadia Therapy. All rights reserved.
          </p>
          <div className="flex gap-5">
            <a href="#" className="text-xs text-white/40 hover:text-white/70 transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-white/40 hover:text-white/70 transition-colors">FAQ</a>
          </div>
        </div>
      </div>

    </footer>
  )
}