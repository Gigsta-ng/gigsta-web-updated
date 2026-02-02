import { z } from "zod";

export const providerSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  whatsappNumber: z
    .string()
    .min(10, "Enter a valid WhatsApp number")
    .max(16, "Enter a valid WhatsApp number"),
  emailAddress: z.string().email("Enter a valid email address"),

  gender: z.enum(["female", "male", "other"], {
    message: "Please select a gender",
  }),

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

  primaryService: z.enum(
    [
      "house-cleaning",
      "personal-chef",
      "laundry-ironing",
      "plumbing",
      "gardening",
      "others",
    ],
    { message: "Please select your primary service" }
  ),

  yearsOfExperience: z.enum(["less-than-1", "1-3", "3-5", "5+"], {
    message: "Please select experience level",
  }),

  operateLocation: z.string().min(2, "Where you operate is required"),

  availability: z.enum(["weekdays", "weekends", "both"], {
    message: "Please select availability",
  }),

  availabilityTime: z.enum(["morning", "afternoon", "evening", "anytime"], {
    message: "Please select availability time",
  }),

  howDoYouCharge: z.enum(["hourly", "per-job", "both"], {
    message: "Please select how you charge",
  }),

  averageCharge: z.string().min(2, "Average charge is required"),

  additionalDetails: z
    .string()
    .min(20, "Please provide more detail (at least 20 characters)"),


  terms: z
    .boolean()
    .refine((v) => v === true, "You must agree to the terms"),
});

export type ProviderFormValues = z.infer<typeof providerSchema>;
