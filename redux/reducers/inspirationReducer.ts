import type { Advice } from "@/types/Advice";
import type { Quote } from "@/types/Quote";
import {
  CLEAR_INSPIRATION,
  InspirationActionTypes,
  TOGGLE_SHOW_ADVICE,
  TOGGLE_SHOW_QUOTE,
  UPDATE_ADVICE,
  UPDATE_QUOTE
} from "../actionTypes/inspirationTypes";

export interface InspirationState {
  motivationalQuote: Quote | null;
  dailyAdvice: Advice | null;
  showQuote: boolean;
  showAdvice: boolean;
}

const initialState: InspirationState = {
  motivationalQuote: null,
  dailyAdvice: null,
  showQuote: true,
  showAdvice: true,
};

export default function inspirationReducer(state: InspirationState = initialState,action: InspirationActionTypes): InspirationState {
  switch (action.type) {
    case UPDATE_QUOTE:
      return { ...state, motivationalQuote: action.payload };

    case UPDATE_ADVICE:
      return { ...state, dailyAdvice: action.payload };

    case CLEAR_INSPIRATION:
      return initialState;

    case TOGGLE_SHOW_QUOTE:
      return { ...state, showQuote: !state.showQuote };

    case TOGGLE_SHOW_ADVICE:
      return { ...state, showAdvice: !state.showAdvice };

    default:
      return state;
  }
}
