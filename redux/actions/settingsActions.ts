import type { Settings } from "@/types/Settings";
import {
  RESET_SETTINGS,
  ResetSettingsAction,
  SET_BUDGET,
  SetBudgetAction,
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