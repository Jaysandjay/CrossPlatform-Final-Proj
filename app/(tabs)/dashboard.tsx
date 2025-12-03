import AdviceCard from "@/components/AdviceCard";
import BudgetCard from "@/components/BudgetCard";
import CategoryBreakdownCard from "@/components/CategoryBreakdownCard";
import QuoteCard from "@/components/QuoteCard";
import TotalExpensesCard from "@/components/TotalExpensesCard";
import React, { useState } from "react";
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";

const DashboardScreen: React.FC = () => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    setRefreshing(false);
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View style={styles.content}>
        <TotalExpensesCard />
        <BudgetCard />
        <CategoryBreakdownCard />
        <QuoteCard />
        <AdviceCard />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F2F2F7" },
  content: { padding: 15 },
});

export default DashboardScreen;
