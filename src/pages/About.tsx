import { AnimatedSection, AnimatedChild } from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import { MoveRight, Users, Shield, Heart, Target } from "lucide-react";
import SEO from "@/components/SEO";

const About = () => {
  const values = [
    {
      icon: Shield,
      title: "Trust & Safety",
      description: "Every provider is verified, insured, and committed to delivering exceptional quality.",
    },
    {
      icon: Heart,
      title: "Customer First",
      description: "Your satisfaction is our priority. We're here to make your life easier.",
    },
    {
      icon: Target,
      title: "Quality Service",
      description: "We connect you with skilled professionals who take pride in their work.",
    },
    {
      icon: Users,
      title: "Community Focus",
      description: "Supporting local service providers and building stronger communities in Uyo.",
    },
  ];

  return (
    <>
      <SEO 
        title="About Gigsta - Trusted Home Services in Uyo, Nigeria"
        description="Learn about Gigsta, Nigeria's first on-demand home services platform. We connect busy professionals with verified, reliable service providers for house cleaning, laundry, and more in Uyo."
        url="https://gigsta.vercel.app/about"
        keywords="about gigsta, home services Uyo, trusted service providers Nigeria, gigsta mission"
      />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <AnimatedSection animationType="slideDown" delay={100}>
          <section className="bg-gradient-to-br from-[#F0A500] to-[#e09500] py-20 md:py-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#0D0F11] mb-6 leading-tight">
                  About Gigsta
                </h1>
                <p className="text-lg md:text-xl text-[#0D0F11]/90 leading-relaxed">
                  Building Nigeria's first on-demand home services platform, connecting busy professionals with trusted, verified service providers.
                </p>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Mission Section */}
        <section className="py-20 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <AnimatedSection animationType="slideRight" delay={200}>
                <div>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0D0F11] mb-6">
                    Our Mission
                  </h2>
                  <p className="text-lg text-[#0D0F11]/80 leading-relaxed mb-4">
                    At Gigsta, we believe that everyone deserves access to reliable, professional home services. Our mission is to make it easy for busy professionals in Uyo to find trusted service providers for their home needs.
                  </p>
                  <p className="text-lg text-[#0D0F11]/80 leading-relaxed mb-4">
                    We're building a platform that connects clients with verified, insured professionals who are committed to delivering exceptional quality. Whether you need house cleaning, laundry, or other home services, Gigsta is here to help.
                  </p>
                  <p className="text-lg text-[#0D0F11]/80 leading-relaxed">
                    For service providers, we offer a platform to grow your business, get real job requests, and earn more while maintaining flexibility and independence.
                  </p>
                </div>
              </AnimatedSection>

              <AnimatedSection animationType="slideLeft" delay={300}>
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h3 className="text-2xl font-bold text-[#0D0F11] mb-6">
                    Our Vision
                  </h3>
                  <p className="text-lg text-[#0D0F11]/80 leading-relaxed mb-4">
                    To become Nigeria's leading on-demand home services platform, starting in Uyo and expanding across the country.
                  </p>
                  <p className="text-lg text-[#0D0F11]/80 leading-relaxed">
                    We envision a future where finding reliable home service providers is as simple as a few clicks, and where service providers can build thriving businesses through our platform.
                  </p>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection animationType="slideDown" delay={100}>
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0D0F11] mb-4">
                  Our Values
                </h2>
                <p className="text-lg text-[#0D0F11]/80 max-w-2xl mx-auto">
                  The principles that guide everything we do at Gigsta
                </p>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <AnimatedChild key={value.title} animationType="fadeIn" index={index} delay={200}>
                  <div className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow duration-300">
                    <div className="w-16 h-16 bg-[#F0A500] rounded-full flex items-center justify-center mx-auto mb-4">
                      <value.icon className="w-8 h-8 text-[#0D0F11]" />
                    </div>
                    <h3 className="text-xl font-bold text-[#0D0F11] mb-3">
                      {value.title}
                    </h3>
                    <p className="text-[#0D0F11]/80 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </AnimatedChild>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-24 bg-[#F0A500]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <AnimatedSection animationType="slideUp" delay={200}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0D0F11] mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-lg md:text-xl text-[#0D0F11]/90 mb-8 leading-relaxed">
                Join thousands of satisfied customers and service providers who trust Gigsta.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-[#0D0F11] hover:bg-[#0D0F11]/90 text-white font-semibold text-base py-6 px-8 rounded-lg">
                  <NavLink to="/services" className="flex items-center gap-2">
                    Request a Service <MoveRight className="h-4 w-4" />
                  </NavLink>
                </Button>
                <Button className="bg-white hover:bg-gray-100 text-[#0D0F11] font-semibold text-base py-6 px-8 rounded-lg">
                  <NavLink to="/provider" className="flex items-center gap-2">
                    Become a Provider <MoveRight className="h-4 w-4" />
                  </NavLink>
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
