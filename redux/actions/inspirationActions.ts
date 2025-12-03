import type { Advice } from "@/types/Advice";
import type { Quote } from "@/types/Quote";
import {
  CLEAR_INSPIRATION,
  ClearInspirationAction,
  TOGGLE_SHOW_ADVICE,
  TOGGLE_SHOW_QUOTE,
  UPDATE_ADVICE,
  UPDATE_QUOTE,
  UpdateAdviceAction,
  UpdateQuoteAction
} from "../actionTypes/inspirationTypes";


export const updateQuote = (quote: Quote): UpdateQuoteAction => ({
  type: UPDATE_QUOTE,
  payload: quote,
});

export const updateAdvice = (advice: Advice): UpdateAdviceAction => ({
  type: UPDATE_ADVICE,
  payload: advice,
});

export const clearInspiration = (): ClearInspirationAction => ({
  type: CLEAR_INSPIRATION,
});

export const toggleShowQuote = () => ({
  type: TOGGLE_SHOW_QUOTE as typeof TOGGLE_SHOW_QUOTE,
});

export const toggleShowAdvice = () => ({
  type: TOGGLE_SHOW_ADVICE as typeof TOGGLE_SHOW_ADVICE,
});