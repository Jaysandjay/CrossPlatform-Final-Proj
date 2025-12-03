import type { RootState } from "@/redux/store";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

const BudgetCard: React.FC = () => {
  const totalExpenses = useSelector((state: RootState) =>
    state.expenses.reduce((sum, exp) => sum + exp.amount, 0)
  );
  const budget = useSelector((state: RootState) => state.settings.budget);

  const budgetProgress = (totalExpenses / budget) * 100;
  const budgetRemaining = budget - totalExpenses;

  const getBudgetStatusColor = () => {
    if (budgetProgress >= 100) return "#FF3B30"; // exceeded
    if (budgetProgress >= 90) return "#FF9500"; // caution
    if (budgetProgress >= 75) return "#FFCC00"; // warning
    return "#34C759"; // good
  };

  const getBudgetStatusText = () => {
    if (budgetProgress >= 100) return "Budget exceeded!";
    if (budgetProgress >= 90) return "Approaching limit";
    if (budgetProgress >= 75) return "On track";
    return "Well within budget";
  };

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Budget Progress</Text>
      <View style={styles.progressContainer}>
        <View style={styles.progressBarBackground}>
          <View
            style={[
              styles.progressBarFill,
              { width: `${Math.min(budgetProgress, 100)}%`, backgroundColor: getBudgetStatusColor() },
            ]}
          />
        </View>
        <View style={styles.budgetInfo}>
          <Text style={styles.budgetText}>
            ${totalExpenses.toFixed(2)} of ${budget.toFixed(2)}
          </Text>
          <Text style={[styles.budgetPercentage, { color: getBudgetStatusColor() }]}>
            {budgetProgress.toFixed(0)}%
          </Text>
        </View>
        <Text style={[styles.budgetStatus, { color: getBudgetStatusColor() }]}>{getBudgetStatusText()}</Text>
        <Text style={styles.budgetRemaining}>${Math.max(budgetRemaining, 0).toFixed(2)} remaining</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: { fontSize: 18, fontWeight: "600", marginBottom: 12, color: "#333" },
  progressContainer: { marginTop: 10 },
  progressBarBackground: { height: 24, backgroundColor: "#eee", borderRadius: 12, overflow: "hidden", marginBottom: 10 },
  progressBarFill: { height: "100%", borderRadius: 12 },
  budgetInfo: { flexDirection: "row", justifyContent: "space-between", marginBottom: 5 },
  budgetText: { fontSize: 14, color: "#333" },
  budgetPercentage: { fontSize: 16, fontWeight: "600" },
  budgetStatus: { fontSize: 14, fontWeight: "600", marginBottom: 5 },
  budgetRemaining: { fontSize: 12, color: "#666" },
});

export default BudgetCard;
