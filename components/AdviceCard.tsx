import type { RootState } from "@/redux/store";
import { fetchRandomAdvice } from "@/services/adviceService";
import type { Advice } from "@/types/Advice";
import { MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";

const AdviceCard: React.FC = () => {
	const showAdvice = useSelector((state: RootState) => state.settings.showAdvice);
	const [isLoading, setIsLoading] = useState(false);
	const [hasError, setHasError] = useState(false);
	const [advice, setAdvice] = useState<Advice | null>(null);

	const fetchAdvice = async () => {
		setIsLoading(true);
		setHasError(false);
		try {
			const newAdvice = await fetchRandomAdvice();
			setAdvice(newAdvice);
		} catch (error) {
			console.error("Error fetching advice:", error);
			setHasError(true);
		} finally {
			setIsLoading(false);
		}
	};

	// FETCH ADVICE WHENEVER THE PARENT SCREEN IS FOCUSED
	useFocusEffect(
		useCallback(() => {
			if (showAdvice) {
				fetchAdvice();
			}
		}, [showAdvice])
	);

	// DON'T SHOW THE CARD IF SETTING IS OFF OR IF THERE'S AN ERROR
	if (!showAdvice || hasError) return null;

	return (
		<View style={styles.card}>
			<View style={styles.header}>
				<MaterialIcons
					name="lightbulb"
					size={24}
					color="#F5A623"
				/>
				<Text style={styles.title}>Financial Advice</Text>
			</View>

			{isLoading && !advice ? (
				<ActivityIndicator
					size="small"
					color="#4ECDC4"
				/>
			) : advice ? (
				<>
					<Text style={styles.text}>{advice.text}</Text>
					<TouchableOpacity
						style={styles.refreshButton}
						onPress={fetchAdvice}
					></TouchableOpacity>
				</>
			) : (
				<Text style={styles.placeholder}>Loading advice...</Text>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	card: {
		backgroundColor: "#FFFFFF",
		borderRadius: 12,
		padding: 20,
		marginBottom: 15,
		shadowColor: "#000000",
		shadowOpacity: 0.1,
		shadowRadius: 4,
		shadowOffset: { width: 0, height: 2 },
		elevation: 3,
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 12,
	},
	title: {
		fontSize: 18,
		fontWeight: "600",
		marginLeft: 8,
	},
	text: {
		fontSize: 16,
		color: "#333",
		marginBottom: 12,
		lineHeight: 22,
	},
	refreshButton: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 8,
	},
	refreshText: {
		fontSize: 14,
		color: "#4ECDC4",
		marginLeft: 5,
		fontWeight: "500",
	},
	placeholder: {
		color: "#888",
		fontSize: 14,
		textAlign: "center",
		paddingVertical: 20,
	},
});

export default AdviceCard;
