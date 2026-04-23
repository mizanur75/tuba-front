import { Link } from "react-router-dom";
import { baseURL } from "../api/api";

export default function Footer({ settings }) {
  const year = new Date().getFullYear();
  const siteName = settings?.site_name || "Sadia Therapy";
  const siteTagline = settings?.site_tagline || "Solution-Focused Hypnotherapy";
  const supportEmail = settings?.support_email || "info@sadiatherapy.org";
  const supportPhone = settings?.support_phone || null;
  const officeAddress = settings?.office_address || "United Kingdom";
  const footerText = settings?.footer_text || `© ${year} ${siteName}. All rights reserved.`;
  const logoSrc = settings?.logo_url
    || (settings?.admin_logo ? `${baseURL}storage/${settings.admin_logo}` : null)
    || (settings?.logo ? `${baseURL}storage/${settings.logo}` : null);

  return (
    <footer className="bg-gradient-to-br from-[#1a0a1e] to-[#2d1233] text-white">

      {/* Main Footer */}
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              {logoSrc ? (
                <img
                  src={logoSrc}
                  alt="Brand"
                  className="w-10 h-10 rounded-full object-cover border border-white/20"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
                  ST
                </div>
              )}
              <div>
                <div className="text-lg font-semibold">{siteName}</div>
                <div className="text-xs text-white/50">{siteTagline}</div>
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
                {supportEmail}
              </li>
              {supportPhone && (
                <li className="flex items-center gap-3 text-sm text-white/60">
                  <svg className="w-4 h-4 text-purple-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a2 2 0 011.89 1.37l1.2 3.6a2 2 0 01-.45 2.11l-1.5 1.5a16 16 0 006.36 6.36l1.5-1.5a2 2 0 012.11-.45l3.6 1.2A2 2 0 0121 15.72V19a2 2 0 01-2 2h-1C9.16 21 3 14.84 3 7V5z" />
                  </svg>
                  {supportPhone}
                </li>
              )}
              <li className="flex items-center gap-3 text-sm text-white/60">
                <svg className="w-4 h-4 text-purple-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {officeAddress}
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-white/40">
            {footerText}
          </p>
          <div className="flex gap-5">
            {settings?.facebook_url && (
              <a href={settings.facebook_url} target="_blank" rel="noreferrer" className="text-xs text-white/40 hover:text-white/70 transition-colors">Facebook</a>
            )}
            {settings?.linkedin_url && (
              <a href={settings.linkedin_url} target="_blank" rel="noreferrer" className="text-xs text-white/40 hover:text-white/70 transition-colors">LinkedIn</a>
            )}
          </div>
        </div>
      </div>

    </footer>
  );
}