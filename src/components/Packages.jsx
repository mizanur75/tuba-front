import { Link } from "react-router-dom"

export default function Packages() {
  const packages = [
    {
      price: "£40.00",
      title: "Relaxation Session",
      description:
        "Deep relaxation sessions provide a warm space so clients take control of finding a solution while relaxing from the comfort of their couch."
    },
    {
      price: "£120.00",
      title: "Single Session",
      description:
        "Ideal for working with stress, limiting beliefs, and anxiety. A focused session to build a plan of action."
    },
    {
      price: "£300.00",
      title: "Three Session Package",
      description:
        "Suitable for anyone wanting in-depth support to overcome ongoing challenges like anxiety or chronic stress."
    },
    {
      price: "£500.00",
      title: "Five Session Package",
      description:
        "For clients wanting a longer-term program and consistent transformation."
    }
  ]

  return (
    <section id="packages" className="max-w-6xl mx-auto px-6 py-12">
      
      {/* Section Title */}
      <h3 className="text-center text-2xl text-purple-700 font-bold">
        Packages
      </h3>

      <p className="text-center mt-3 text-gray-600">
        Choose a plan that suits your needs
      </p>

      {/* Cards */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 flex flex-col justify-between h-full">
        
        {packages.map((item, index) => (
            <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition duration-300 flex flex-col h-full"
            >

                <div className="flex flex-col h-full justify-between">

                <div>
                    <div className="text-xl font-bold text-purple-700">
                    {item.price}
                    </div>

                    <div className="mt-2 text-sm text-gray-600">
                    {item.title}
                    </div>

                    <p className="mt-4 text-sm text-gray-700">
                    {item.description}
                    </p>
                </div>

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
            ))}

      </div>
    </section>
  )
}