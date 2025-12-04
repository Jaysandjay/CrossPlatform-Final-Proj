import { Category } from "./Category";

export interface Expense {
  id: string;
  title: string;
  amount: number;
  date: Date;
  category: Category;
  description?: string;
}
