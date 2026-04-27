import { Successcheck } from "@/assets/icons/svg";

const SafetyMeasures = () => {

  const safetyFeatures = [
  {
    title: "Verified Providers",
    description:
      "Every provider undergoes a thorough screening process before joining Gigsta, ensuring only qualified and trustworthy professionals are on our platform.",
    checks: [
      "National criminal background check",
      "Government-issued ID verification",
      "Sex offender registry check",
      "Skills and certification verification",
      "Previous employer references",
    ],
  },
 {
  title: "Ratings & Reviews",
  description:
    "Every completed job is open for honest feedback. Our review system keeps providers accountable and helps you make informed decisions before booking.",
  checks: [
    "Post-service rating required from clients",
    "Verified reviews from real bookings only",
    "Providers with low ratings are flagged",
    "Clients can report unprofessional conduct",
    "Review history visible on every provider profile",
  ],
},
{
  title: "Secure Payments",
  description:
    "Your money is protected at every step. We ensure payments are only processed through trusted channels with full transaction transparency.",
  checks: [
    "No cash payments to providers directly",
    "Payment only after service confirmation",
    "Receipts issued for every transaction",
    "Refund process for disputed services",
    "No hidden charges or surprise fees",
  ],
},
  {
    title: "Customer Support",
    description:
      "Our dedicated support team is always available to help resolve issues, answer questions, and ensure every experience on Gigsta meets your expectations.",
    checks: [
      "24/7 support availability",
      "Fast response to complaints and disputes",
      "Dedicated resolution team",
      "Clear escalation process for serious issues",
      "Follow-up to confirm issue resolution",
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
