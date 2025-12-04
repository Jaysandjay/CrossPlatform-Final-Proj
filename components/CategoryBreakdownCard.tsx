import type { RootState } from "@/redux/store";
import { globalStyles } from "@/styles/globalStyles";
import React from "react";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";

const CategoryBreakdownCard: React.FC = () => {
  const expenses = useSelector((state: RootState) => state.expenses);
  const categories = useSelector((state: RootState) => state.categories);

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  const breakdown: Record<string, number> = {};
  expenses.forEach(exp => {
    breakdown[exp.category.id] = (breakdown[exp.category.id] || 0) + exp.amount;
  });

  return (
    <View style={globalStyles.cardWithShadow}>
      <Text style={globalStyles.cardTitle}>Category Breakdown</Text>
      {Object.keys(breakdown).length > 0 ? (
        Object.entries(breakdown)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([key, value]) => {
            const category = categories.find(c => c.id === key);
            const percentage = ((value / totalExpenses) * 100).toFixed(0);
            return (
              <View key={key} style={globalStyles.legendItem}>
                <View style={[globalStyles.legendColor, { backgroundColor: category?.color || "#999" }]} />
                <View style={globalStyles.legendInfo}>
                  <Text style={globalStyles.legendText}>{category?.name || key}</Text>
                  <Text style={globalStyles.legendPercentage}>{percentage}%</Text>
                </View>
                <Text style={globalStyles.legendAmount}>${value.toFixed(2)}</Text>
              </View>
            );
          })
      ) : (
        <Text style={globalStyles.placeholderText}>No expenses recorded yet</Text>
      )}
    </View>
  );
};

export default CategoryBreakdownCard;
