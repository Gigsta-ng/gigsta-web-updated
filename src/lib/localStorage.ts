/**
 * Utility functions for managing user details in localStorage
 * Stores: Full Name, WhatsApp Number, Email Address, Service Address
 */

const STORAGE_KEY = 'gigsta_user_details';

export interface UserDetails {
  fullName: string;
  whatsappNumber: string;
  emailAddress: string;
  serviceAddress: string;
}

/**
 * Save user details to localStorage
 */
export function saveUserDetails(details: UserDetails): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(details));
  } catch (error) {
    console.error('Error saving user details to localStorage:', error);
  }
}

/**
 * Load user details from localStorage
 */
export function loadUserDetails(): UserDetails | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored) as UserDetails;
    }
    return null;
  } catch (error) {
    console.error('Error loading user details from localStorage:', error);
    return null;
  }
}

/**
 * Clear user details from localStorage
 */
export function clearUserDetails(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing user details from localStorage:', error);
  }
}
