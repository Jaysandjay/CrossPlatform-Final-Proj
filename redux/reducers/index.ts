import { combineReducers } from "redux";
import categoryReducer from "./categoryReducer";
import expenseReducer from "./expenseReducer";
import inspirationReducer from "./inspirationReducer";
import settingsReducer from "./settingsReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  user: userReducer,
  expenses: expenseReducer,
  categories: categoryReducer,
  inspiration: inspirationReducer,
  settings: settingsReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
