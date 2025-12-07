import type { Settings } from "@/types/Settings";
import type { ExchangeRates } from "@/types/Currency";
import {
  RESET_SETTINGS,
  ResetSettingsAction,
  SET_BUDGET,
  SetBudgetAction,
  SET_CURRENCY,
  SetCurrencyAction,
  UPDATE_EXCHANGE_RATES,
  UpdateExchangeRatesAction,
  UPDATE_SETTINGS,
  UpdateSettingsAction
} from "../actionTypes/settingsTypes";


export const updateSettings = (settings: Partial<Settings>): UpdateSettingsAction => ({
  type: UPDATE_SETTINGS,
  payload: settings,
});

export const resetSettings = (): ResetSettingsAction => ({
  type: RESET_SETTINGS,
});

export const setBudget = (budget: number): SetBudgetAction => ({
  type: SET_BUDGET,
  payload: budget,
});

export const setCurrency = (currencyCode: string): SetCurrencyAction => ({
  type: SET_CURRENCY,
  payload: currencyCode,
});

export const updateExchangeRates = (rates: ExchangeRates): UpdateExchangeRatesAction => ({
  type: UPDATE_EXCHANGE_RATES,
  payload: rates,
});