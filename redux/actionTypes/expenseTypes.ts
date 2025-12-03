import type { Expense } from "@/types/Expense";
export const ADD_EXPENSE = "ADD_EXPENSE";
export const UPDATE_EXPENSE = "UPDATE_EXPENSE";
export const DELETE_EXPENSE = "DELETE_EXPENSE";
export const CLEAR_EXPENSES = "CLEAR_EXPENSES";


export interface AddExpenseAction {
  type: typeof ADD_EXPENSE;
  payload: Expense;
}

export interface UpdateExpenseAction {
  type: typeof UPDATE_EXPENSE;
  payload: {
    id: string;
    updates: Partial<Expense>;
  };
}

export interface DeleteExpenseAction {
  type: typeof DELETE_EXPENSE;
  payload: {
    id: string;
  };
}

export interface ClearExpensesAction {
  type: typeof CLEAR_EXPENSES;
}

export type ExpenseActionTypes =
  | AddExpenseAction
  | UpdateExpenseAction
  | DeleteExpenseAction
  | ClearExpensesAction;
