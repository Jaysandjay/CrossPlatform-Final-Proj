import { addExpense, updateExpense } from "@/redux/actions/expenseActions";
import type { AppDispatch } from "@/redux/store";
import { Category, DEFAULT_CATEGORIES } from "@/types/Category";
import type { Expense } from "@/types/Expense";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useDispatch } from "react-redux";

interface ExpenseFormProps {
  expense?: Expense;
  onClose: () => void;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ expense, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [title, setTitle] = useState(expense?.title || "");
  const [amount, setAmount] = useState(expense?.amount.toString() || "");
  const [date, setDate] = useState(expense?.date || "");
  const [category, setCategory] = useState<Category>(
    expense?.category || DEFAULT_CATEGORIES.find((c) => c.isDefault) || DEFAULT_CATEGORIES[0]
  );
  const [description, setDescription] = useState(expense?.description || "");
  const [categoryOpen, setCategoryOpen] = useState(false);

  const handleSave = () => {
    console.log("Saved")
    if (!title.trim() || !amount.trim() || !date.trim() || !category) {
      Alert.alert("Validation Error", "Please fill in all required fields");
      return;
    }

    const newExpense: Expense = {
      id: expense?.id || Date.now().toString(),
      title: title.trim(),
      amount: parseFloat(amount),
      date,
      category,
      description: description.trim(),
    };

    if (expense) {
      const { id, ...updates } = newExpense;
      dispatch(updateExpense(id, updates));
    } else {
      dispatch(addExpense(newExpense));
    }

    onClose();
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
      <TouchableOpacity
        style={styles.input}
        onPress={() => setCategoryOpen(!categoryOpen)}
      >
        <Text>{category.name}</Text>
      </TouchableOpacity>

      {categoryOpen &&
        DEFAULT_CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            style={styles.categoryItem}
            onPress={() => {
              setCategory(cat);
              setCategoryOpen(false);
            }}
          >
            <Text>{cat.name}</Text>
          </TouchableOpacity>
        ))}

      <Text style={styles.label}>Description (optional)</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={description}
        onChangeText={setDescription}
        placeholder="Add a note"
        multiline
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>
          {expense ? "Update Expense" : "Add Expense"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  label: { fontSize: 14, fontWeight: "600", marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  textArea: { height: 80 },
  saveButton: {
    backgroundColor: "#3b82f6",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  saveButtonText: { color: "#fff", fontWeight: "600" },
  categoryItem: {
    padding: 12,
    backgroundColor: "#eee",
    marginBottom: 4,
    borderRadius: 6,
  },
});

export default ExpenseForm;
