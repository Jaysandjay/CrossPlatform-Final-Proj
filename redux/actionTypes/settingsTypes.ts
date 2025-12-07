import type { Settings } from "@/types/Settings";
import type { ExchangeRates } from "@/types/Currency";

export const UPDATE_SETTINGS = "UPDATE_SETTINGS";
export const RESET_SETTINGS = "RESET_SETTINGS";
export const SET_BUDGET = "SET_BUDGET";
export const SET_CURRENCY = "SET_CURRENCY";
export const UPDATE_EXCHANGE_RATES = "UPDATE_EXCHANGE_RATES";

export interface SetBudgetAction {
  type: typeof SET_BUDGET;
  payload: number;
}

export interface UpdateSettingsAction {
  type: typeof UPDATE_SETTINGS;
  payload: Partial<Settings>;
}

export interface ResetSettingsAction {
  type: typeof RESET_SETTINGS;
}

export interface SetCurrencyAction {
  type: typeof SET_CURRENCY;
  payload: string;
}

export interface UpdateExchangeRatesAction {
  type: typeof UPDATE_EXCHANGE_RATES;
  payload: ExchangeRates;
}

export type SettingsActionTypes =
  | UpdateSettingsAction
  | ResetSettingsAction
  | SetBudgetAction
  | SetCurrencyAction
  | UpdateExchangeRatesAction;
