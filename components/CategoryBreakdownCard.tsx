import type { RootState } from "@/redux/store";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

const CategoryBreakdownCard: React.FC = () => {
  const expenses = useSelector((state: RootState) => state.expenses);
  const categories = useSelector((state: RootState) => state.categories);

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  const breakdown: Record<string, number> = {};
  expenses.forEach(exp => {
    breakdown[exp.category] = (breakdown[exp.category] || 0) + exp.amount;
  });

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Category Breakdown</Text>
      {Object.keys(breakdown).length > 0 ? (
        Object.entries(breakdown)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([key, value]) => {
            const category = categories.find(c => c.id === key);
            const percentage = ((value / totalExpenses) * 100).toFixed(0);
            return (
              <View key={key} style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: category?.color || "#999" }]} />
                <View style={styles.legendInfo}>
                  <Text style={styles.legendText}>{category?.name || key}</Text>
                  <Text style={styles.legendPercentage}>{percentage}%</Text>
                </View>
                <Text style={styles.legendAmount}>${value.toFixed(2)}</Text>
              </View>
            );
          })
      ) : (
        <Text style={styles.placeholderText}>No expenses recorded yet</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: { backgroundColor: "#fff", borderRadius: 12, padding: 20, marginBottom: 15 },
  cardTitle: { fontSize: 18, fontWeight: "600", marginBottom: 12, color: "#333" },
  legendItem: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  legendColor: { width: 16, height: 16, borderRadius: 8, marginRight: 10 },
  legendInfo: { flex: 1 },
  legendText: { fontSize: 14, color: "#333" },
  legendPercentage: { fontSize: 12, color: "#666" },
  legendAmount: { fontSize: 14, fontWeight: "600", color: "#333" },
  placeholderText: { color: "#666", fontSize: 14, textAlign: "center", paddingVertical: 20 },
});

export default CategoryBreakdownCard;
