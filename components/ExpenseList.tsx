import ExpenseItem from "@/components/ExpenseItem";
import { deleteExpense } from "@/redux/actions/expenseActions";
import type { AppDispatch, RootState } from "@/redux/store";
import React from "react";
import { FlatList, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const ExpenseListScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const expenses = useSelector((state: RootState) => state.expenses);
  const categories = useSelector((state: RootState) => state.categories);

  const sortedExpenses = [...expenses].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const handleDelete = (id: string) => dispatch(deleteExpense(id));
  const handleEdit = (expense: any) => { /* navigate to edit screen */ };
  const getCategory = (id: string) => categories.find((cat) => cat.id === id) || categories[0];

  return (
    <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      <FlatList
        data={sortedExpenses.length ? sortedExpenses : [undefined]} // pass undefined if empty
        keyExtractor={(item, index) => item?.id || `empty-${index}`}
        contentContainerStyle={{ padding: 15 }}
        renderItem={({ item }) => (
          <ExpenseItem
            expense={item}
            category={item ? getCategory(item.category) : undefined}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        )}
      />
    </View>
  );
};

export default ExpenseListScreen;
