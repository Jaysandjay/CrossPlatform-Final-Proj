import { SUPPORTED_CURRENCIES, DEFAULT_CURRENCY_CODE } from "@/types/Currency";
import type { Currency } from "@/types/Currency";

/**
 * Convert CAD amount to display currency
 * @param amountInCAD - Amount stored in CAD
 * @param targetCurrencyCode - Currency to display in
 * @param exchangeRates - Current exchange rates from Redux
 * @returns Converted amount
 */
export const convertFromCAD = (
  amountInCAD: number,
  targetCurrencyCode: string,
  exchangeRates?: Record<string, number>
): number => {
  if (targetCurrencyCode === DEFAULT_CURRENCY_CODE) {
    return amountInCAD;
  }

  const rate = exchangeRates?.[targetCurrencyCode];
  if (!rate) {
    // Fallback to default rate from SUPPORTED_CURRENCIES
    const currency = SUPPORTED_CURRENCIES.find(c => c.code === targetCurrencyCode);
    return amountInCAD / (currency?.rateToCAD || 1.0);
  }

  // Rate is how much of target currency = 1 CAD
  return amountInCAD * rate;
};

/**
 * Convert display currency back to CAD for storage
 * @param amount - Amount in display currency
 * @param sourceCurrencyCode - Currency code of the amount
 * @param exchangeRates - Current exchange rates from Redux
 * @returns Amount in CAD
 */
export const convertToCAD = (
  amount: number,
  sourceCurrencyCode: string,
  exchangeRates?: Record<string, number>
): number => {
  if (sourceCurrencyCode === DEFAULT_CURRENCY_CODE) {
    return amount;
  }

  const rate = exchangeRates?.[sourceCurrencyCode];
  if (!rate) {
    const currency = SUPPORTED_CURRENCIES.find(c => c.code === sourceCurrencyCode);
    return amount * (currency?.rateToCAD || 1.0);
  }

  return amount / rate;
};

/**
 * Format amount with currency symbol
 * @param amountInCAD - Amount stored in CAD
 * @param currencyCode - Currency to display in
 * @param exchangeRates - Current exchange rates
 * @returns Formatted string (e.g., "$123.45", "€91.20")
 */
export const formatCurrency = (
  amountInCAD: number,
  currencyCode: string = DEFAULT_CURRENCY_CODE,
  exchangeRates?: Record<string, number>
): string => {
  const currency = getCurrencyByCode(currencyCode);
  const convertedAmount = convertFromCAD(amountInCAD, currencyCode, exchangeRates);

  // JPY doesn't use decimals
  const decimals = currencyCode === 'JPY' ? 0 : 2;

  return `${currency.symbol}${convertedAmount.toFixed(decimals)}`;
};

/**
 * Get currency object by code
 */
export const getCurrencyByCode = (code: string): Currency => {
  return SUPPORTED_CURRENCIES.find(c => c.code === code) || SUPPORTED_CURRENCIES[0];
};
