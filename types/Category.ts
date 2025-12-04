// types/Category.ts
export interface Category {
  id: string;          
  name: string;        
  color: string;       
  icon: string;        
  isDefault?: boolean; 
}

export const DEFAULT_CATEGORIES: Category[] = [
  { id: 'food', name: 'Food', color: '#FF6B6B', icon: 'restaurant' },
  { id: 'transport', name: 'Transport', color: '#4ECDC4', icon: 'directions-car' },
  { id: 'entertainment', name: 'Entertainment', color: '#95E1D3', icon: 'movie' },
  { id: 'shopping', name: 'Shopping', color: '#F38181', icon: 'shopping-cart' },
  { id: 'bills', name: 'Bills', color: '#AA96DA', icon: 'receipt' },
  { id: 'health', name: 'Health', color: '#FCBAD3', icon: 'local-hospital' },
  { id: 'education', name: 'Education', color: '#A8D8EA', icon: 'school' },
  { id: 'other', name: 'Other', color: '#FFFFD2', icon: 'more-horiz' },
];