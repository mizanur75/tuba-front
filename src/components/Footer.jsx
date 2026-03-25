export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-gray-100 py-6">
      <div className="max-w-6xl mx-auto px-6 text-sm text-gray-600 flex flex-col md:flex-row justify-between items-center gap-3">

        {/* Left */}
        <div>
          © {year} Sadia Therapy
        </div>

        {/* Right */}
        <div className="flex gap-4">
          <a href="#" className="hover:text-purple-700 transition">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-purple-700 transition">
            FAQ
          </a>
          <a href="#contact" className="hover:text-purple-700 transition">
            Contact
          </a>
        </div>

      </div>
    </footer>
  )
}