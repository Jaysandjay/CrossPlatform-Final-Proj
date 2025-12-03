import type { Category } from "@/types/Category";
export const ADD_CATEGORY = "ADD_CATEGORY";
export const UPDATE_CATEGORY = "UPDATE_CATEGORY";
export const DELETE_CATEGORY = "DELETE_CATEGORY";

export interface AddCategoryAction {
  type: typeof ADD_CATEGORY;
  payload: Category;
}

export interface UpdateCategoryAction {
  type: typeof UPDATE_CATEGORY;
  payload: {
    id: string;
    updates: Partial<Category>;
  };
}

export interface DeleteCategoryAction {
  type: typeof DELETE_CATEGORY;
  payload: {
    id: string;
  };
}

export type CategoryActionTypes =
  | AddCategoryAction
  | UpdateCategoryAction
  | DeleteCategoryAction;
