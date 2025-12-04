import { Category } from "./Category";

export interface Expense {
  id: string;
  title: string;
  amount: number;
  date: string;
  category: Category;
  description?: string;
}
