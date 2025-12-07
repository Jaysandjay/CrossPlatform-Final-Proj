export interface Currency {
  code: string;           // ISO 4217 code (e.g., "CAD", "USD", "EUR")
  name: string;           // Display name (e.g., "Canadian Dollar")
  symbol: string;         // Currency symbol (e.g., "$", "€", "£")
  rateToCAD: number;      // Exchange rate relative to CAD (CAD = 1.0)
}

export interface ExchangeRates {
  rates: Record<string, number>;  // Currency code -> rate from CAD
  lastUpdated: number;             // Timestamp of last update
}

// Supported currencies with their symbols and default fallback rates
export const SUPPORTED_CURRENCIES: Currency[] = [
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'CA$', rateToCAD: 1.0 },
  { code: 'USD', name: 'US Dollar', symbol: '$', rateToCAD: 0.73 },
  { code: 'EUR', name: 'Euro', symbol: '€', rateToCAD: 0.68 },
  { code: 'GBP', name: 'British Pound', symbol: '£', rateToCAD: 0.58 },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', rateToCAD: 108.0 },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', rateToCAD: 1.11 },
  { code: 'MXN', name: 'Mexican Peso', symbol: 'MX$', rateToCAD: 13.2 },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', rateToCAD: 61.0 },
];

export const DEFAULT_CURRENCY_CODE = 'CAD';
