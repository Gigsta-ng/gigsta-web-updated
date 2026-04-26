import { Successcheck } from "@/assets/icons/svg";

const SafetyMeasures = () => {
  const safetyFeatures = [
    {
      title: "Rigorous Vetting Process",
      description:
        "Every provider undergoes a thorough screening process before joining Gigsta, ensuring only qualified and trustworthy professionals are on our platform.",
      checks: [
        "National criminal background check",
        "Sex offender registry check",
        "Identity verification",
        "Previous employer references",
        "Skills and certification verification",
      ],
    },
    {
      title: "Secure Messaging",
      description:
        "Clients and providers communicate through WhatsApp and email, keeping all conversations documented and accessible for reference or dispute resolution.",
      checks: [
        "Direct WhatsApp communication",
        "Email correspondence supported",
        "No personal phone numbers shared",
        "Message history saved for disputes",
        "24/7 message monitoring for safety",
      ],
    },
    {
      title: "Reference Checks",
      description:
        "We go beyond paperwork by directly contacting previous employers and clients to verify a provider's track record and professionalism.",
      checks: [
        "Previous employer contact verification",
        "Past client feedback review",
        "Work history confirmation",
        "Professional conduct assessment",
        "Skill competency validation",
      ],
    },
    {
      title: "Ongoing Monitoring",
      description:
        "Our commitment to safety doesn't stop at onboarding, we continuously monitor provider activity and ratings to maintain platform standards.",
      checks: [
        "Regular performance reviews",
        "Customer rating tracking",
        "Complaint and dispute monitoring",
        "Periodic re-verification checks",
        "Immediate suspension for violations",
      ],
    },
  ];

  return (
    <section className="min-h-screen w-full bg-gray-50 flex items-center py-20 md:py-20">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-4xl sm:text-5xl md:text-[50px] font-bold leading-[1.2] text-[#0D0F11]">
            <span className="text-[#F0A500]">Gigsta</span> Safety Measures
          </h2>

          <p className="mt-4.5 mx-auto font-medium max-w-3xl text-lg md:text-xl leading-relaxed text-[#0D0F11]">
            We've implemented comprehensive safeguards to protect our clients
            throughout their Gigsta experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {safetyFeatures.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <h3 className="text-xl font-bold text-[#0D0F11] mb-4">
                {feature.title}
              </h3>

              <p className="text-[#0D0F11] text-sm leading-relaxed mb-6">
                {feature.description}
              </p>

              <div className="space-y-3">
                {feature.checks.map((check, checkIndex) => (
                  <div key={checkIndex} className="flex items-start gap-3">
                    <Successcheck className="w-5 h-5 text-[#F0A500] shrink-0 mt-0.5" />
                    <p className="text-[#0D0F11] text-sm leading-relaxed">
                      {check}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SafetyMeasures;
