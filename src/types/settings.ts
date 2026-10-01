export interface GeneralSettings {
  storeName: string;
  tagline: string;
  logo: string;
  currency: string;
  currencySymbol: string;
  supportEmail: string;
  supportPhone: string;
  address: string;
}

export interface DeliverySettings {
  deliveryCharges: number;
  freeDeliveryThreshold: number;
  estimatedDays: string;
}

export interface WhatsAppSettings {
  phoneNumber: string; // e.g., '923001234567' (international format without +)
  orderMessageTemplate: string;
  inquiryMessageTemplate: string;
  isEnabled: boolean;
}

export interface SocialSettings {
  facebook: string;
  instagram: string;
  tiktok: string;
  youtube: string;
}

export interface StoreSettings {
  general: GeneralSettings;
  delivery: DeliverySettings;
  whatsapp: WhatsAppSettings;
  social: SocialSettings;
}
