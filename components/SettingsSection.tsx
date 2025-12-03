import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface Props {
  title: string;
  children: React.ReactNode;
}

const SettingsSection: React.FC<Props> = ({ title, children }) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
  },
});

export default SettingsSection;
