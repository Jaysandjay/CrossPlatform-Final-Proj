// components/SettingsButton.tsx

import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface SettingsButtonProps {
  label: string;                    
  onPress: () => void;
  color: string;
}

export default function SettingsButton({ label, onPress, color }: SettingsButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, color ? { backgroundColor: color } : {}]}
    >
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 16,
  },
  label: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});
