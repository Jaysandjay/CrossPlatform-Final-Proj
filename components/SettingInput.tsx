import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

interface Props {
  label: string;
  hint?: string;
  value: string;
  onChangeText: (val: string) => void;
  keyboardType?: "default" | "decimal-pad" | "numeric";
}

const SettingInput: React.FC<Props> = ({
  label,
  hint,
  value,
  onChangeText,
  keyboardType = "default",
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
      />

      {hint && <Text style={styles.hint}>{hint}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 15 },
  label: { fontSize: 14, fontWeight: "600", marginBottom: 8 },
  hint: { fontSize: 12, color: "#777" },
  input: {
    height: 44,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: "#f7f7f7",
  },
});

export default SettingInput;
