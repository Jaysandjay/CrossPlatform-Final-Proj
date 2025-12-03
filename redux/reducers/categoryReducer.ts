import type { Category } from "@/types/Category";
import { ADD_CATEGORY, CategoryActionTypes, DELETE_CATEGORY, UPDATE_CATEGORY } from "../actionTypes/categoryTypes";


export type CategoryState = Category[];

const initialState: CategoryState = [
  { id: 'food', name: 'Food', color: '#FF6B6B', icon: 'restaurant', isDefault: true },
  { id: 'transport', name: 'Transport', color: '#4ECDC4', icon: 'directions-car', isDefault: true },
  { id: 'entertainment', name: 'Entertainment', color: '#95E1D3', icon: 'movie', isDefault: true },
  { id: 'shopping', name: 'Shopping', color: '#F38181', icon: 'shopping-cart', isDefault: true },
  { id: 'bills', name: 'Bills', color: '#AA96DA', icon: 'receipt', isDefault: true },
  { id: 'health', name: 'Health', color: '#FCBAD3', icon: 'local-hospital', isDefault: true },
  { id: 'education', name: 'Education', color: '#A8D8EA', icon: 'school', isDefault: true },
  { id: 'other', name: 'Other', color: '#FFFFD2', icon: 'more-horiz', isDefault: true },
];

export default function categoryReducer(state: CategoryState = initialState,action: CategoryActionTypes): CategoryState {
  switch (action.type) {
    case ADD_CATEGORY:
      return [...state, action.payload];

    case UPDATE_CATEGORY:
      return state.map((category) =>
        category.id === action.payload.id && !category.isDefault
          ? { ...category, ...action.payload.updates }
          : category
      );

    case DELETE_CATEGORY:
      return state.filter((category) => category.id !== action.payload.id || category.isDefault);

    default:
      return state;
  }
}
