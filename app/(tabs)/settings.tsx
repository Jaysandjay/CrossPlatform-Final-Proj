import SettingsButton from "@/components/SettingsButton";
import SettingsSection from "@/components/SettingsSection";
import SettingSwitchRow from "@/components/SettingsSwitchRow";
import { toggleShowAdvice, toggleShowQuote } from "@/redux/actions/inspirationActions";
import { setBudget } from "@/redux/actions/settingsActions";
import { logoutUser } from "@/redux/actions/userActions";
import { RESET_SETTINGS } from "@/redux/actionTypes/settingsTypes";
import type { AppDispatch, RootState } from "@/redux/store";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet, TextInput } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function SettingsScreen() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const settings = useSelector((state: RootState) => state.settings);
  const showQuote = settings.showQuotes;
  const showAdvice = settings.showAdvice;

  const [budgetInput, setBudgetInput] = useState(String(settings.budget));

  const handleLogout = () => {
    dispatch(logoutUser());
    router.replace("/login"); // go back to login, no tabs
  };

  const handleSaveBudget = () => {
    const parsed = parseFloat(budgetInput);
    if (isNaN(parsed) || parsed <= 0) {
      Alert.alert("Invalid Budget", "Please enter a number greater than 0");
      return;
    }
    dispatch(setBudget(parsed));
    Alert.alert("Success", "Budget updated successfully");
  };

  const handleResetSettings = () => {
    dispatch({ type: RESET_SETTINGS });
    setBudgetInput(String(1000)); // reset local input
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      {/* Budget Section */}
      <SettingsSection title="Budget">
        <TextInput
          style={styles.input}
          placeholder={`${settings.budget}`}
          value={budgetInput}
          keyboardType="numeric"
          onChangeText={setBudgetInput}
        />
        <SettingsButton label="Save Budget" onPress={handleSaveBudget} color="blue" />
      </SettingsSection>

      {/* Inspiration Display Section */}
      <SettingsSection title="Inspiration Display">
        <SettingSwitchRow
          icon="format-quote"
          label="Show Inspiration Quote"
          value={showQuote}
          onToggle={() => dispatch(toggleShowQuote())}
        />
        <SettingSwitchRow
          icon="lightbulb"
          label="Show Daily Advice"
          value={showAdvice}
          onToggle={() => dispatch(toggleShowAdvice())}
        />
      </SettingsSection>

      {/* Reset & Logout Buttons */}
      <SettingsButton label="Reset Settings" onPress={handleResetSettings} color="blue" />
      <SettingsButton label="Log Out" onPress={handleLogout} color="red" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "gray",
    padding: 20,
    paddingBottom: 40,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
  },
});
