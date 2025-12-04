import BudgetCard from "@/components/BudgetCard";
import CategoryBreakdownCard from "@/components/CategoryBreakdownCard";
import QuoteCard from "@/components/QuoteCard";
import TotalExpensesCard from "@/components/TotalExpensesCard";
import { useAuthProtection } from "@/hooks/useAuth";
import { globalStyles } from "@/styles/globalStyles";
import React, { useState } from "react";
import { RefreshControl, ScrollView, View } from "react-native";

const DashboardScreen: React.FC = () => {
  // ALL HOOKS MUST BE CALLED BEFORE ANY CONDITIONAL RETURNS
  // Auth protection - redirect to login if not authenticated
  const { isAuthenticated } = useAuthProtection();
  const [refreshing, setRefreshing] = useState(false);

  // Define functions AFTER hooks but BEFORE early return
  const onRefresh = async () => {
    setRefreshing(true);
    setRefreshing(false);
  };

  // Early return AFTER all hooks and function definitions
  if (!isAuthenticated) return null;

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
