import ErrorBoundary from "@/components/ErrorBoundary";
import { store } from "@/redux/store";
import { Slot } from "expo-router";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";

export default function RootLayout() {
	return (
		<ErrorBoundary>
			<Provider store={store}>
				<SafeAreaProvider>
					<Slot />
				</SafeAreaProvider>
			</Provider>
		</ErrorBoundary>
	);
}
