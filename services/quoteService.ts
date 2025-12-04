// GET GOOD WISDOM / INSPIRATIONAL QUOTES
import type { Quote } from "@/types/Quote";

const BASE_URL = "https://api.quotable.io";

// DEFAULT QUOTES IN CASE OF API ERROR
const DEFAULT_QUOTES: Quote[] = [
	{ text: "A budget is telling your money where to go instead of wondering where it went.", author: "Dave Ramsey", timestamp: Date.now() },
	{ text: "Do not save what is left after spending, but spend what is left after saving.", author: "Warren Buffett", timestamp: Date.now() },
	{ text: "The habit of saving is itself an education; it fosters every virtue; teaches self-denial; cultivates the sense of order.", author: "T.T. Munger", timestamp: Date.now() },
	{ text: "Beware of little expenses; a small leak will sink a great ship.", author: "Benjamin Franklin", timestamp: Date.now() },
	{ text: "It's not how much money you make, but how much money you keep.", author: "Robert Kiyosaki", timestamp: Date.now() },
];

// FETCH A RANDOM QUOTE FROM QUOTABLE API (ALWAYS FRESH, NO CACHING)
export const fetchRandomQuote = async (tags = "wisdom|inspirational"): Promise<Quote> => {
	try {
		// ADD RANDOM PARAMETER TO PREVENT CACHING AND FORCE NEW QUOTE EACH TIME
		const randomParam = Math.floor(Math.random() * 10000);
		const url = tags ? `${BASE_URL}/random?tags=${tags}&t=${randomParam}` : `${BASE_URL}/random?t=${randomParam}`;

		console.log("🔍 Fetching quote from:", url);

		const response = await fetch(url, {
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

		return {
			text: data.content,
			author: data.author,
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
