import type { Settings } from "@/types/Settings";
import { DEFAULT_CURRENCY_CODE, SUPPORTED_CURRENCIES } from "@/types/Currency";
import { TOGGLE_SHOW_ADVICE, TOGGLE_SHOW_QUOTE } from "../actionTypes/inspirationTypes";
import { RESET_SETTINGS, SET_BUDGET, SET_CURRENCY, UPDATE_EXCHANGE_RATES, SettingsActionTypes, UPDATE_SETTINGS } from "../actionTypes/settingsTypes";

// Default settings
export const defaultSettings: Settings = {
  budget: 1000.0,
  showQuotes: true,
  showAdvice: true,
  currency: DEFAULT_CURRENCY_CODE,
  exchangeRates: {
    rates: SUPPORTED_CURRENCIES.reduce((acc, curr) => {
      acc[curr.code] = curr.code === 'CAD' ? 1.0 : 1.0 / curr.rateToCAD;
      return acc;
    }, {} as Record<string, number>),
    lastUpdated: Date.now(),
  },
};

const initialState: Settings = defaultSettings;

export default function settingsReducer(
  state: Settings = initialState,
  action: SettingsActionTypes | { type: typeof TOGGLE_SHOW_QUOTE } | { type: typeof TOGGLE_SHOW_ADVICE }
): Settings {
  switch (action.type) {
    case UPDATE_SETTINGS: {
      const payload = action.payload || {};
      return {
        ...state,
        budget: payload.budget !== undefined ? Number(payload.budget) : state.budget,
        showQuotes: payload.showQuotes !== undefined ? Boolean(payload.showQuotes) : state.showQuotes,
        showAdvice: payload.showAdvice !== undefined ? Boolean(payload.showAdvice) : state.showAdvice,
        currency: payload.currency !== undefined ? payload.currency : state.currency,
        exchangeRates: payload.exchangeRates !== undefined ? payload.exchangeRates : state.exchangeRates,
      };
    }

    case RESET_SETTINGS:
      return defaultSettings;

    case SET_BUDGET:
      return { ...state, budget: action.payload };

    case SET_CURRENCY:
      return { ...state, currency: action.payload };

    case UPDATE_EXCHANGE_RATES:
      return { ...state, exchangeRates: action.payload };

    case TOGGLE_SHOW_QUOTE:
      return { ...state, showQuotes: !state.showQuotes };

    case TOGGLE_SHOW_ADVICE:
      return { ...state, showAdvice: !state.showAdvice };

    default:
      return state;
  }
}
