// app/_layout.tsx
import { store } from "@/redux/store";
import { Slot } from "expo-router";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <Slot />
      </SafeAreaProvider>
    </Provider>
  );
}
