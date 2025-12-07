import SettingsButton from "@/components/SettingsButton";
import SettingsSection from "@/components/SettingsSection";
import SettingSwitchRow from "@/components/SettingsSwitchRow";
import { useAuthProtection } from "@/hooks/useAuth";
import { toggleShowAdvice, toggleShowQuote } from "@/redux/actions/inspirationActions";
import { setBudget } from "@/redux/actions/settingsActions";
import { logoutUser } from "@/redux/actions/userActions";
import { RESET_SETTINGS } from "@/redux/actionTypes/settingsTypes";
import type { AppDispatch, RootState } from "@/redux/store";
import { globalStyles } from "@/styles/globalStyles";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Platform, ScrollView, StyleSheet, TextInput } from "react-native";
import { useDispatch, useSelector } from "react-redux";

// Cross-platform alert function
const showAlert = (title: string, message: string) => {
  if (Platform.OS === 'web') {
    window.alert(`${title}\n\n${message}`);
  } else {
    Alert.alert(title, message, [{ text: "OK" }]);
  }
};

export default function SettingsScreen() {
  // ALL HOOKS MUST BE CALLED BEFORE ANY CONDITIONAL RETURNS
  // Auth protection - redirect to login if not authenticated
  const { isAuthenticated } = useAuthProtection();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const settings = useSelector((state: RootState) => state.settings);
  const showQuote = settings.showQuotes;
  const showAdvice = settings.showAdvice;

  const [budgetInput, setBudgetInput] = useState(String(settings.budget));

  // Define all functions AFTER all hooks but BEFORE early return
  const handleLogout = () => {
    dispatch(logoutUser());
    router.replace("/login"); // go back to login, no tabs
  };

  const handleSaveBudget = () => {
    const parsed = parseFloat(budgetInput);
    if (isNaN(parsed) || parsed <= 0) {
      showAlert("Invalid Budget", "Please enter a number greater than 0");
      return;
    }
    dispatch(setBudget(parsed));
    showAlert("Success", "Budget updated successfully");
  };

  const handleResetSettings = () => {
    dispatch({ type: RESET_SETTINGS });
    setBudgetInput(String(1000)); // reset local input
    showAlert(
      "Settings Reset",
      "All settings have been reset to default values:\n• Budget: $1000\n• Inspiration Quote: Enabled\n• Daily Advice: Enabled"
    );
  };

  const handleToggleQuote = () => {
    dispatch(toggleShowQuote());
    const newValue = !showQuote;
    showAlert(
      "Inspiration Quote",
      newValue ? "Inspiration quotes enabled" : "Inspiration quotes disabled"
    );
  };

  const handleToggleAdvice = () => {
    dispatch(toggleShowAdvice());
    const newValue = !showAdvice;
    showAlert(
      "Daily Advice",
      newValue ? "Daily advice enabled" : "Daily advice disabled"
    );
  };

  // Early return AFTER all hooks and function definitions
  if (!isAuthenticated) return null;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      {/* Budget Section */}
      <SettingsSection title="Budget">
        <TextInput
          style={globalStyles.input}
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
          onToggle={handleToggleQuote}
        />
        <SettingSwitchRow
          icon="lightbulb"
          label="Show Daily Advice"
          value={showAdvice}
          onToggle={handleToggleAdvice}
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
    backgroundColor: "#f0f0f0",
    padding: 20,
    paddingBottom: 40,
  },
});
