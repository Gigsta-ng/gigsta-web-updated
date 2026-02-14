import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { providerSchema, type ProviderFormValues } from "./schemas/providerSchema";
import { submitToGoogleSheet } from "@/lib/googleSheets";
import { toast } from "sonner";

const ProviderForm = () => {
const navigate = useNavigate();


const form = useForm<ProviderFormValues>({
  resolver: zodResolver(providerSchema),
  defaultValues: {
     fullName: "",
    whatsappNumber: "",
    emailAddress: "",
    gender: "",                 
    dateOfBirth: "",
    location: "",
    primaryService: "",         
    yearsOfExperience: "",      
    operateLocation: "",
    availability: "",           
    availabilityTime: "",       
    howDoYouCharge: "",         
    averageCharge: "",
    additionalDetails: "",
    terms: false,        
  },
  mode: "onTouched",
});
  const onSubmit = async (values: ProviderFormValues) => {
    try {
      // Prepare data for Google Sheets
      const sheetData = {
        'Full Name': values.fullName,
        'WhatsApp Number': values.whatsappNumber,
        'Email Address': values.emailAddress,
        'Gender': values.gender,
        'Date of Birth': values.dateOfBirth,
        'Location': values.location,
        'Primary Service': values.primaryService,
        'Years of Experience': values.yearsOfExperience,
        'Operate Location': values.operateLocation,
        'Availability': values.availability,
        'Availability Time': values.availabilityTime,
        'How Do You Charge': values.howDoYouCharge,
        'Average Charge': values.averageCharge,
        'Additional Details': values.additionalDetails,
      };

      // Submit to Google Sheets
      await submitToGoogleSheet({
        sheetName: 'Provider Applications',
        data: sheetData,
      });

      form.reset();

      navigate("/provider/success", {
        replace: true,
        state: {
          fullName: values.fullName,
          primaryService: values.primaryService,
        },
      });
    } catch (error) {
      console.error('Error submitting provider application:', error);
      toast.error('Failed to submit application', {
        description: 'Please try again or contact support.',
      });
    }
  };

  return (
    <section className="py-16 min-h-screen bg-gray-50  w-full flex items-center">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-4xl sm:text-5xl md:text-[50px] font-bold text-[#0D0F11] leading-[1.2]">
            Provider <span className="text-[#F0A500]">Application Form</span>
          </h2>

          <p className="mt-4.5 text-[#0D0F11] mx-auto font-medium max-w-2xl text-lg md:text-xl leading-relaxed">
            Tell us what you need and we’ll match you with a verified professional.
          </p>
        </div>

        

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            
            <div className="space-y-6">
              <h2 className="text-base font-semibold text-gray-900 border-b border-gray-200 pb-3">
                Personal Information
              </h2>

           
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-sm font-normal text-gray-900">
                      Full Name <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="John Doe"
                        className="h-11 border-gray-300 placeholder:text-gray-400 text-sm"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

            
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="whatsappNumber"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-sm font-normal text-gray-900">
                        Whatsapp Number <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="tel"
                          placeholder="08012345678"
                          className="h-11 border-gray-300 placeholder:text-gray-400 text-sm"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="emailAddress"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-sm font-normal text-gray-900">
                        Email Address <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="name@email.com"
                          className="h-11 border-gray-300 placeholder:text-gray-400 text-sm"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-sm font-normal text-gray-900">
                        Gender <span className="text-red-500">*</span>
                      </FormLabel>
                      <Select onValueChange={field.onChange} value={field.value  ?? ""}>
                        <FormControl>
                          <SelectTrigger className="h-11 border-gray-300 text-sm">
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="other">Rather not specify</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-sm font-normal text-gray-900">
                        Date of Birth (Must be 18 & above){" "}
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="date"
                          className="h-11 border-gray-300 placeholder:text-gray-400 text-sm"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-sm font-normal text-gray-900">
                      Location in Uyo <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter your area/neighborhood"
                        className="h-11 border-gray-300 placeholder:text-gray-400 text-sm"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

         
            <div className="space-y-6">
              <h2 className="text-base font-semibold text-gray-900 border-b border-gray-200 pb-3">
                Service Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="primaryService"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-sm font-normal text-gray-900">
                        Primary Service <span className="text-red-500">*</span>
                      </FormLabel>
                      <Select onValueChange={field.onChange} value={field.value  ?? ""}>
                        <FormControl>
                          <SelectTrigger className="h-11 border-gray-300 text-sm">
                            <SelectValue placeholder="Choose your primary service" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="house-cleaning">House Cleaning</SelectItem>
                          <SelectItem value="personal-chef">Personal Chef</SelectItem>
                          <SelectItem value="laundry-ironing">Laundry & Ironing</SelectItem>
                          <SelectItem value="plumbing">Plumbing</SelectItem>
                          <SelectItem value="gardening">Gardening</SelectItem>
                          <SelectItem value="others">Others (Specify)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="yearsOfExperience"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-sm font-normal text-gray-900">
                        Years of Experience <span className="text-red-500">*</span>
                      </FormLabel>
                      <Select onValueChange={field.onChange} value={field.value  ?? ""}>
                        <FormControl>
                          <SelectTrigger className="h-11 border-gray-300 text-sm">
                            <SelectValue placeholder="Select experience level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="less-than-1">Less than 1 year</SelectItem>
                          <SelectItem value="1-3">1 - 3 years</SelectItem>
                          <SelectItem value="3-5">3 - 5 years</SelectItem>
                          <SelectItem value="5+">5+ years</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="operateLocation"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-sm font-normal text-gray-900">
                      Where do you operate <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="e.g. Shelter Afrique"
                        className="h-11 border-gray-300 placeholder:text-gray-400 text-sm"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

         
            <div className="space-y-6">
              <h2 className="text-base font-semibold text-gray-900 border-b border-gray-200 pb-3">
                Availability & Pricing
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="availability"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-sm font-normal text-gray-900">
                        Availability <span className="text-red-500">*</span>
                      </FormLabel>
                      <Select onValueChange={field.onChange} value={field.value  ?? ""}>
                        <FormControl>
                          <SelectTrigger className="h-11 border-gray-300 text-sm">
                            <SelectValue placeholder="When can you work" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="weekdays">Weekdays</SelectItem>
                          <SelectItem value="weekends">Weekends</SelectItem>
                          <SelectItem value="both">Both</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="availabilityTime"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-sm font-normal text-gray-900">
                        Availability Time <span className="text-red-500">*</span>
                      </FormLabel>
                      <Select onValueChange={field.onChange} value={field.value  ?? ""}>
                        <FormControl>
                          <SelectTrigger className="h-11 border-gray-300 text-sm">
                            <SelectValue placeholder="Select Availabilty" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        
                          <SelectItem value="morning">Morning</SelectItem>
                          <SelectItem value="afternoon">Afternoon</SelectItem>
                          <SelectItem value="evening">Evening</SelectItem>
                          <SelectItem value="anytime">Anytime</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="howDoYouCharge"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-sm font-normal text-gray-900">
                        How Do You Charge? <span className="text-red-500">*</span>
                      </FormLabel>
                      <Select onValueChange={field.onChange} value={field.value  ?? ""}>
                        <FormControl>
                          <SelectTrigger className="h-11 border-gray-300 text-sm">
                            <SelectValue placeholder="Select charging method" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="hourly">Hourly</SelectItem>
                          <SelectItem value="per-job">Per Job</SelectItem>
                          <SelectItem value="both">Both</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="averageCharge"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-sm font-normal text-gray-900">
                        Average Charge (Rough Estimate){" "}
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="e.g ₦2,000 per hour"
                          className="h-11 border-gray-300 placeholder:text-gray-400 text-sm"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="additionalDetails"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-sm font-normal text-gray-900">
                      Additional Details <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Describe your experience, skills and why you'd be a great fit for Gigsta..."
                        className="min-h-25 border-gray-300 placeholder:text-gray-400 text-sm resize-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="terms"
              render={({ field }) => (
                <FormItem className="flex items-start space-x-3 pt-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(v) => field.onChange(Boolean(v))}
                      className="mt-0.5"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-tight">
                    <FormLabel className="text-sm font-normal text-gray-900 cursor-pointer">
                      I agree to Gigsta's Terms of Service and Provider Agreement
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <Button
              type="submit"
                onClick={() => console.log("Errors:", form.formState.errors)}
              disabled={form.formState.isSubmitting}
              className="w-full bg-[#F0A500] hover:bg-[#d89400] text-white font-semibold cursor-pointer"
            >
              {form.formState.isSubmitting ? "Submitting..." : "Submit Application →"}
            </Button>
          </form>
        </Form>

        <p className="text-center mt-6 text-[#0D0F11]">
          Applications are usually reviewed within 24 hours
        </p>
      </div>
    </section>
  );
};

export default ProviderForm;
