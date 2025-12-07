import type { ExchangeRates } from './Currency';

export interface Settings {
  budget: number;
  showQuotes: boolean;
  showAdvice: boolean;
  currency: string;
  exchangeRates?: ExchangeRates;
}