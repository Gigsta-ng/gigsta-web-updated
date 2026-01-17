export type ServiceType = 'cleaning' | 'laundry' | 'errands';

export type PricingTier = 'lite' | 'standard' | 'pro';

export interface Service {
  id: ServiceType;
  name: string;
  icon: string;
  description: string;
  pricing: {
    [key in PricingTier]: {
      basePrice: number;
      scope: string[];
      features: string[];
    }
  };
}