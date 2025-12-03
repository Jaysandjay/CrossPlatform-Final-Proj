// components/SettingsRow.tsx

import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface SettingsRowProps {
  icon: string;
  label: string;
  onPress?: () => void;
}

export default function SettingsRow({ icon, label, onPress }: SettingsRowProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center p-4 bg-white rounded-xl border border-gray-200"
    >
      {/* Icon */}
      <View className="w-10 h-10 bg-blue-500 rounded-full justify-center items-center mr-4">
        <MaterialIcons name={icon as any} size={22} color="#fff" />
      </View>

      {/* Label */}
      <Text className="text-base font-semibold text-gray-800">
        {label}
      </Text>
    </TouchableOpacity>
  );
}
