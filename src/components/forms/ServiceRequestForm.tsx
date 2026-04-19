import { useState, useEffect, useCallback } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
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
import { MapPin, X } from "lucide-react";

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
import { toast } from "sonner";
import {
  isCombinedBookingConfiguration,
  type BookingNavigateConfiguration,
  type CleaningAddonId,
  type CleaningServiceConfiguration,
  type LaundryServiceConfiguration,
  type RequestServiceNavigateState,
} from "@/types/serviceConfiguration";
import { applyBookingRemoval } from "@/lib/bookingConfigurationMutations";
import {
  clearLaundrySelectionsInDraft,
  clearServicesDraft,
  syncServicesDraftWithBookingConfiguration,
} from "@/lib/servicesDraftStorage";
import {
  formatBookingSheetDetails,
  formatCombinedBookingSummary,
  formatConfigurationSummary,
} from "@/lib/formatServiceConfiguration";
import { formatNgn } from "@/lib/laundryPricing";
import {
  CLEANING_ADDONS,
  CLEANING_SPACE_OPTIONS,
  CLEANING_TIERS,
} from "@/constants/cleaningConfigurator";
import { LAUNDRY_CATALOG } from "@/constants/laundryCatalog";

const INTERACTIVE_PRICING_GROUP = "Interactive configuration";

type BookingRemovalAction =
  | { type: "removeCleaningAddon"; addonId: CleaningAddonId }
  | { type: "removeLaundryItem"; itemId: string }
  | { type: "removeEntireCleaning" }
  | { type: "removeEntireLaundry" };

function serviceTitle(configuration: BookingNavigateConfiguration): string {
  if (isCombinedBookingConfiguration(configuration)) {
    return "House cleaning + laundry";
  }
  return configuration.service === "cleaning" ? "House cleaning" : "Laundry";
}

function BookingSummaryCard({
  configuration,
  onEditServices,
  onRemove,
}: {
  configuration: BookingNavigateConfiguration;
  onEditServices: () => void;
  onRemove: (action: BookingRemovalAction) => void;
}) {
  const renderCleaningBlock = (
    c: CleaningServiceConfiguration,
    opts: {
      showRemoveService?: boolean;
    } = {}
  ) => {
    const tierName =
      CLEANING_TIERS.find((t) => t.id === c.tier)?.name ?? c.tier;
    const space =
      CLEANING_SPACE_OPTIONS.find((s) => s.id === c.spaceSize)?.label ??
      c.spaceSize;

    return (
      <div className="rounded-xl border border-gray-200/80 bg-linear-to-br from-gray-50 to-white p-4 sm:p-5">
        <div className="flex items-start justify-between gap-2 mb-3">
          <p className="text-[11px] font-bold uppercase tracking-wider text-[#F0A500]">
            House cleaning
          </p>
          {opts.showRemoveService && (
            <button
              type="button"
              onClick={() => onRemove({ type: "removeEntireCleaning" })}
              className="text-[11px] font-semibold text-gray-500 hover:text-red-600 shrink-0"
            >
              Remove
            </button>
          )}
        </div>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex justify-between gap-4">
            <span className="text-gray-500">Space</span>
            <span className="font-medium text-[#0D0F11] text-right">{space}</span>
          </li>
          <li className="flex justify-between gap-4">
            <span className="text-gray-500">Tier</span>
            <span className="font-medium text-[#0D0F11] text-right">{tierName}</span>
          </li>
        </ul>
        {c.addonIds.length > 0 ? (
          <div className="mt-3 space-y-2">
            <p className="text-xs text-gray-500">Add-ons</p>
            <ul className="space-y-1.5">
              {c.addonIds.map((id) => {
                const label = CLEANING_ADDONS.find((a) => a.id === id)?.label ?? id;
                return (
                  <li
                    key={id}
                    className="flex items-center justify-between gap-2 rounded-lg bg-white/90 border border-gray-100 px-3 py-2 text-sm"
                  >
                    <span className="text-[#0D0F11] leading-snug">{label}</span>
                    <button
                      type="button"
                      onClick={() => onRemove({ type: "removeCleaningAddon", addonId: id })}
                      className="shrink-0 flex h-8 w-8 items-center justify-center rounded-md text-gray-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                      aria-label={`Remove ${label}`}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          <p className="mt-3 text-xs text-gray-500">Add-ons: none</p>
        )}
        <div className="mt-4 flex justify-between items-baseline border-t border-dashed border-gray-200 pt-3">
          <span className="text-sm text-gray-600">Subtotal</span>
          <span className="text-lg font-bold text-[#0D0F11] tabular-nums">
            {formatNgn(c.totalPrice)}
          </span>
        </div>
      </div>
    );
  };

  const renderLaundryBlock = (
    l: LaundryServiceConfiguration,
    opts: {
      showRemoveService?: boolean;
    } = {}
  ) => {
    const lines = LAUNDRY_CATALOG.filter((i) => (l.items[i.id] ?? 0) > 0).map(
      (i) => ({ id: i.id, name: i.name, qty: l.items[i.id] ?? 0 })
    );
    const tierLabel =
      l.tier.charAt(0).toUpperCase() + l.tier.slice(1);

    return (
      <div className="rounded-xl border border-gray-200/80 bg-linear-to-br from-gray-50 to-white p-4 sm:p-5">
        <div className="flex items-start justify-between gap-2 mb-3">
          <p className="text-[11px] font-bold uppercase tracking-wider text-[#F0A500]">
            Laundry
          </p>
          {opts.showRemoveService && (
            <button
              type="button"
              onClick={() => onRemove({ type: "removeEntireLaundry" })}
              className="text-[11px] font-semibold text-gray-500 hover:text-red-600 shrink-0"
            >
              Remove
            </button>
          )}
        </div>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex justify-between gap-4">
            <span className="text-gray-500">Service level</span>
            <span className="font-medium text-[#0D0F11] text-right">{tierLabel}</span>
          </li>
        </ul>
        {lines.length > 0 && (
          <div className="mt-3 max-h-48 overflow-y-auto rounded-lg bg-white/80 border border-gray-100 p-2 text-xs text-gray-600 space-y-1">
            {lines.map((row) => (
              <div
                key={row.id}
                className="flex items-center justify-between gap-2 rounded-md px-2 py-1.5 hover:bg-gray-50/80"
              >
                <span className="line-clamp-2 min-w-0 flex-1">{row.name}</span>
                <span className="shrink-0 font-medium text-[#0D0F11]">×{row.qty}</span>
                <button
                  type="button"
                  onClick={() =>
                    onRemove({ type: "removeLaundryItem", itemId: row.id })
                  }
                  className="shrink-0 flex h-8 w-8 items-center justify-center rounded-md text-gray-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                  aria-label={`Remove ${row.name} from cart`}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="mt-4 flex justify-between items-baseline border-t border-dashed border-gray-200 pt-3">
          <span className="text-sm text-gray-600">Subtotal</span>
          <span className="text-lg font-bold text-[#0D0F11] tabular-nums">
            {formatNgn(l.totalPrice)}
          </span>
        </div>
      </div>
    );
  };

  const combined =
    isCombinedBookingConfiguration(configuration)
      ? (configuration.cleaning?.totalPrice ?? 0) +
        (configuration.laundry?.totalPrice ?? 0)
      : null;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.06)] overflow-hidden">
      <div className="border-b border-amber-100 bg-linear-to-r from-amber-50/90 to-white px-5 py-4 sm:px-6 sm:py-5">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <div className="flex gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[#F0A500]">
                Booking summary
              </p>
              <h3 className="text-lg font-bold text-[#0D0F11] mt-0.5">
                {serviceTitle(configuration)}
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-6 space-y-5">
        {isCombinedBookingConfiguration(configuration) ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {configuration.cleaning &&
                renderCleaningBlock(configuration.cleaning, {
                  showRemoveService: true,
                })}
              {configuration.laundry &&
                renderLaundryBlock(configuration.laundry, {
                  showRemoveService: true,
                })}
            </div>
            {combined !== null && (
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 rounded-xl bg-[#0D0F11] text-white px-4 py-4 sm:px-5">
                <span className="text-sm font-medium text-gray-300">
                  Combined total (this request)
                </span>
                <span className="text-2xl font-bold tabular-nums tracking-tight">
                  {formatNgn(combined)}
                </span>
              </div>
            )}
          </>
        ) : configuration.service === "cleaning" ? (
          renderCleaningBlock(configuration)
        ) : (
          renderLaundryBlock(configuration)
        )}

        <button
          type="button"
          onClick={onEditServices}
          className="w-full sm:w-auto text-sm font-semibold text-[#F0A500] hover:text-[#d89400] underline-offset-4 hover:underline"
        >
          Edit configuration on Services
        </button>
      </div>
    </div>
  );
}

const ServiceRequestForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [selectedService, setSelectedService] = useState<string>("");
  const [selectedPricingGroup, setSelectedPricingGroup] = useState<string>("");
  const [sheetConfiguration, setSheetConfiguration] =
    useState<BookingNavigateConfiguration | null>(null);

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

  // Initialize state and form values from navigation state (configurator), URL params, and localStorage
  useEffect(() => {
    if (savedUserDetails) {
      form.setValue("fullName", savedUserDetails.fullName);
      form.setValue("whatsappNumber", savedUserDetails.whatsappNumber);
      form.setValue("emailAddress", savedUserDetails.emailAddress);
      form.setValue("serviceAddress", savedUserDetails.serviceAddress);
    }

    const fromConfigurator = (location.state as RequestServiceNavigateState | null)
      ?.configuration;
    if (fromConfigurator) {
      setSheetConfiguration(fromConfigurator);
      setSelectedPricingGroup(INTERACTIVE_PRICING_GROUP);
      form.setValue("selectPricingGroup", INTERACTIVE_PRICING_GROUP);
      if (isCombinedBookingConfiguration(fromConfigurator)) {
        setSelectedService("both");
        form.setValue("selectService", "both");
        form.setValue(
          "selectPackage",
          formatCombinedBookingSummary(fromConfigurator)
        );
      } else {
        setSelectedService(fromConfigurator.service);
        form.setValue("selectService", fromConfigurator.service);
        form.setValue(
          "selectPackage",
          formatConfigurationSummary(fromConfigurator)
        );
      }
      return;
    }

    if (prefilledService) {
      setSelectedService(prefilledService);
      form.setValue("selectService", prefilledService);
    }
    if (prefilledPricingGroup) {
      setSelectedPricingGroup(prefilledPricingGroup);
      form.setValue("selectPricingGroup", prefilledPricingGroup);
    }
    if (prefilledPackage && prefilledPricingGroup) {
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
  }, [
    prefilledService,
    prefilledPricingGroup,
    prefilledPackage,
    form,
    savedUserDetails,
    location.state,
  ]);

  const currentService = selectedService || prefilledService;
  const currentPricingGroup = selectedPricingGroup || prefilledPricingGroup;

  const selectedServiceData = SERVICES.find(
    (s) => s.id === currentService
  );

  const selectedGroupData = selectedServiceData?.pricingGroups.find(
    (group) => group.title === currentPricingGroup
  );

  const syncInteractiveFormFields = useCallback(
    (config: BookingNavigateConfiguration) => {
      if (isCombinedBookingConfiguration(config)) {
        setSelectedService("both");
        form.setValue("selectService", "both");
        form.setValue("selectPackage", formatCombinedBookingSummary(config));
      } else {
        setSelectedService(config.service);
        form.setValue("selectService", config.service);
        form.setValue("selectPackage", formatConfigurationSummary(config));
      }
    },
    [form]
  );

  const handleBookingRemoval = useCallback(
    (action: BookingRemovalAction) => {
      if (!sheetConfiguration) return;
      const next = applyBookingRemoval(sheetConfiguration, action);
      if (next === null) {
        clearLaundrySelectionsInDraft();
        toast.error("No laundry items left in this request.", {
          description: "Add items on the Services page to continue.",
        });
        navigate("/services");
        return;
      }
      syncServicesDraftWithBookingConfiguration(next);
      setSheetConfiguration(next);
    },
    [sheetConfiguration, navigate]
  );

  useEffect(() => {
    if (!sheetConfiguration) return;
    syncInteractiveFormFields(sheetConfiguration);
  }, [sheetConfiguration, syncInteractiveFormFields]);

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
        'Service':
          values.selectService === "both"
            ? "House Cleaning + Laundry"
            : values.selectService === "cleaning"
              ? "House Cleaning"
              : "Laundry",
        'Pricing Group': values.selectPricingGroup,
        'Package': values.selectPackage,
        'Configuration Details': sheetConfiguration
          ? formatBookingSheetDetails(sheetConfiguration)
          : '',
        'Service Address': values.serviceAddress,
        'Preferred Date & Time': formatDateTime(values.preferredDateTime) || values.preferredDateTime || '',
        'Additional Details': values.additionalDetails || '',
      };

      // Submit to Google Sheets
      await submitToGoogleSheet({
        sheetName: 'Service Requests',
        data: sheetData,
      });

      clearServicesDraft();

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
      setSheetConfiguration(null);

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
      toast.error('Failed to submit service request', {
        description: 'Please try again or contact support.',
      });
    }
  };
  

  return (
    <section className="py-12 sm:py-16 min-h-screen bg-gray-50 w-full">
      <div className="max-w-3xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-[44px] font-bold text-[#0D0F11] leading-[1.15]">
            Service <span className="text-[#F0A500]">Request</span>
          </h2>
          <p className="mt-4 text-[#0D0F11] mx-auto font-medium max-w-xl text-base sm:text-lg leading-relaxed text-pretty">
            {sheetConfiguration
              ? "Review your booking summary below, then add your contact details and schedule."
              : "Choose a package, then tell us how to reach you and when to deliver your service."}
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-10"
          >
            {sheetConfiguration ? (
              <>
                <BookingSummaryCard
                  configuration={sheetConfiguration}
                  onEditServices={() => navigate("/services")}
                  onRemove={handleBookingRemoval}
                />
                <FormField
                  control={form.control}
                  name="selectService"
                  render={({ field }) => (
                    <FormItem className="hidden">
                      <FormControl>
                        <input type="hidden" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="selectPricingGroup"
                  render={({ field }) => (
                    <FormItem className="hidden">
                      <FormControl>
                        <input type="hidden" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="selectPackage"
                  render={({ field }) => (
                    <FormItem className="hidden">
                      <FormControl>
                        <input type="hidden" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </>
            ) : (
              <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 shadow-sm space-y-5">
                <div>
                  <h3 className="text-lg font-semibold text-[#0D0F11]">
                    Choose your service
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Select a service category and package. Pricing from our
                    catalog.
                  </p>
                </div>
                <FormField
                  control={form.control}
                  name="selectService"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-sm font-normal text-gray-900">
                        Service <span className="text-red-500">*</span>
                      </FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          setSelectedService(value);
                          setSelectedPricingGroup("");
                          form.setValue("selectPricingGroup", "");
                          form.setValue("selectPackage", "");
                          setSheetConfiguration((prev) => {
                            if (!prev) return null;
                            if (isCombinedBookingConfiguration(prev)) {
                              return value === "both" ? prev : null;
                            }
                            return value === prev.service ? prev : null;
                          });
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
                          <SelectItem value="laundry">Laundry</SelectItem>
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
                          Pricing option <span className="text-red-500">*</span>
                        </FormLabel>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value);
                            setSelectedPricingGroup(value);
                            form.setValue("selectPackage", "");
                            if (value !== INTERACTIVE_PRICING_GROUP) {
                              setSheetConfiguration(null);
                            }
                          }}
                          value={field.value ?? ""}
                        >
                          <FormControl>
                            <SelectTrigger className="h-11 border-gray-300 text-sm">
                              <SelectValue placeholder="Choose One-Time or Monthly/Weekly" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {selectedServiceData?.pricingGroups.map(
                              (group, groupIndex) => (
                                <SelectItem
                                  key={groupIndex}
                                  value={group.title}
                                >
                                  {group.title}
                                </SelectItem>
                              )
                            )}
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
                          Package <span className="text-red-500">*</span>
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
              </div>
            )}

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-[#0D0F11]">
                  Contact details
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  How we&apos;ll reach you about this request.
                </p>
              </div>

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
              <div>
                <h3 className="text-lg font-semibold text-[#0D0F11]">
                  Scheduling &amp; location
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Where should we provide the service, and when works best for
                  you?
                </p>
              </div>

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
                        placeholder="Access instructions, parking, allergies, special instructions..."
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
          By submitting, you agree to our{" "}
          <a href="/terms" className="text-[#F0A500] hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="text-[#F0A500] hover:underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </section>
  );
};

export default ServiceRequestForm;