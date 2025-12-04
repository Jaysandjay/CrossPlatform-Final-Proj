// GET GOOD ADVICE
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

// FETCH A RANDOM ADVICE FROM API (ALWAYS FRESH, NO CACHING)
export const fetchRandomAdvice = async (): Promise<Advice> => {
  try {
    // ADD RANDOM PARAMETER TO PREVENT CACHING AND FORCE NEW ADVICE EACH TIME
    const randomParam = Math.floor(Math.random() * 10000);
    const url = `${BASE_URL}/advice?t=${randomParam}`;

    console.log("🔍 Fetching advice from:", url);

    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    console.log("📡 Advice API Response Status:", response.status);

    if (!response.ok) {
      console.error("❌ Advice API HTTP Error:", response.status, response.statusText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("✅ Advice fetched successfully");

    return { text: data.slip.advice, timestamp: Date.now() };
  } catch (error) {
    console.error("❌ Advice API Error Details:", {
      message: error instanceof Error ? error.message : "Unknown error",
      error: error,
    });
    // RETURN RANDOM DEFAULT ADVICE ON ERROR
    const random = DEFAULT_ADVICE[Math.floor(Math.random() * DEFAULT_ADVICE.length)];
    console.log("📝 Using fallback advice:", random.text.substring(0, 50) + "...");
    return random;
  }
};

// GET RANDOM DEFAULT ADVICE FOR FALLBACK
export const getRandomDefaultAdvice = (): Advice => {
  return DEFAULT_ADVICE[Math.floor(Math.random() * DEFAULT_ADVICE.length)];
};
