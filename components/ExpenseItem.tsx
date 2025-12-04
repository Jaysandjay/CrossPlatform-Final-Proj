// components/ExpenseItem.tsx
import { globalStyles } from "@/styles/globalStyles";
import type { Category } from "@/types/Category";
import type { Expense } from "@/types/Expense";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface ExpenseItemProps {
  expense?: Expense;
  category?: Category;
  onEdit?: (expense: Expense) => void;
  onDelete?: (id: string) => void;
  isEmpty?: boolean;
}

const ExpenseItem: React.FC<ExpenseItemProps> = ({
  expense,
  onEdit,
  onDelete,
  isEmpty = false,
}) => {
  if (isEmpty) {
    return (
      <View style={globalStyles.emptyState}>
        <MaterialIcons name="receipt-long" size={64} color="#B0B0B0" />
        <Text style={globalStyles.emptyStateText}>No expenses yet</Text>
        <Text style={globalStyles.emptyStateSubtext}>
          Tap the + button to add your first expense
        </Text>
      </View>
    );
  }

  if (!expense) return null;

  return (
    <View style={globalStyles.expenseItem}>
      <View style={globalStyles.expenseContent}>
        {/* Category Icon */}
        <View style={[globalStyles.categoryIcon, { backgroundColor: expense.category.color }]}>
          <MaterialIcons name={(expense.category.icon || "category")as keyof typeof MaterialIcons.glyphMap} size={24} color="#fff" />
        </View>

        {/* Expense Details */}
        <View style={globalStyles.expenseDetails}>
          <Text style={globalStyles.categoryName}>{expense.category.name}</Text>
          <Text style={globalStyles.description}>{expense.description || "No description"}</Text>
          <Text style={globalStyles.date}>{expense.date.toLocaleDateString()}</Text>
        </View>

        {/* Amount */}
        <View style={globalStyles.amountContainer}>
          <Text style={globalStyles.amount}>${expense.amount.toFixed(2)}</Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={globalStyles.actions}>
        {onEdit && (
          <TouchableOpacity style={globalStyles.actionButton} onPress={() => onEdit(expense)}>
            <MaterialIcons name="edit" size={20} color="#007AFF" />
          </TouchableOpacity>
        )}
        {onDelete && (
          <TouchableOpacity style={globalStyles.actionButton} onPress={() => onDelete(expense.id)}>
            <MaterialIcons name="delete" size={20} color="#FF3B30" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default ExpenseItem;
