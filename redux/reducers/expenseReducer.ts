import type { Expense } from "@/types/Expense";
import { ADD_EXPENSE, CLEAR_EXPENSES, DELETE_EXPENSE, ExpenseActionTypes, UPDATE_EXPENSE } from "../actionTypes/expenseTypes";

export type ExpenseState = Expense[];

const initialState: ExpenseState = [];

export default function expenseReducer(state: ExpenseState = initialState,action: ExpenseActionTypes): ExpenseState {
  switch (action.type) {
    case ADD_EXPENSE:
      return [...state, action.payload];

    case UPDATE_EXPENSE:
      return state.map((expense) =>
        expense.id === action.payload.id ? { ...expense, ...action.payload.updates } : expense
      );

    case DELETE_EXPENSE:
      return state.filter((expense) => expense.id !== action.payload.id);

    case CLEAR_EXPENSES:
      return [];

    default:
      return state;
  }
}
