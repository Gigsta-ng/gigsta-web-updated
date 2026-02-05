import { z } from "zod";

const requiredSelect = (message: string) =>
  z.string().min(1, message); 


export const providerSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),

  whatsappNumber: z
    .string()
    .min(10, "Enter a valid WhatsApp number")
    .max(16, "Enter a valid WhatsApp number"),

  emailAddress: z.string().email("Enter a valid email address"),


  gender: requiredSelect("Please select a gender").refine(
    (v) => ["female", "male", "other"].includes(v),
    "Please select a valid gender"
  ),

  dateOfBirth: z
    .string()
    .min(1, "Date of birth is required")
    .refine((val) => {
      const dob = new Date(val);
      if (Number.isNaN(dob.getTime())) return false;

      const today = new Date();
      const adultDate = new Date(
        today.getFullYear() - 18,
        today.getMonth(),
        today.getDate()
      );

      return dob <= adultDate;
    }, "You must be 18 or older"),

  location: z.string().min(2, "Location is required"),

  primaryService: requiredSelect("Please select your primary service").refine(
    (v) =>
      [
        "house-cleaning",
        "personal-chef",
        "laundry-ironing",
        "plumbing",
        "gardening",
        "others",
      ].includes(v),
    "Please select a valid primary service"
  ),

  yearsOfExperience: requiredSelect("Please select experience level").refine(
    (v) => ["less-than-1", "1-3", "3-5", "5+"].includes(v),
    "Please select a valid experience level"
  ),

  operateLocation: z.string().min(2, "Where you operate is required"),

  availability: requiredSelect("Please select availability").refine(
    (v) => ["weekdays", "weekends", "both"].includes(v),
    "Please select a valid availability"
  ),

  availabilityTime: requiredSelect("Please select availability time").refine(
    (v) => ["morning", "afternoon", "evening", "anytime"].includes(v),
    "Please select a valid availability time"
  ),

  howDoYouCharge: requiredSelect("Please select how you charge").refine(
    (v) => ["hourly", "per-job", "both"].includes(v),
    "Please select a valid charging method"
  ),

  averageCharge: z.string().min(2, "Average charge is required"),

  additionalDetails: z
    .string()
    .min(20, "Please provide more detail (at least 20 characters)"),

  terms: z.boolean().refine((v) => v === true, "You must agree to the terms"),
});

export type ProviderFormValues = z.infer<typeof providerSchema>;
