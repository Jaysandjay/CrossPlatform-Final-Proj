// app/(tabs)/_layout.tsx
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

export default function TabsLayout() {
	return (
		<Tabs
			screenOptions={{
				headerShown: true,
				tabBarActiveTintColor: "#007AFF",
				tabBarInactiveTintColor: "#8e8e93",
			}}
		>
			<Tabs.Screen
				name="dashboard"
				options={{
					title: "Dashboard",
					tabBarIcon: ({ color, size }) => (
						<Ionicons
							name="home"
							color={color}
							size={size}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="expenses"
				options={{
					title: "Expenses",
					tabBarIcon: ({ color, size }) => (
						<Ionicons
							name="wallet"
							color={color}
							size={size}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="settings"
				options={{
					title: "Settings",
					tabBarIcon: ({ color, size }) => (
						<Ionicons
							name="settings"
							color={color}
							size={size}
						/>
					),
				}}
			/>
		</Tabs>
	);
}
