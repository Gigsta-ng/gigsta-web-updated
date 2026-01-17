import { z } from 'zod';

export const clientBookingSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().regex(/^0[789][01]\d{8}$/, 'Invalid Nigerian phone number'),
  address: z.string().min(10, 'Please provide a detailed address'),
  location: z.string().optional(),
  serviceType: z.enum(['cleaning', 'laundry', 'errands']),
  pricingTier: z.enum(['lite', 'standard', 'pro']),
  scope: z.string(),
  preferredDate: z.string(),
  preferredTime: z.string(),
});

export const providerRegistrationSchema = z.object({
  fullName: z.string().min(2),
  phone: z.string().regex(/^0[789][01]\d{8}$/),
  gender: z.enum(['male', 'female', 'prefer-not-to-say']).optional(),
  ageRange: z.enum(['18-24', '25-34', '35-44', '45+']),
  primaryService: z.string(),
  otherServices: z.array(z.string()).max(2),
  yearsExperience: z.enum(['0-1', '1-3', '3-5', '5+']),
  operatingArea: z.string(),
  availableDays: z.array(z.string()),
  availableTime: z.enum(['morning', 'afternoon', 'evening', 'anytime']),
  chargingMethod: z.enum(['hourly', 'per-job', 'both']),
  averageCharge: z.string(),
  hasGovernmentId: z.boolean(),
  canJoinWhatsApp: z.boolean(),
  hasWorkedBefore: z.boolean(),
  consent: z.boolean().refine(val => val === true, 'You must agree to continue'),
});