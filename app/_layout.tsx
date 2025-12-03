// app/_layout.tsx
import { RootState, store } from "@/redux/store";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider, useSelector } from "react-redux";
import TabsLayout from "./(tabs)/_layout"; // your tabs layout
import LoginScreen from "./login";

function RootContent() {
  const user = useSelector((state: RootState) => state.user.user);

  if (user) {
    return <TabsLayout />; // show tabs if logged in
  }

  return <LoginScreen />; // otherwise show login
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <RootContent />
      </SafeAreaProvider>
    </Provider>
  );
}
