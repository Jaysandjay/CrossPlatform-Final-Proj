import type { ExchangeRates } from "@/types/Currency";
import { SUPPORTED_CURRENCIES } from "@/types/Currency";
import { Platform } from "react-native";

// TODO: Replace with your API key from exchangerate-api.com (free tier: 1500 requests/month)
const API_KEY = "f9ffc7b0ec02173ba6ce172d";
const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}`;
const CORS_PROXY = "https://corsproxy.io/?";
const BASE_CURRENCY = "CAD";

// Default rates as fallback
const DEFAULT_RATES: ExchangeRates = {
  rates: SUPPORTED_CURRENCIES.reduce((acc, curr) => {
    acc[curr.code] = curr.code === 'CAD' ? 1.0 : 1.0 / curr.rateToCAD;
    return acc;
  }, {} as Record<string, number>),
  lastUpdated: Date.now(),
};

/**
 * Fetch current exchange rates from exchangerate-api.com
 * Returns rates where 1 CAD = X of target currency
 */
export const fetchExchangeRates = async (): Promise<ExchangeRates> => {
  try {
    const url = `${BASE_URL}/latest/${BASE_CURRENCY}`;
    const finalUrl = Platform.OS === 'web'
      ? `${CORS_PROXY}${encodeURIComponent(url)}`
      : url;

    console.log("🔍 Fetching exchange rates from:", finalUrl);

    const response = await fetch(finalUrl, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // exchangerate-api.com returns: { result, conversion_rates: { USD: 0.73, EUR: 0.68, ... } }
    const rates: Record<string, number> = {};

    // Extract rates for supported currencies
    for (const curr of SUPPORTED_CURRENCIES) {
      if (data.conversion_rates && data.conversion_rates[curr.code]) {
        rates[curr.code] = data.conversion_rates[curr.code];
      } else {
        // Fallback to default rate if not in API response
        rates[curr.code] = curr.code === 'CAD' ? 1.0 : 1.0 / curr.rateToCAD;
      }
    }

    console.log("✅ Exchange rates fetched successfully");
    return {
      rates,
      lastUpdated: Date.now(),
    };
  } catch (error) {
    console.error("❌ Exchange Rate API Error:", error);
    console.log("📝 Using fallback default rates");
    return DEFAULT_RATES;
  }
};

/**
 * Check if rates need refresh (older than 24 hours)
 */
export const shouldRefreshRates = (lastUpdated?: number): boolean => {
  if (!lastUpdated) return true;
  const ONE_DAY = 24 * 60 * 60 * 1000;
  return Date.now() - lastUpdated > ONE_DAY;
};
