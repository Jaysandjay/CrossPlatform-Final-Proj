import type { RootState } from "@/redux/store";
import { globalStyles } from "@/styles/globalStyles";
import React from "react";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";

const TotalExpensesCard: React.FC = () => {
  const expenses = useSelector((state: RootState) => state.expenses);
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <View style={globalStyles.cardWithShadow}>
      <Text style={globalStyles.cardTitle}>Total Expenses</Text>
      <Text style={globalStyles.amountLarge}>${totalExpenses.toFixed(2)}</Text>
      <Text style={globalStyles.cardSubtitle}>This Month</Text>
    </View>
  );
};

export default TotalExpensesCard;
