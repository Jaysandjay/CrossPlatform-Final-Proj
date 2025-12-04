import { addExpense, updateExpense } from "@/redux/actions/expenseActions";
import type { AppDispatch } from "@/redux/store";
import { Category, DEFAULT_CATEGORIES } from "@/types/Category";
import type { Expense } from "@/types/Expense";
import React, { useState } from "react";
import {
  Alert,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { useDispatch } from "react-redux";
import { globalStyles, webStyles } from "@/styles/globalStyles";

interface ExpenseFormProps {
  expense?: Expense;
  onClose: () => void;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ expense, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [title, setTitle] = useState(expense?.title || "");
  const [amount, setAmount] = useState(expense?.amount.toString() || "");
  const [date, setDate] = useState<Date>(expense?.date || new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [category, setCategory] = useState<Category>(
    expense?.category || DEFAULT_CATEGORIES.find((c) => c.isDefault) || DEFAULT_CATEGORIES[0]
  );
  const [description, setDescription] = useState(expense?.description || "");
  const [categoryOpen, setCategoryOpen] = useState(false);

  const handleSave = () => {
    console.log("Saved")
    if (!title.trim() || !amount.trim() || !date || isNaN(date.getTime()) || !category) {
      Alert.alert("Validation Error", "Please fill in all required fields with valid values");
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
    <ScrollView style={globalStyles.container}>
      <Text style={globalStyles.label}>Title</Text>
      <TextInput
        style={globalStyles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Expense title"
      />

      <Text style={globalStyles.label}>Amount</Text>
      <TextInput
        style={globalStyles.input}
        value={amount}
        onChangeText={setAmount}
        placeholder="0.00"
        keyboardType="decimal-pad"
      />

      <Text style={globalStyles.label}>Date</Text>
      {Platform.OS === 'web' ? (
        <input
          type="date"
          value={date.toISOString().split('T')[0]}
          max={new Date().toISOString().split('T')[0]}
          onChange={(e) => {
            const newDate = new Date(e.target.value);
            if (!isNaN(newDate.getTime())) {
              setDate(newDate);
            }
          }}
          style={webStyles.dateInput}
        />
      ) : (
        <>
          <TouchableOpacity
            style={globalStyles.input}
            onPress={() => setShowDatePicker(true)}
          >
            <Text>{date.toLocaleDateString()}</Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) {
                  setDate(selectedDate);
                }
              }}
              maximumDate={new Date()}
            />
          )}
        </>
      )}

      <Text style={globalStyles.label}>Category</Text>
      <TouchableOpacity
        style={globalStyles.input}
        onPress={() => setCategoryOpen(!categoryOpen)}
      >
        <Text>{category.name}</Text>
      </TouchableOpacity>

      {categoryOpen &&
        DEFAULT_CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            style={globalStyles.categoryItem}
            onPress={() => {
              setCategory(cat);
              setCategoryOpen(false);
            }}
          >
            <Text>{cat.name}</Text>
          </TouchableOpacity>
        ))}

      <Text style={globalStyles.label}>Description (optional)</Text>
      <TextInput
        style={[globalStyles.input, globalStyles.textArea]}
        value={description}
        onChangeText={setDescription}
        placeholder="Add a note"
        multiline
      />

      <View style={globalStyles.buttonRow}>
        <TouchableOpacity style={globalStyles.buttonCancel} onPress={onClose}>
          <Text style={globalStyles.buttonTextGray}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity style={globalStyles.buttonSave} onPress={handleSave}>
          <Text style={globalStyles.buttonTextPrimary}>
            {expense ? "Update Expense" : "Add Expense"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ExpenseForm;
