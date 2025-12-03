// components/SettingSwitchRow.tsx
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";

interface SettingSwitchRowProps {
  icon: keyof typeof MaterialIcons.glyphMap; // Type for MaterialIcons name
  label: string;
  value?: boolean; // optional if it's just a navigation row
  onToggle?: (val: boolean) => void;
  onPress?: () => void; // for navigation rows without switch
}

const SettingSwitchRow: React.FC<SettingSwitchRowProps> = ({
  icon,
  label,
  value = false,
  onToggle,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={onPress ? 0.6 : 1}
      style={styles.row}
    >
      <View style={styles.left}>
        <MaterialIcons name={icon} size={20} color="#000" />
        <Text style={styles.label}>{label}</Text>
      </View>
      {typeof onToggle === "function" && (
        <Switch
          value={value}
          onValueChange={onToggle}
          trackColor={{ false: "#d1d5db", true: "#3b82f6" }}
          thumbColor={value ? "#2563eb" : "#f3f4f6"}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12, // spacing between icon and label
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
  },
});

export default SettingSwitchRow;
