export interface User {
  id: number;
  first_name: string;
  last_name: string;
  full_name: string;
  email: string;
  phone_prefix: number | null;
  phone: string | null;
  whatsapp: boolean;
  profile_image: string;
  dob: string | null; // Date of birth, if available, should be a string representing date
  gender: string | null;
  gender_display: string | null;
  address: string;
  city: string | null;
  state: string | null;
  country: string | null;
  created_at: string; // ISO 8601 string representation of date/time
  tokens: any[]; // Assuming tokens can be any type, adjust as per actual structure if known
  source: string;
  active_subscription: any | null; // Adjust type according to subscription structure if known
}
