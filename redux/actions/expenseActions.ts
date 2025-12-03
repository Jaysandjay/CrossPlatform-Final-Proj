import type { Expense } from "@/types/Expense";
import {
    ADD_EXPENSE,
    AddExpenseAction,
    CLEAR_EXPENSES,
    ClearExpensesAction,
    DELETE_EXPENSE,
    DeleteExpenseAction,
    UPDATE_EXPENSE,
    UpdateExpenseAction,
} from "../actionTypes/expenseTypes";

export const addExpense = (expense: Expense): AddExpenseAction => ({
  type: ADD_EXPENSE,
  payload: expense,
});

export const updateExpense = (id: string, updates: Partial<Expense>): UpdateExpenseAction => ({
  type: UPDATE_EXPENSE,
  payload: { id, updates },
});

export const deleteExpense = (id: string): DeleteExpenseAction => ({
  type: DELETE_EXPENSE,
  payload: { id },
});

export const clearExpenses = (): ClearExpensesAction => ({
  type: CLEAR_EXPENSES,
});
