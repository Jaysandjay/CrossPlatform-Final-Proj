import type { Settings } from "@/types/Settings";
export const UPDATE_SETTINGS = "UPDATE_SETTINGS";
export const RESET_SETTINGS = "RESET_SETTINGS";
export const SET_BUDGET = "SET_BUDGET";

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

export type SettingsActionTypes = UpdateSettingsAction | ResetSettingsAction | SetBudgetAction;
