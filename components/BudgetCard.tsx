import type { RootState } from "@/redux/store";
import { globalStyles } from "@/styles/globalStyles";
import { formatCurrency } from "@/utils/currencyUtils";
import React from "react";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";

const BudgetCard: React.FC = () => {
  const totalExpenses = useSelector((state: RootState) =>
    state.expenses.reduce((sum, exp) => sum + exp.amount, 0)
  );
  const budget = useSelector((state: RootState) => state.settings.budget);
  const currency = useSelector((state: RootState) => state.settings.currency) || 'CAD';
  const exchangeRates = useSelector((state: RootState) => state.settings.exchangeRates);

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
    <View style={globalStyles.cardWithShadow}>
      <Text style={globalStyles.cardTitle}>Budget Progress</Text>
      <View style={globalStyles.progressContainer}>
        <View style={globalStyles.progressBarBackground}>
          <View
            style={[
              globalStyles.progressBarFill,
              { width: `${Math.min(budgetProgress, 100)}%`, backgroundColor: getBudgetStatusColor() },
            ]}
          />
        </View>
        <View style={globalStyles.budgetInfo}>
          <Text style={globalStyles.budgetText}>
            {formatCurrency(totalExpenses, currency, exchangeRates?.rates)} of {formatCurrency(budget, currency, exchangeRates?.rates)}
          </Text>
          <Text style={[globalStyles.budgetPercentage, { color: getBudgetStatusColor() }]}>
            {budgetProgress.toFixed(0)}%
          </Text>
        </View>
        <Text style={[globalStyles.budgetStatus, { color: getBudgetStatusColor() }]}>{getBudgetStatusText()}</Text>
        <Text style={globalStyles.budgetRemaining}>
          {formatCurrency(Math.max(budgetRemaining, 0), currency, exchangeRates?.rates)} remaining
        </Text>
      </View>
    </View>
  );
};

export default BudgetCard;
