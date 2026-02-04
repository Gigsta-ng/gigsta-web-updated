import { SubmitIcon } from "@/assets/icons/svg";

import { Successcheck } from "@/assets/icons/svg";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

type SuccessState = Record<string, unknown>;

const ApplicationSuccess = () => {

   const navigate = useNavigate();
  const { state } = useLocation() as { state: SuccessState | null };

  // This prevents people from landing here directly without submitting
  useEffect(() => {
    // This removes direct access to the pageeeeeeee.
    if (!state) navigate("/provider", { replace: true });
  }, [state, navigate]);


  const nextSteps = [
    "We'll review your application and check your references",
    "You'll recieve an email with next steps for background verification",
    "Once approved, we'll help you set up your provider profile",
    "Start accepting jobs and building your business"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
 

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
      
          <div className="flex justify-center mb-6">
            <div className="relative">
         
              <div className="absolute inset-0 animate-spin-slow">
                <svg className="w-24 h-24" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2"
                    strokeDasharray="4 8"
                    opacity="0.3"
                  />
                </svg>
              </div>
              
        
                <div className=" w-20 h-20 rounded-xl flex items-center justify-center ">
                  <SubmitIcon />
                </div>
              
            </div>
          </div>

     
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Application Submitted
          </h1>

          <p className="text-[#535353] text-base max-w-md mx-auto leading-relaxed">
            Thank you for applying to become a Gigsta provider. We've received your application and will review it within 24 hours
          </p>

          <div className="mt-12  bg-[#ffc300]/8 border border-yellow-400  rounded-lg p-8 text-left">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              What's Next?
            </h2>

         
            <div className="space-y-4">
              {nextSteps.map((step, index) => (
                <div key={index} className="flex items-start gap-3">
              
                  <div className="shrink-0 w-6 h-6  rounded-full flex items-center justify-center mt-0.5">
                    <Successcheck className="w-12 h-12" />
                  </div>
             
                  <p className="text-gray-700 text-base leading-relaxed">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>

    
         <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              className="bg-[#F0A500] hover:bg-[#d89400] text-white font-semibold"
              onClick={() => navigate("/", { replace: true })}
            >
              Back to Home
            </Button>

            <Button
              variant="outline"
              className="font-semibold"
              onClick={() => navigate("/provider", { replace: true })}
            >
              Submit another application
            </Button>
          </div>

          <p className="mt-8 text-sm text-gray-500">
            Need help? Contact us at{" "}
            <a
              href="mailto:support@gigsta.com"
              className="text-[#F0A500] hover:underline font-medium"
            >
              support@gigsta.com
            </a>
          </p>
        </div>
      </main>
    </div>
  );
};

export default ApplicationSuccess;