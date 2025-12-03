// services/quoteService.ts
import { updateQuote } from "@/redux/actions/inspirationActions";
import type { AppDispatch, RootState } from "@/redux/store";
import type { Quote } from "@/types/Quote";

const BASE_URL = "https://api.quotable.io";

const DEFAULT_QUOTES: Quote[] = [
  { text: "A budget is telling your money where to go instead of wondering where it went.", author: "Dave Ramsey", timestamp: Date.now() },
  { text: "Do not save what is left after spending, but spend what is left after saving.", author: "Warren Buffett", timestamp: Date.now() },
  { text: "The habit of saving is itself an education; it fosters every virtue; teaches self-denial; cultivates the sense of order.", author: "T.T. Munger", timestamp: Date.now() },
  { text: "Beware of little expenses; a small leak will sink a great ship.", author: "Benjamin Franklin", timestamp: Date.now() },
  { text: "It's not how much money you make, but how much money you keep.", author: "Robert Kiyosaki", timestamp: Date.now() },
];

// Fetch a random quote from Quotable API
export const fetchRandomQuote = async (tags = "wisdom|inspirational"): Promise<Quote> => {
  try {
    const url = tags ? `${BASE_URL}/random?tags=${tags}` : `${BASE_URL}/random`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return {
      text: data.content,
      author: data.author,
      timestamp: Date.now(),
    };
  } catch (error) {
    console.error("Quote API Error:", error);
    const random = DEFAULT_QUOTES[Math.floor(Math.random() * DEFAULT_QUOTES.length)];
    return random;
  }
};

// Check if quote cache is stale (>24 hours)
export const isQuoteCacheStale = (timestamp?: number) => {
  if (!timestamp) return true;
  const age = Date.now() - timestamp;
  return age > 24 * 60 * 60 * 1000; // 24 hours
};

// Get daily quote with cache check
export const getDailyQuote = async (cache: RootState["inspiration"], dispatch: AppDispatch): Promise<Quote> => {
  if (cache.motivationalQuote && !isQuoteCacheStale(cache.motivationalQuote.timestamp)) {
    return cache.motivationalQuote;
  }

  const quote = await fetchRandomQuote();
  dispatch(updateQuote(quote));
  return quote;
};

// Get random default quote for fallback
export const getRandomDefaultQuote = (): Quote => {
  return DEFAULT_QUOTES[Math.floor(Math.random() * DEFAULT_QUOTES.length)];
};
