import type { RootState } from "@/redux/store";
import { fetchRandomAdvice } from "@/services/adviceService";
import { globalStyles } from "@/styles/globalStyles";
import type { Advice } from "@/types/Advice";
import { MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
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
		<View style={globalStyles.cardWithShadow}>
			<View style={globalStyles.headerRow}>
				<MaterialIcons
					name="lightbulb"
					size={24}
					color="#F5A623"
				/>
				<Text style={globalStyles.headerTitle}>Advice</Text>
			</View>

			{isLoading && !advice ? (
				<ActivityIndicator
					size="small"
					color="#4ECDC4"
				/>
			) : advice ? (
				<>
					<Text style={globalStyles.cardText}>{advice.text}</Text>
					<TouchableOpacity
						style={globalStyles.actionButton}
						onPress={fetchAdvice}
					></TouchableOpacity>
				</>
			) : (
				<Text style={globalStyles.placeholderText}>Loading advice...</Text>
			)}
		</View>
	);
};

export default AdviceCard;
