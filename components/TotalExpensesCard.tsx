import type { RootState } from "@/redux/store";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
const TotalExpensesCard: React.FC = () => {
  const expenses = useSelector((state: RootState) => state.expenses);
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Total Expenses</Text>
      <Text style={styles.totalAmount}>${totalExpenses.toFixed(2)}</Text>
      <Text style={styles.cardSubtitle}>This Month</Text>
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
  cardSubtitle: { fontSize: 14, color: "#666", marginTop: 5 },
  totalAmount: { fontSize: 36, fontWeight: "bold", color: "#007AFF", marginVertical: 8 },
});

export default TotalExpensesCard
