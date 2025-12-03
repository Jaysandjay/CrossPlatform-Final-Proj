import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface AlertBannerProps {
  budgetProgress: number;
  totalExpenses: number;
  budget: number;
}

export const AlertBanner: React.FC<AlertBannerProps> = ({ budgetProgress, totalExpenses, budget }) => {
  const backgroundColor =
    budgetProgress >= 100 ? "#FF6B6B" : "#FDD835"; // red or yellow

  return (
    <View style={[styles.banner, { backgroundColor }]}>
      <MaterialIcons
        name={budgetProgress >= 100 ? "error" : "warning"}
        size={20}
        color="#FFFFFF"
      />
      <Text style={styles.text}>
        {budgetProgress >= 100
          ? `Budget exceeded by $${(totalExpenses - budget).toFixed(2)}!`
          : `${(100 - budgetProgress).toFixed(0)}% of budget remaining`}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  text: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 8,
    flex: 1,
  },
});
