import type { Settings } from "@/types/Settings";
import { TOGGLE_SHOW_ADVICE, TOGGLE_SHOW_QUOTE } from "../actionTypes/inspirationTypes";
import { RESET_SETTINGS, SET_BUDGET, SettingsActionTypes, UPDATE_SETTINGS } from "../actionTypes/settingsTypes";

// Default settings
export const defaultSettings: Settings = {
  budget: 1000.0,
  showQuotes: true,
  showAdvice: true,
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
      };
    }

    case RESET_SETTINGS:
      return defaultSettings;

    case SET_BUDGET:
      return { ...state, budget: action.payload };

    case TOGGLE_SHOW_QUOTE:
      return { ...state, showQuotes: !state.showQuotes };

    case TOGGLE_SHOW_ADVICE:
      return { ...state, showAdvice: !state.showAdvice };

    default:
      return state;
  }
}
