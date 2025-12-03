/**
 * Fake Login Screen
 *
 * TEAM MEMBER: Lana (UI Design & Navigation)
 *
 * TODO: Implement login screen UI
 * - Style the input fields and buttons
 * - Add proper keyboard handling
 * - Implement form validation
 * - Add loading state during login
 */

import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
// import { useDispatch } from "react-redux";
// import { loginUser } from "../store/actions/userActions";
import { router } from "expo-router";


const LoginScreen = () => {
	//const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	/**
	 * TODO: Implement login handler
	 *
	 * TEAM MEMBER: Jasmine (Redux & State Management)
	 *
	 * 1. Validate email and password
	 * 2. Dispatch loginUser action
	 * 3. Navigate to Main screen on success
	 * 4. Show error message on failure
	 */
	const handleLogin = () => {
		// TODO: Add validation
		if (!email || !password) {
			alert("Please enter both email and password");
			return;
		}

		// TODO: Dispatch login action
		// dispatch(loginUser(email, password));

		// TODO: Navigate to Main screen
		router.push("/(tabs)/dashboard")
	};

	return (
		<KeyboardAvoidingView
			style={styles.container}
			behavior={Platform.OS === "ios" ? "padding" : "height"}
		>
			<View style={styles.content}>
				{/* TODO: Add app logo here */}
				<Text style={styles.title}>SmartSpend App</Text>
				<Text style={styles.subtitle}>If you're going to Spend it - SmartSpend it!</Text>

				{/* Email Input */}
				<TextInput
					style={styles.input}
					placeholder="Email or Username"
					value={email}
					onChangeText={setEmail}
					keyboardType="email-address"
					autoCapitalize="none"
					autoCorrect={false}
				/>

				{/* Password Input */}
				<TextInput
					style={styles.input}
					placeholder="Password"
					value={password}
					onChangeText={setPassword}
					secureTextEntry
					autoCapitalize="none"
				/>

				{/* Login Button */}
				<TouchableOpacity
					style={styles.button}
					onPress={handleLogin}
				>
					<Text style={styles.buttonText}>Login</Text>
				</TouchableOpacity>

				{/* TODO: Implement these links */}
				<TouchableOpacity onPress={() => alert("Forgot Password - To be implemented")}>
					<Text style={styles.link}>Forgot Password?</Text>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => alert("Sign Up - To be implemented")}>
					<Text style={styles.link}>Sign Up</Text>
				</TouchableOpacity>
			</View>
		</KeyboardAvoidingView>
	);
};

/**
 * TODO: Customize styles
 *
 * TEAM MEMBER: Lana (UI Design & Navigation)
 *
 * Feel free to adjust colors, spacing, and styling to match your design
 */
const styles = StyleSheet.create({
	container: {
		flex: 1,
		// backgroundColor: COLORS.background,
	},
	content: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
	},
	title: {
		fontSize: 32,
		fontWeight: "bold",
		// color: COLORS.primary,
		marginBottom: 8,
	},
	subtitle: {
		fontSize: 16,
		// color: COLORS.textSecondary,
		marginBottom: 40,
	},
	input: {
		width: "100%",
		height: 50,
		borderWidth: 1,
		// borderColor: COLORS.border,
		borderRadius: 8,
		paddingHorizontal: 15,
		marginBottom: 15,
		fontSize: 16,
        //backgroundColor: COLORS.white,
	},
	button: {
		width: "100%",
		height: 50,
		//backgroundColor: COLORS.primary,
		borderRadius: 8,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 10,
	},
	buttonText: {
		//color: COLORS.white,
		fontSize: 18,
		fontWeight: "bold",
	},
	link: {
		marginTop: 15,
		//color: COLORS.primary,
		fontSize: 14,
	},
});

export default LoginScreen;
