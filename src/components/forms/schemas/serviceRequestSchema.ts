import { z } from "zod";

export const serviceRequestSchema = z.object({
  // Personal Information
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name must not exceed 100 characters"),

  whatsappNumber: z
    .string()
    .min(10, "Please enter a valid WhatsApp number")
    .max(15, "WhatsApp number is too long")
    .regex(/^[0-9+\s()-]+$/, "Please enter a valid phone number"),

  emailAddress: z
    .string()
    .email("Please enter a valid email address")
    .min(1, "Email address is required"),

  // Service Details
  selectService: z
    .string()
    .min(1, "Please select a service"),

  serviceAddress: z
    .string()
    .min(5, "Please enter a valid service address")
    .max(200, "Address is too long"),

  preferredDateTime: z
    .string()
    .min(1, "Please select your preferred date and time"),

  additionalDetails: z
    .string()
    .max(500, "Additional details must not exceed 500 characters")
    .optional(),
});

export type ServiceRequestFormValues = z.infer<typeof serviceRequestSchema>;