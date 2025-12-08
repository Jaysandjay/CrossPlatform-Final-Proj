import { MaterialIcons } from "@expo/vector-icons";
import React, { Component, ErrorInfo, ReactNode } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props {
	children: ReactNode;
	fallback?: ReactNode;
}

interface State {
	hasError: boolean;
	error: Error | null;
	errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			hasError: false,
			error: null,
			errorInfo: null,
		};
	}

	static getDerivedStateFromError(error: Error): State {
		// Update state so the next render will show the fallback UI
		return {
			hasError: true,
			error,
			errorInfo: null,
		};
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		// Log the error details
		console.error("ErrorBoundary caught an error:");
		console.error("Error:", error);
		console.error("Error message:", error.message);
		console.error("Error stack:", error.stack);
		console.error("Component stack:", errorInfo.componentStack);

		// Check if it's the text rendering error we're looking for
		if (error.message && error.message.includes("strings")) {
			console.error("TEXT RENDERING ERROR DETECTED!");
			console.error("Component stack trace:", errorInfo.componentStack);
		}

		this.setState({
			error,
			errorInfo,
		});
	}

	handleReset = () => {
		this.setState({
			hasError: false,
			error: null,
			errorInfo: null,
		});
	};

	render() {
		if (this.state.hasError) {
			// Custom fallback UI
			if (this.props.fallback) {
				return this.props.fallback;
			}

			// Default error UI
			return (
				<View style={styles.container}>
					<View style={styles.errorCard}>
						<MaterialIcons
							name="error-outline"
							size={64}
							color="#FF3B30"
						/>
						<Text style={styles.title}>Something went wrong</Text>
						<Text style={styles.message}>{this.state.error?.message || "An unexpected error occurred"}</Text>

						{__DEV__ && this.state.errorInfo && (
							<ScrollView style={styles.debugContainer}>
								<Text style={styles.debugTitle}>Debug Information:</Text>
								<Text style={styles.debugText}>{this.state.errorInfo.componentStack}</Text>
							</ScrollView>
						)}

						<TouchableOpacity
							style={styles.button}
							onPress={this.handleReset}
						>
							<Text style={styles.buttonText}>Try Again</Text>
						</TouchableOpacity>
					</View>
				</View>
			);
		}

		return this.props.children;
	}
}

// THESE STYLES ARE EXCLUSIVELY FOR ERROR BOUNDARY
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#f5f5f5",
		padding: 20,
	},
	errorCard: {
		backgroundColor: "#fff",
		borderRadius: 12,
		padding: 24,
		alignItems: "center",
		maxWidth: 400,
		width: "100%",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	title: {
		fontSize: 20,
		fontWeight: "600",
		marginTop: 16,
		marginBottom: 8,
		color: "#333",
	},
	message: {
		fontSize: 14,
		color: "#666",
		textAlign: "center",
		marginBottom: 16,
	},
	debugContainer: {
		width: "100%",
		maxHeight: 200,
		backgroundColor: "#f9f9f9",
		borderRadius: 8,
		padding: 12,
		marginBottom: 16,
	},
	debugTitle: {
		fontSize: 12,
		fontWeight: "600",
		color: "#333",
		marginBottom: 8,
	},
	debugText: {
		fontSize: 10,
		color: "#666",
		fontFamily: "monospace",
	},
	button: {
		backgroundColor: "#007AFF",
		paddingHorizontal: 24,
		paddingVertical: 12,
		borderRadius: 8,
	},
	buttonText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "600",
	},
});

export default ErrorBoundary;
