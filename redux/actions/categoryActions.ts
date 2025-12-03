import type { Category } from "@/types/Category";
import {
    ADD_CATEGORY,
    AddCategoryAction,
    DELETE_CATEGORY,
    DeleteCategoryAction,
    UPDATE_CATEGORY,
    UpdateCategoryAction,
} from "../actionTypes/categoryTypes";


export const addCategory = (category: Category): AddCategoryAction => ({
  type: ADD_CATEGORY,
  payload: category,
});

export const updateCategory = (id: string, updates: Partial<Category>): UpdateCategoryAction => ({
  type: UPDATE_CATEGORY,
  payload: { id, updates },
});

export const deleteCategory = (id: string): DeleteCategoryAction => ({
  type: DELETE_CATEGORY,
  payload: { id },
});
