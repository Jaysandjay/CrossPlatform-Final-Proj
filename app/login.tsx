// FAKE LOGIN SCREEN, REAL VALIDATION, NO ACTUAL DATA MATCHING
import { loginUser } from "@/redux/actions/userActions";
import type { AppDispatch, RootState } from "@/redux/store";
import { globalStyles } from "@/styles/globalStyles";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, Button, Text, TextInput, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function LoginScreen() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const dispatch = useDispatch<AppDispatch>();
	const router = useRouter();
	const user = useSelector((state: RootState) => state.user.user);

	useEffect(() => {
		if (user) router.replace("/(tabs)/dashboard"); // redirect if already logged in
	}, [user]);

	const validateEmail = (email: string): boolean => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	const handleLogin = () => {
		// Validate name
		if (!name || name.trim().length === 0) {
			Alert.alert("Name Required", "Please enter your name to continue.", [{ text: "OK" }]);
			return;
		}

		if (name.trim().length < 2) {
			Alert.alert("Invalid Name", "Please enter a valid name (at least 2 characters).", [{ text: "OK" }]);
			return;
		}

		// Validate email
		if (!email || email.trim().length === 0) {
			Alert.alert("Email Required", "Please enter your email address to continue.", [{ text: "OK" }]);
			return;
		}

		if (!validateEmail(email.trim())) {
			Alert.alert("Invalid Email", "Please enter a valid email address (e.g., example@email.com).", [{ text: "OK" }]);
			return;
		}

		// Validate password
		if (!password || password.length === 0) {
			Alert.alert("Password Required", "Please enter your password to continue.", [{ text: "OK" }]);
			return;
		}

		if (password.length < 6) {
			Alert.alert("Password Too Short", "Password must be at least 6 characters long for security.", [{ text: "OK" }]);
			return;
		}

		// All validations passed
		dispatch(loginUser({ name: name.trim(), email: email.trim() }));
	};

	return (
		<View style={globalStyles.containerCentered}>
			{/* App Title */}
			<Text style={globalStyles.title}>SmartSpend</Text>

			<TextInput
				placeholder="Full Name"
				value={name}
				onChangeText={setName}
				style={globalStyles.inputGray}
				autoCapitalize="words"
				autoCorrect={false}
			/>
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
