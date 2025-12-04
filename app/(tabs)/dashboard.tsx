import BudgetCard from "@/components/BudgetCard";
import CategoryBreakdownCard from "@/components/CategoryBreakdownCard";
import QuoteCard from "@/components/QuoteCard";
import TotalExpensesCard from "@/components/TotalExpensesCard";
import React, { useState } from "react";
import { RefreshControl, ScrollView, View } from "react-native";
import { globalStyles } from "@/styles/globalStyles";

const DashboardScreen: React.FC = () => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    setRefreshing(false);
  };

  return (
    <ScrollView
      style={globalStyles.containerGray}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View style={globalStyles.listContent}>
        <TotalExpensesCard />
        <BudgetCard />
        <CategoryBreakdownCard />
        <QuoteCard />
      </View>
    </ScrollView>
  );
};

export default DashboardScreen;
