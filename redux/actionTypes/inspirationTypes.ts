import type { Advice } from "@/types/Advice";
import type { Quote } from "@/types/Quote";
export const UPDATE_QUOTE = "UPDATE_QUOTE";
export const UPDATE_ADVICE = "UPDATE_ADVICE";
export const CLEAR_INSPIRATION = "CLEAR_INSPIRATION";
export const TOGGLE_SHOW_QUOTE = "TOGGLE_SHOW_QUOTE";
export const TOGGLE_SHOW_ADVICE = "TOGGLE_SHOW_ADVICE";

interface ToggleShowQuoteAction {
  type: typeof TOGGLE_SHOW_QUOTE;
}
interface ToggleShowAdviceAction {
  type: typeof TOGGLE_SHOW_ADVICE;
}

export interface UpdateQuoteAction {
  type: typeof UPDATE_QUOTE;
  payload: Quote;
}

export interface UpdateAdviceAction {
  type: typeof UPDATE_ADVICE;
  payload: Advice;
}

export interface ClearInspirationAction {
  type: typeof CLEAR_INSPIRATION;
}

export type InspirationActionTypes =
  | UpdateQuoteAction
  | UpdateAdviceAction
  | ClearInspirationAction
  | ToggleShowQuoteAction
  | ToggleShowAdviceAction;
