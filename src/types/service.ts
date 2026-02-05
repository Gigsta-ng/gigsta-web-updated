export type ServiceType = 'cleaning' | 'cooking';

export interface PriceItem {
  label: string;   
  amount: string;  
}

export interface PricingGroup {
  title: string;              
  description?: string;   
  prices: PriceItem[];       
  note?: string;              
}

export interface Service {
  id: ServiceType;
  name: string;
  heroImage: string;
  shortDescription: string;
  description: string;
  includes: string[];         
  pricingGroups: PricingGroup[];  
}
