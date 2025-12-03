import { addExpense, updateExpense } from "@/redux/actions/expenseActions";
import type { AppDispatch } from "@/redux/store";
import type { Expense } from "@/types/Expense";
import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";


interface ExpenseFormProps {
  expense?: Expense; // optional, present if editing
  onClose?: () => void; // optional, to close modal
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ expense, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [title, setTitle] = useState(expense?.title || "");
  const [amount, setAmount] = useState(expense?.amount.toString() || "");
  const [date, setDate] = useState(expense?.date || "");
  const [category, setCategory] = useState(expense?.category || "");
  const [description, setDescription] = useState(expense?.description || "");

  const handleSave = () => {
    if (!title.trim() || !amount.trim() || !date.trim() || !category.trim()) {
      Alert.alert("Validation Error", "Please fill in all required fields");
      return;
    }

    const newExpense: Expense = {
      id: expense?.id || Date.now().toString(),
      title: title.trim(),
      amount: parseFloat(amount),
      date,
      category: category.trim(),
      description: description.trim(),
    };

    if (expense) {
      // Edit mode
      const { id, ...updates } = newExpense;
      dispatch(updateExpense(id, updates));
    } else {
      // Add mode
      dispatch(addExpense(newExpense));
    }

    Alert.alert("Success", `Expense ${expense ? "updated" : "added"} successfully`);
    onClose?.();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Expense title"
      />

      <Text style={styles.label}>Amount</Text>
      <TextInput
        style={styles.input}
        value={amount}
        onChangeText={setAmount}
        placeholder="0.00"
        keyboardType="decimal-pad"
      />

      <Text style={styles.label}>Date</Text>
      <TextInput
        style={styles.input}
        value={date}
        onChangeText={setDate}
        placeholder="YYYY-MM-DD"
      />

      <Text style={styles.label}>Category</Text>
      <TextInput
        style={styles.input}
        value={category}
        onChangeText={setCategory}
        placeholder="Category name"
      />

      <Text style={styles.label}>Description (optional)</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={description}
        onChangeText={setDescription}
        placeholder="Add a note"
        multiline
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>{expense ? "Update Expense" : "Add Expense"}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  label: { fontSize: 14, fontWeight: "600", marginBottom: 6, color: "#000" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  textArea: { height: 80 },
  saveButton: {
    backgroundColor: "#3b82f6",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  saveButtonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});

export default ExpenseForm;
