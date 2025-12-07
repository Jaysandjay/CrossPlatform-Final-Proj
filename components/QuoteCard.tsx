import type { RootState } from "@/redux/store";
import { fetchRandomQuote } from "@/services/quoteService";
import { globalStyles } from "@/styles/globalStyles";
import type { Quote } from "@/types/Quote";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

const QuoteCard: React.FC = () => {
	const showQuotes = useSelector((state: RootState) => state.settings.showQuotes);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [quote, setQuote] = useState<Quote | null>(null);

	const fetchQuote = async () => {
		if (!showQuotes) return;
		setLoading(true);
		setError(false);
		try {
			const newQuote = await fetchRandomQuote();
			setQuote(newQuote);
		} catch (err) {
			console.error("Error fetching quote:", err);
			setError(true);
		} finally {
			setLoading(false);
		}
	};

	// Fetch quote whenever the parent screen is focused
	useFocusEffect(
		useCallback(() => {
			if (showQuotes) {
				fetchQuote();
			}
		}, [showQuotes])
	);

	// Don't show the card if setting is off or if there's an error
	if (!showQuotes || error) return null;

	return (
		<View style={globalStyles.cardWithShadow}>
			<Text style={globalStyles.cardTitle}>Inspiration</Text>
			{loading && !quote ? (
				<ActivityIndicator size="small" />
			) : quote ? (
				<>
					<Text style={globalStyles.cardTextItalic}>"{quote.text}"</Text>
					<Text style={styles.author}>— {quote.author || "Unknown"}</Text>
				</>
			) : (
				<Text style={globalStyles.cardTextItalic}>Loading quote...</Text>
			)}
		</View>
	);
};

// Keep only unique styles
const styles = StyleSheet.create({
	author: { fontSize: 14, textAlign: "right" },
});

export default QuoteCard;
