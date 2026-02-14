import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
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
import { SERVICES } from "@/constants/services";
import { submitToGoogleSheet } from "@/lib/googleSheets";
import { saveUserDetails, loadUserDetails } from "@/lib/localStorage";

const ServiceRequestForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedService, setSelectedService] = useState<string>("");
  const [selectedPricingGroup, setSelectedPricingGroup] = useState<string>("");

  // Get prefilled values from URL params
  const prefilledService = searchParams.get("service") || "";
  const prefilledPricingGroup = searchParams.get("pricingGroup") || "";
  const prefilledPackage = searchParams.get("package") || "";

  // Load saved user details from localStorage
  const savedUserDetails = loadUserDetails();

  // Compute initial package value with amount if all required params are present
  const getInitialPackageValue = () => {
    if (prefilledPackage && prefilledPricingGroup && prefilledService) {
      const selectedServiceData = SERVICES.find((s) => s.id === prefilledService);
      const selectedGroupData = selectedServiceData?.pricingGroups.find(
        (group) => group.title === prefilledPricingGroup
      );
      const selectedPrice = selectedGroupData?.prices.find(
        (price) => price.label === prefilledPackage
      );
      if (selectedPrice) {
        return `${prefilledPackage} - ${selectedPrice.amount}`;
      }
    }
    return "";
  };

  const form = useForm<ServiceRequestFormValues>({
    resolver: zodResolver(serviceRequestSchema),
    defaultValues: {
      fullName: savedUserDetails?.fullName || "",
      whatsappNumber: savedUserDetails?.whatsappNumber || "",
      emailAddress: savedUserDetails?.emailAddress || "",
      selectService: prefilledService,
      selectPricingGroup: prefilledPricingGroup,
      selectPackage: getInitialPackageValue(),
      serviceAddress: savedUserDetails?.serviceAddress || "",
      preferredDateTime: "",
      additionalDetails: "",
    },
    mode: "onTouched",
  });

  // Initialize state and form values from URL params and localStorage
  useEffect(() => {
    // Pre-fill from localStorage if available
    if (savedUserDetails) {
      form.setValue("fullName", savedUserDetails.fullName);
      form.setValue("whatsappNumber", savedUserDetails.whatsappNumber);
      form.setValue("emailAddress", savedUserDetails.emailAddress);
      form.setValue("serviceAddress", savedUserDetails.serviceAddress);
    }

    // Pre-fill from URL params
    if (prefilledService) {
      setSelectedService(prefilledService);
      form.setValue("selectService", prefilledService);
    }
    if (prefilledPricingGroup) {
      setSelectedPricingGroup(prefilledPricingGroup);
      form.setValue("selectPricingGroup", prefilledPricingGroup);
    }
    if (prefilledPackage && prefilledPricingGroup) {
      // Find the price amount for the prefilled package
      const selectedServiceForPrefill = SERVICES.find(
        (s) => s.id === prefilledService
      );
      const selectedGroupForPrefill = selectedServiceForPrefill?.pricingGroups.find(
        (group) => group.title === prefilledPricingGroup
      );
      const selectedPrice = selectedGroupForPrefill?.prices.find(
        (price) => price.label === prefilledPackage
      );
      
      if (selectedPrice) {
        const packageValue = `${prefilledPackage} - ${selectedPrice.amount}`;
        form.setValue("selectPackage", packageValue);
      }
    }
  }, [prefilledService, prefilledPricingGroup, prefilledPackage, form, savedUserDetails]);

  const currentService = selectedService || prefilledService;
  const currentPricingGroup = selectedPricingGroup || prefilledPricingGroup;

  const selectedServiceData = SERVICES.find(
    (s) => s.id === currentService
  );

  const selectedGroupData = selectedServiceData?.pricingGroups.find(
    (group) => group.title === currentPricingGroup
  );

  const onSubmit = async (values: ServiceRequestFormValues) => {
    try {
      // Format the preferred date and time for better readability in Google Sheets
      const formatDateTime = (dateTimeString: string): string => {
        if (!dateTimeString) return '';
        try {
          const date = new Date(dateTimeString);
          // Format as: "February 9, 2025 at 2:30 PM" or similar readable format
          return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
          });
        } catch (error) {
          // If parsing fails, return the original string
          return dateTimeString;
        }
      };

      // Prepare data for Google Sheets
      const sheetData = {
        'Full Name': values.fullName,
        'WhatsApp Number': values.whatsappNumber,
        'Email Address': values.emailAddress,
        'Service': values.selectService === 'cleaning' ? 'House Cleaning' : 'Home Cooking',
        'Pricing Group': values.selectPricingGroup,
        'Package': values.selectPackage,
        'Service Address': values.serviceAddress,
        'Preferred Date & Time': formatDateTime(values.preferredDateTime) || values.preferredDateTime || '',
        'Additional Details': values.additionalDetails || '',
      };

      // Submit to Google Sheets
      await submitToGoogleSheet({
        sheetName: 'Service Requests',
        data: sheetData,
      });

      // Save user details to localStorage for future pre-filling
      saveUserDetails({
        fullName: values.fullName,
        whatsappNumber: values.whatsappNumber,
        emailAddress: values.emailAddress,
        serviceAddress: values.serviceAddress,
      });

      // Reset form (but keep the saved details for next time)
      form.reset({
        fullName: values.fullName,
        whatsappNumber: values.whatsappNumber,
        emailAddress: values.emailAddress,
        serviceAddress: values.serviceAddress,
        selectService: "",
        selectPricingGroup: "",
        selectPackage: "",
        preferredDateTime: "",
        additionalDetails: "",
      });

      // Navigate to success page
      navigate("/request/success", {
        replace: true,
        state: {
          fullName: values.fullName,
          service: values.selectService,
          pricingGroup: values.selectPricingGroup,
          package: values.selectPackage,
        },
      });
    } catch (error) {
      console.error('Error submitting service request:', error);
      // You can add error handling UI here, e.g., toast notification
      alert('Failed to submit service request. Please try again or contact support.');
    }
  };
  

  return (
   
<section className="py-16 min-h-screen bg-gray-50  w-full flex items-center">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-4xl sm:text-5xl md:text-[50px] font-bold text-[#0D0F11] leading-[1.2]">
            Service <span className="text-[#F0A500]">Request Form</span>          </h2>

          <p className="mt-4.5 text-[#0D0F11] mx-auto font-medium max-w-2xl text-lg md:text-xl leading-relaxed">
            Tell us what you need and we’ll connect you with the perfect service provider.
          </p>
        </div>


        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
             className="space-y-8"
          >
   
            <div className="space-y-6">
              <h3 className="text-base font-semibold text-gray-900">
                Personal Information
              </h3>

        
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

          
            <div className="space-y-6">
              <h3 className="text-base font-semibold text-gray-900">
                Service Details
              </h3>

              <FormField
                control={form.control}
                name="selectService"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-sm font-normal text-gray-900">
                      Select Service <span className="text-red-500">*</span>
                    </FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        setSelectedService(value);
                        // Reset pricing group and package when service changes
                        setSelectedPricingGroup("");
                        form.setValue("selectPricingGroup", "");
                        form.setValue("selectPackage", "");
                      }}
                      value={field.value ?? ""}
                    >
                      <FormControl>
                        <SelectTrigger className="h-11 border-gray-300 text-sm">
                          <SelectValue placeholder="Choose a service" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="cleaning">
                          House Cleaning
                        </SelectItem>
                        <SelectItem value="cooking">
                          Home Cooking
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {currentService && (
                <FormField
                  control={form.control}
                  name="selectPricingGroup"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-sm font-normal text-gray-900">
                        Select Pricing Option <span className="text-red-500">*</span>
                      </FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          setSelectedPricingGroup(value);
                          // Reset package when pricing group changes
                          form.setValue("selectPackage", "");
                        }}
                        value={field.value ?? ""}
                      >
                        <FormControl>
                          <SelectTrigger className="h-11 border-gray-300 text-sm">
                            <SelectValue placeholder="Choose One-Time or Monthly/Weekly" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {selectedServiceData?.pricingGroups.map((group, groupIndex) => (
                            <SelectItem
                              key={groupIndex}
                              value={group.title}
                            >
                              {group.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {currentService && currentPricingGroup && (
                <FormField
                  control={form.control}
                  name="selectPackage"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-sm font-normal text-gray-900">
                        Select Package <span className="text-red-500">*</span>
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value ?? ""}
                      >
                        <FormControl>
                          <SelectTrigger className="h-11 border-gray-300 text-sm">
                            <SelectValue placeholder="Choose a package" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {selectedGroupData?.prices.map((price, priceIndex) => (
                            <SelectItem
                              key={priceIndex}
                              value={`${price.label} - ${price.amount}`}
                            >
                              {price.label} - {price.amount}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

          
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
                        className="min-h-25 border-gray-300 placeholder:text-gray-400 text-sm resize-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

         
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

     
        <p className="text-center mt-6 text-sm text-gray-900">
         By submitting, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </section>
  );
};

export default ServiceRequestForm;