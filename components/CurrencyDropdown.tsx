import React, { useState } from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { SUPPORTED_CURRENCIES } from "@/types/Currency";
import type { Currency } from "@/types/Currency";
import { globalStyles } from "@/styles/globalStyles";

interface CurrencyDropdownProps {
  selectedCurrency: string;
  onSelect: (currencyCode: string) => void;
}

const CurrencyDropdown: React.FC<CurrencyDropdownProps> = ({
  selectedCurrency = 'CAD',  // Default parameter for safety
  onSelect
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const selected = SUPPORTED_CURRENCIES.find(c => c.code === selectedCurrency)
    || SUPPORTED_CURRENCIES[0];

  return (
    <View>
      <TouchableOpacity
        style={globalStyles.input}
        onPress={() => setIsOpen(!isOpen)}
      >
        <View style={styles.selectedRow}>
          <Text style={styles.selectedText}>
            {selected.symbol} {selected.name} ({selected.code})
          </Text>
          <MaterialIcons
            name={isOpen ? "keyboard-arrow-up" : "keyboard-arrow-down"}
            size={24}
            color="#666"
          />
        </View>
      </TouchableOpacity>

      {isOpen && (
        <View style={styles.dropdown}>
          {SUPPORTED_CURRENCIES.map((currency) => (
            <TouchableOpacity
              key={currency.code}
              style={[
                globalStyles.categoryItem,
                currency.code === selectedCurrency && styles.selectedItem
              ]}
              onPress={() => {
                onSelect(currency.code);
                setIsOpen(false);
              }}
            >
              <Text style={styles.currencyText}>
                {currency.symbol} {currency.name} ({currency.code})
              </Text>
              {currency.code === selectedCurrency && (
                <MaterialIcons name="check" size={20} color="#007AFF" />
              )}
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  selectedRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectedText: {
    fontSize: 16,
  },
  dropdown: {
    marginTop: 5,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  selectedItem: {
    backgroundColor: "#f0f8ff",
  },
  currencyText: {
    fontSize: 16,
    flex: 1,
  },
});

export default CurrencyDropdown;
