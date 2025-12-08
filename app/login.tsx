// FAKE LOGIN SCREEN, REAL VALIDATION, NO ACTUAL DATA MATCHING
import { loginUser } from "@/redux/actions/userActions";
import type { AppDispatch, RootState } from "@/redux/store";
import { globalStyles } from "@/styles/globalStyles";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, Button, Platform, Text, TextInput, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

// Cross-platform alert function
const showAlert = (title: string, message: string) => {
	if (Platform.OS === "web") {
		// Use browser alert for web
		window.alert(`${title}\n\n${message}`);
	} else {
		// Use native Alert for mobile
		Alert.alert(title, message, [{ text: "OK" }]);
	}
};

export default function LoginScreen() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const dispatch = useDispatch<AppDispatch>();
	const router = useRouter();
	const user = useSelector((state: RootState) => state.user.user);

	useEffect(() => {
		console.log("👤 User state changed:", user ? "Logged in" : "Not logged in");
		if (user) {
			console.log("Redirecting to dashboard...");
			router.replace("/(tabs)/dashboard"); // redirect if already logged in
		}
	}, [user]);

	const validateEmail = (email: string): boolean => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	const handleLogin = () => {
		console.log("Login button clicked!");
		console.log("Form values:", { email, password: "***" });

		// Validate email
		if (!email || email.trim().length === 0) {
			console.log("Validation failed: Email required");
			showAlert("Email Required", "Please enter your email address to continue.");
			return;
		}

		if (!validateEmail(email.trim())) {
			console.log("Validation failed: Invalid email format");
			showAlert("Invalid Email", "Please enter a valid email address (e.g., example@email.com).");
			return;
		}

		// Validate password
		if (!password || password.length === 0) {
			console.log("Validation failed: Password required");
			showAlert("Password Required", "Please enter your password to continue.");
			return;
		}

		if (password.length < 6) {
			console.log("Validation failed: Password too short");
			showAlert("Password Too Short", "Password must be at least 6 characters long for security.");
			return;
		}

		// All validations passed
		console.log("All validations passed! Dispatching loginUser...");
		dispatch(loginUser({ email: email.trim() }));
		console.log("loginUser dispatched successfully");
	};

	return (
		<View style={globalStyles.containerCentered}>
			{/* App Title */}
			<Text style={globalStyles.title}>SmartSpend App</Text>
			<Text style={globalStyles.subtitle}>If you're going to Spend it - SmartSpend it!</Text>

			<TextInput
				placeholder="Email Address"
				value={email}
				onChangeText={setEmail}
				style={globalStyles.inputGray}
				keyboardType="email-address"
				autoCapitalize="none"
				autoCorrect={false}
				autoComplete="email"
			/>
			<TextInput
				placeholder="Password (min. 6 characters)"
				value={password}
				onChangeText={setPassword}
				style={globalStyles.inputGray}
				secureTextEntry
				autoCapitalize="none"
				autoCorrect={false}
				autoComplete="password"
			/>
			<View style={{ marginTop: 10 }}>
				<Button
					title="Log In"
					onPress={handleLogin}
					color="#007AFF"
				/>
			</View>
		</View>
	);
}
