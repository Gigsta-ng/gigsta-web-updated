import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { MapPin } from "lucide-react";

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

import {
  serviceRequestSchema,
  type ServiceRequestFormValues,
} from "./schemas/serviceRequestSchema";

const ServiceRequestForm = () => {
  const navigate = useNavigate();

  const form = useForm<ServiceRequestFormValues>({
    resolver: zodResolver(serviceRequestSchema),
    defaultValues: {
      fullName: "",
      whatsappNumber: "",
      emailAddress: "",
      selectService: "",
      serviceAddress: "",
      preferredDateTime: "",
      additionalDetails: "",
    },
    mode: "onTouched",
  });

  const onSubmit = async (values: ServiceRequestFormValues) => {
    console.log("Service request:", values);

    // TODO: Send to API
    // await fetch('/api/service-requests', {
    //   method: 'POST',
    //   body: JSON.stringify(values),
    // });

    form.reset();

    navigate("/request/success", {
      replace: true,
      state: {
        fullName: values.fullName,
        service: values.selectService,
      },
    });
  };





  

  return (
    // <section className="py-16 min-h-screen bg-gray-50 w-full flex items-center">
    //   <div className="max-w-2xl mx-auto w-full px-4 sm:px-6 lg:px-8">
    //     {/* Header */}
    //     <div className="text-center mb-12">
    //       <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0D0F11] leading-tight">
    //         Service <span className="text-[#F0A500]">Request Form</span>
    //       </h2>

    //       <p className="mt-4 text-[#0D0F11] mx-auto font-normal max-w-xl text-base leading-relaxed">
    //         Tell us what you need, and we'll connect you with the perfect service
    //         provider.
    //       </p>
    //     </div>
<section className="py-16 min-h-screen bg-gray-50  w-full flex items-center">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-4xl sm:text-5xl md:text-[50px] font-bold text-[#0D0F11] leading-[1.2]">
            Service <span className="text-[#F0A500]">Request Form</span>          </h2>

          <p className="mt-4.5 text-[#0D0F11] mx-auto font-medium max-w-2xl text-lg md:text-xl leading-relaxed">
            Tell us what you need and we’ll connect you with the perfect service provider.
          </p>
        </div>

        {/* Form */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
             className="space-y-8"
          >
            {/* Personal Information Section */}
            <div className="space-y-6">
              <h3 className="text-base font-semibold text-gray-900">
                Personal Information
              </h3>

              {/* Full Name */}
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

              {/* Whatsapp Number & Email Address Row */}
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
                          placeholder="(000) 000-000"
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
                          placeholder="example@email.com"
                          className="h-11 border-gray-300 placeholder:text-gray-400 text-sm"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Service Details Section */}
            <div className="space-y-6">
              <h3 className="text-base font-semibold text-gray-900">
                Service Details
              </h3>

              {/* Select Service */}
              <FormField
                control={form.control}
                name="selectService"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-sm font-normal text-gray-900">
                      Select Service <span className="text-red-500">*</span>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value ?? ""}
                    >
                      <FormControl>
                        <SelectTrigger className="h-11 border-gray-300 text-sm">
                          <SelectValue placeholder="Choose a service" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="house-cleaning">
                          House Cleaning
                        </SelectItem>
                        <SelectItem value="personal-chef">
                          Personal Chef
                        </SelectItem>
                        <SelectItem value="laundry-ironing">
                          Laundry & Ironing
                        </SelectItem>
                        <SelectItem value="plumbing">Plumbing</SelectItem>
                        <SelectItem value="electrical">
                          Electrical Work
                        </SelectItem>
                        <SelectItem value="gardening">Gardening</SelectItem>
                        <SelectItem value="painting">Painting</SelectItem>
                        <SelectItem value="carpentry">Carpentry</SelectItem>
                        <SelectItem value="others">Others</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Service Address */}
              <FormField
                control={form.control}
                name="serviceAddress"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-sm font-normal text-gray-900">
                      Service Address <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          {...field}
                          placeholder="123 Main St, City, Uyo"
                          className="h-11 border-gray-300 placeholder:text-gray-400 text-sm pl-10"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Preferred Date & Time */}
              <FormField
                control={form.control}
                name="preferredDateTime"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-sm font-normal text-gray-900">
                      Preferred Date & Time <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="datetime-local"
                        className="h-11 border-gray-300 text-sm"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Additional Details (Optional) */}
              <FormField
                control={form.control}
                name="additionalDetails"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-sm font-normal text-gray-900">
                      Additional Details (Optional)
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Tell us more about your specific needs, preferences or special instructions..."
                        className="min-h-[100px] border-gray-300 placeholder:text-gray-400 text-sm resize-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="w-full h-12 bg-[#F0A500] hover:bg-[#d89400] text-white font-semibold text-base cursor-pointer transition-colors"
            >
              {form.formState.isSubmitting
                ? "Submitting..."
                : "Submit Request"}
            </Button>
          </form>
        </Form>

        {/* Footer Note */}
        <p className="text-center mt-6 text-sm text-gray-900">
         By submitting, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </section>
  );
};

export default ServiceRequestForm;