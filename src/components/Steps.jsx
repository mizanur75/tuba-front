export default function Steps() {
  const steps = [
    {
      title: "Free No-Obligation 20-Minute Discovery Call",
      description:
        "No obligation 20 minutes consultation is available for clients. This will allow us to find out if we are the right fit for each other. You may ask questions to have an idea about my services. I will find out about your pain points to provide the right solution for you. If it is not a good fit, I will point you in the right direction. If we are a good fit to embark on working together, I will send you consent and intake forms which need to be signed and returned with your payment before scheduling a session with me."
    },
    {
      title: "Hypnotherapy Session Online",
      description:
        "The first session which lasts for 1 hour, involves gathering information and explaining how the mind works. While taking the time to know and understand you, I will focus on your strengths and resilience, and build a relationship with you. Consequent sessions are focused on exploring solutions and applying hypnosis. Each session is productively engaging so you can walk away with a sense of relief, peace, and knowledge for your support. A confidential space is offered to explore the thoughts, feelings, and challenges in your life and help you find confidence, happiness, and peace by equipping you with the tools you need to manage your emotions and know yourself."
    },
    {
      title: "An Audio Of Hypnosis",
      description:
        "After our first session, I will send a voice recording that you listen to daily along with our sessions. I will send this recording to you via a preferred media so you can download the recording onto your mobile phone or computer for daily listening. Repeated listening to your recording will allow the new, positive, and supporting beliefs to be firmly installed."
    },
    {
      title: "Post-Session Follow-Up",
      description:
        "The success of your investment depends on the fact that you work according to our agreed plan which is made during the session and also listen to your recording daily. I will be in touch with you ten days after your session to support you. If needed we will schedule a check-in call."
    }
  ]

  return (
    <section className="bg-[#4b1650] text-white py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="space-y-10">

          {steps.map((step, index) => (
            <div key={index} className="flex gap-6 items-start">

              {/* LEFT SIDE (Number + Line) */}
              <div className="w-20 flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-white text-[#4b1650] font-bold text-lg flex items-center justify-center shadow">
                  {index + 1}
                </div>

                {/* Hide line for last item */}
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
          ))}

        </div>
      </div>
    </section>
  )
}