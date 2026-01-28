// export type ServiceType = 'cleaning' | 'laundry' | 'errands';

// export type PricingTier = 'lite' | 'standard' | 'pro';

// export interface Service {
//   id: ServiceType;
//   name: string;
//   icon: string;
//   description: string;
//   pricing: {
//     [key in PricingTier]: {
//       basePrice: number;
//       scope: string[];
//       features: string[];
//     }
//   };

// types/service.ts
// export type ServiceType = 'cleaning' | 'cooking' | 'laundry' | 'errands';
// export type PricingTier = 'lite' | 'standard' | 'pro';


// export interface Pricing {
//   basePrice: number;
//   amount: string[];
//   scope: string[];
//   features: string[];
//   note?: string;
// }

// export interface Service {
//   id: ServiceType;
//   name: string;
//   icon: string;
//   description: string;
//   pricing: {
//     [key in PricingTier]: Pricing;
//   };
// }


export type ServiceType = "cleaning" | "cooking" | "laundry" | "errands";

export type PricingTier = "lite" | "standard" | "pro";

export interface Pricing {
  basePrice: number;
  amount: string[];
  scope: string[];
  features: string[];
  note?: string;
}

export interface PackageOption {
  title: string;
  priceRange: string;
  description?: string;
}

export interface ServicePackage {
  category: "one-time" | "monthly";
  options: PackageOption[];
}

export interface Service {
  id: ServiceType;
  name: string;
  icon: string;
  description: string;

  pricing: {
    [key in PricingTier]: Pricing;
  };

  packages?: ServicePackage[];
}
