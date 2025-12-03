// services/adviceService.ts
import { updateAdvice } from "@/redux/actions/inspirationActions";
import type { AppDispatch, RootState } from "@/redux/store";
import type { Advice } from "@/types/Advice";

const BASE_URL = "https://api.adviceslip.com";

const DEFAULT_ADVICE: Advice[] = [
  { text: "Track every expense, no matter how small. Small leaks sink great ships.", timestamp: Date.now() },
  { text: "Set a realistic budget and stick to it. Your future self will thank you.", timestamp: Date.now() },
  { text: "Before making a purchase, wait 24 hours. If you still want it, then consider buying.", timestamp: Date.now() },
  { text: "Save at least 20% of your income. Pay yourself first, then pay your bills.", timestamp: Date.now() },
  { text: "Review your expenses weekly. Awareness is the first step to better financial habits.", timestamp: Date.now() },
  { text: "Avoid impulse purchases. Ask yourself: Do I need this, or do I just want it?", timestamp: Date.now() },
  { text: "Build an emergency fund. Aim for at least 3-6 months of living expenses.", timestamp: Date.now() },
];

// Fetch a random advice from API
export const fetchRandomAdvice = async (): Promise<Advice> => {
  try {
    const response = await fetch(`${BASE_URL}/advice`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return { text: data.slip.advice, timestamp: Date.now() };
  } catch (error) {
    console.error("Advice API Error:", error);
    const random = DEFAULT_ADVICE[Math.floor(Math.random() * DEFAULT_ADVICE.length)];
    return random;
  }
};

// Check if advice cache is stale (>24 hours)
export const isAdviceCacheStale = (timestamp?: number) => {
  if (!timestamp) return true;
  const age = Date.now() - timestamp;
  return age > 24 * 60 * 60 * 1000; // 24 hours
};

// Get daily advice with cache check
export const getDailyAdvice = async (cache: RootState["inspiration"], dispatch: AppDispatch): Promise<Advice> => {
  if (cache.dailyAdvice && !isAdviceCacheStale(cache.dailyAdvice.timestamp)) {
    return cache.dailyAdvice;
  }

  const advice = await fetchRandomAdvice();
  dispatch(updateAdvice(advice));
  return advice;
};

// Get random default advice for fallback
export const getRandomDefaultAdvice = (): Advice => {
  return DEFAULT_ADVICE[Math.floor(Math.random() * DEFAULT_ADVICE.length)];
};
