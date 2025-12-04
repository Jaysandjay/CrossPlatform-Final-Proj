// screens/ExpensesScreen.tsx
import ExpenseForm from "@/components/ExpenseForm";
import ExpenseItem from "@/components/ExpenseItem";
import { deleteExpense } from "@/redux/actions/expenseActions";
import type { AppDispatch, RootState } from "@/redux/store";
import type { Expense } from "@/types/Expense";
import React, { useState } from "react";
import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const ExpensesScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const expenses = useSelector((state: RootState) => state.expenses);

  const [modalVisible, setModalVisible] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | undefined>(undefined);

  const sortedExpenses = [...expenses].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const handleAdd = () => {
    setEditingExpense(undefined); // clear editing
    setModalVisible(true);
  };

  const handleEdit = (expense: Expense) => {
    setEditingExpense(expense);
    setModalVisible(true);
  };

  const handleDelete = (id: string) => dispatch(deleteExpense(id));

  const renderItem = ({ item }: { item: Expense }) => (
    <ExpenseItem
      expense={item}
      category={item.category}
      onEdit={() => handleEdit(item)}
      onDelete={() => handleDelete(item.id)}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={sortedExpenses}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={<ExpenseItem isEmpty />}
      />

      {/* Add Expense Button */}
      <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
        <Text style={styles.addButtonText}>+ Add Expense</Text>
      </TouchableOpacity>

      {/* Expense Form Modal */}
      <Modal visible={modalVisible} animationType="slide">
        <ExpenseForm
          expense={editingExpense}
          onClose={() => setModalVisible(false)}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F2F2F7" },
  listContent: { padding: 15 },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#3b82f6",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 50,
    elevation: 5,
  },
  addButtonText: { color: "#fff", fontWeight: "600", fontSize: 16 },
});

export default ExpensesScreen;
