// components/ExpenseItem.tsx
import type { Category } from "@/types/Category";
import type { Expense } from "@/types/Expense";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ExpenseItemProps {
  expense?: Expense;
  category?: Category;
  onEdit?: (expense: Expense) => void;
  onDelete?: (id: string) => void;
  isEmpty?: boolean;
}

const ExpenseItem: React.FC<ExpenseItemProps> = ({
  expense,
  category,
  onEdit,
  onDelete,
  isEmpty = false,
}) => {
  if (isEmpty) {
    return (
      <View style={styles.emptyState}>
        <MaterialIcons name="receipt-long" size={64} color="#B0B0B0" />
        <Text style={styles.emptyText}>No expenses yet</Text>
        <Text style={styles.emptySubtext}>
          Tap the + button to add your first expense
        </Text>
      </View>
    );
  }

  if (!expense || !category) return null;

  return (
    <View style={styles.expenseItem}>
      <View style={styles.expenseContent}>
        {/* Category Icon */}
        <View style={[styles.categoryIcon, { backgroundColor: category.color }]}>
          <MaterialIcons name={(category.icon || "category")as keyof typeof MaterialIcons.glyphMap} size={24} color="#fff" />
        </View>

        {/* Expense Details */}
        <View style={styles.expenseDetails}>
          <Text style={styles.categoryName}>{category.name}</Text>
          <Text style={styles.description}>{expense.description || "No description"}</Text>
          <Text style={styles.date}>{new Date(expense.date).toLocaleDateString()}</Text>
        </View>

        {/* Amount */}
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>{expense.amount.toFixed(2)}</Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actions}>
        {onEdit && (
          <TouchableOpacity style={styles.actionButton} onPress={() => onEdit(expense)}>
            <MaterialIcons name="edit" size={20} color="#007AFF" />
          </TouchableOpacity>
        )}
        {onDelete && (
          <TouchableOpacity style={styles.actionButton} onPress={() => onDelete(expense.id)}>
            <MaterialIcons name="delete" size={20} color="#FF3B30" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  expenseItem: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  expenseContent: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  expenseDetails: { flex: 1 },
  categoryName: { fontSize: 16, fontWeight: "600", marginBottom: 4 },
  description: { fontSize: 14, color: "#666", marginBottom: 2 },
  date: { fontSize: 12, color: "#999" },
  amountContainer: { alignItems: "flex-end" },
  amount: { fontSize: 18, fontWeight: "bold", color: "#007AFF" },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    paddingTop: 10,
  },
  actionButton: { padding: 8, marginLeft: 12 },

  // Empty state
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyText: { fontSize: 18, fontWeight: "600", color: "#666", marginTop: 16 },
  emptySubtext: { fontSize: 14, color: "#999", marginTop: 8, textAlign: "center" },
});

export default ExpenseItem;
