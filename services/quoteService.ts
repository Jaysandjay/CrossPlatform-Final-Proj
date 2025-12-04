// GET GOOD WISDOM / INSPIRATIONAL QUOTES
import { Platform } from "react-native";
import type { Quote } from "@/types/Quote";

const BASE_URL = "https://zenquotes.io/api";
const CORS_PROXY = "https://corsproxy.io/?"; // CORS proxy for web browsers

// DEFAULT QUOTES IN CASE OF API ERROR
const DEFAULT_QUOTES: Quote[] = [
	{ text: "A budget is telling your money where to go instead of wondering where it went.", author: "Dave Ramsey", timestamp: Date.now() },
	{ text: "Do not save what is left after spending, but spend what is left after saving.", author: "Warren Buffett", timestamp: Date.now() },
	{ text: "The habit of saving is itself an education; it fosters every virtue; teaches self-denial; cultivates the sense of order.", author: "T.T. Munger", timestamp: Date.now() },
	{ text: "Beware of little expenses; a small leak will sink a great ship.", author: "Benjamin Franklin", timestamp: Date.now() },
	{ text: "It's not how much money you make, but how much money you keep.", author: "Robert Kiyosaki", timestamp: Date.now() },
];

// FETCH A RANDOM QUOTE FROM ZENQUOTES API (ALWAYS FRESH, NO CACHING)
// NOTE: On web, we use a CORS proxy to bypass browser CORS restrictions
export const fetchRandomQuote = async (): Promise<Quote> => {
	try {
		// ADD RANDOM PARAMETER TO PREVENT CACHING AND FORCE NEW QUOTE EACH TIME
		const randomParam = Math.floor(Math.random() * 10000);
		const url = `${BASE_URL}/random?t=${randomParam}`;

		// Use CORS proxy for web, direct URL for native
		const finalUrl = Platform.OS === 'web'
			? `${CORS_PROXY}${encodeURIComponent(url)}`
			: url;

		console.log("🔍 Fetching quote from:", finalUrl);

		const response = await fetch(finalUrl, {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
		});

		console.log("📡 Quote API Response Status:", response.status);

		if (!response.ok) {
			console.error("❌ Quote API HTTP Error:", response.status, response.statusText);
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		console.log("✅ Quote fetched successfully");

		// ZenQuotes returns an array with one object: { q: quote, a: author, h: html }
		const quoteData = Array.isArray(data) ? data[0] : data;

		return {
			text: quoteData.q,
			author: quoteData.a,
			timestamp: Date.now(),
		};
	} catch (error) {
		console.error("❌ Quote API Error Details:", {
			message: error instanceof Error ? error.message : "Unknown error",
			error: error,
		});
		// RETURN RANDOM DEFAULT QUOTE ON ERROR
		const random = DEFAULT_QUOTES[Math.floor(Math.random() * DEFAULT_QUOTES.length)];
		console.log("📝 Using fallback quote:", random.text.substring(0, 50) + "...");
		return random;
	}
};
