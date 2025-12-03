import { updateQuote } from "@/redux/actions/inspirationActions";
import type { AppDispatch, RootState } from "@/redux/store";
import { getDailyQuote } from "@/services/quoteService";
import type { Quote } from "@/types/Quote";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const QuoteCard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const inspiration = useSelector((state: RootState) => state.inspiration);
  const showQuotes = useSelector((state: RootState) => state.settings.showQuotes);
  const [loading, setLoading] = useState(false);

  const quote: Quote | null = inspiration.motivationalQuote;

  const fetchQuote = async () => {
    if (!showQuotes) return;
    setLoading(true);
    try {
      const newQuote = await getDailyQuote(inspiration, dispatch);
      dispatch(updateQuote(newQuote));
    } catch (err) {
      console.error("Error fetching quote:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, [showQuotes]);

  if (!showQuotes) return null;

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Daily Inspiration</Text>
      {loading && !quote ? (
        <ActivityIndicator size="small" />
      ) : quote ? (
        <>
          <Text style={styles.text}>"{quote.text}"</Text>
          <Text style={styles.author}>— {quote.author || "Unknown"}</Text>
        </>
      ) : (
        <Text style={styles.text}>Loading quote...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: { padding: 20, backgroundColor: "#fff", borderRadius: 12, marginBottom: 15 },
  title: { fontSize: 18, fontWeight: "600", marginBottom: 10 },
  text: { fontSize: 16, fontStyle: "italic", marginBottom: 5 },
  author: { fontSize: 14, textAlign: "right" },
});

export default QuoteCard;
