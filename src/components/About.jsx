import { Link } from "react-router-dom";

export default function About() {
  return (
    <>
      {/* ABOUT SECTION */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          {/* LEFT COLUMN */}
          <div className="space-y-6">
            <img
              src="https://sadiatherapy.org.primex-bd.com/static/media/sadia.14d7ba87ec83259e3a70.jpg"
              alt="therapist"
              className="w-full rounded-lg shadow-lg object-cover"
            />

            <div className="flex flex-wrap items-center gap-3">
              <img
                src="https://sadiatherapy.org.primex-bd.com/static/media/cf.396cc26879090842d511.png"
                className="h-12"
                alt="badge"
              />
              <img
                src="https://sadiatherapy.org.primex-bd.com/static/media/cp.19bad03edc1bd9b9a14f.png"
                className="h-12"
                alt="badge"
              />
              <img
                src="https://sadiatherapy.org.primex-bd.com/static/media/af.6ec285c7572ec9dfbd35.png"
                className="h-12"
                alt="badge"
              />
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div>
            <h2 className="text-2xl text-purple-700 font-bold">
              Know Your Hero
            </h2>

            <p className="mt-4 text-gray-700 leading-relaxed">
              Well done! As you are on this page you have taken the first step
              to make a difference in your present life and/or in the lives of
              the people around you that matter to you.
            </p>

            <p className="mt-4 text-gray-700 leading-relaxed">
              Hypnotherapy can enhance the well-being of individuals diagnosed
              with medical conditions, along with existing medical treatment
              and advice. During these sessions you will have a safe and
              non-judgemental space to formulate your own solutions.
            </p>
          </div>

        </div>
      </section>
      <section className="max-w-6xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">

        {/* LEFT TEXT */}
        <div>
          <h2 className="text-xl text-purple-700 font-semibold">
            Explore My Therapy
          </h2>

          <p className="mt-3 text-gray-700">
            My sessions are online therefore during any restrictions,
            clients with mobility issues can receive full benefits.
          </p>

          <p className="mt-4 font-bold">
            My dream is to live in a world where mental health does not
            hinder people's ability to live fulfilling lives.
          </p>

          <div className="mt-4">
            <Link
              to="/appointment"
              className="px-4 py-2 bg-purple-700 text-white rounded"
            >
              Free Discovery Call
            </Link>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div>
          <img
            src="https://sadiatherapy.org.primex-bd.com/static/media/image1.6963cac0487180de383d.jpg"
            alt="relax"
            className="w-full rounded-lg shadow-md object-cover"
          />
        </div>

      </div>
    </section>
    </>
  )
}