// src/lib/mythologyGame.ts
import { createClient, createAccount } from "genlayer-js";
import { studionet } from "genlayer-js/chains";

export const CONTRACT_ADDRESS = "0xCBeB2FA57794ad3752F49Ce250B680CA601b768F";

let client: any = null;

// Initialize GenLayer client
export const initializeGenLayer = async () => {
  if (client) return client;

  const privateKey = import.meta.env.VITE_GENLAYER_KEY || "";

  if (!privateKey) {
    console.warn("⚠️ No VITE_GENLAYER_KEY set - using read-only mode");
    client = createClient({ chain: studionet }); // ✅ removed stray account
  } else {
    const account = createAccount(privateKey as `0x${string}`);
    client = createClient({ chain: studionet, account });
  }

  try {
    await client.initializeConsensusSmartContract();
    console.log("✅ GenLayer consensus initialized");
  } catch (e) {
    console.error("❌ Failed to initialize consensus:", e);
  }

  return client;
};

export interface QuizEntry {
  answer: string;
  pantheon: string;
  known_for: string;
  hints: string[];
}

export interface QuizData {
  quiz: QuizEntry[];
}

// Fallback quiz data if parsing fails
const FALLBACK_QUIZ: QuizData = {
  quiz: [
    {
      answer: "Zeus",
      pantheon: "Greek",
      known_for: "King of the Olympian gods, thunderbolts",
      hints: ["Father of many heroes", "Wields thunderbolts", "Sky god"],
    },
    {
      answer: "Athena",
      pantheon: "Greek",
      known_for: "Goddess of wisdom and strategic warfare",
      hints: ["Born from Zeus' head", "Patron of Athens", "Associated with the owl"],
    },
    {
      answer: "Poseidon",
      pantheon: "Greek",
      known_for: "God of the sea and earthquakes",
      hints: ["Carries a trident", "Brother of Zeus", "Ruler of the oceans"],
    },
    {
      answer: "Odin",
      pantheon: "Norse",
      known_for: "Wisdom, war, death",
      hints: ["All-Father", "Sacrificed an eye", "Two ravens Huginn and Muninn"],
    },
    {
      answer: "Thor",
      pantheon: "Norse",
      known_for: "God of thunder, protector of mankind",
      hints: ["Wields the hammer Mjölnir", "Son of Odin", "Associated with storms"],
    },
    {
      answer: "Freyja",
      pantheon: "Norse",
      known_for: "Goddess of love, beauty, and battle",
      hints: ["Leading the Valkyries", "Associated with a chariot of cats", "Seeks love and treasures"],
    },
    {
      answer: "Ra",
      pantheon: "Egyptian",
      known_for: "Sun god and creator",
      hints: ["Travels across the sky in a solar barque", "Often depicted with a sun disk", "Primary creator deity"],
    },
    {
      answer: "Anubis",
      pantheon: "Egyptian",
      known_for: "God of mummification and the afterlife",
      hints: ["Head of a jackal", "Weighs the heart in the afterlife", "Protector of tombs"],
    },
    {
      answer: "Vishnu",
      pantheon: "Hindu",
      known_for: "Preserver and protector of the universe",
      hints: ["Has many avatars like Krishna and Rama", "Often depicted with a conch and discus", "Maintains cosmic order"],
    },
    {
      answer: "Shiva",
      pantheon: "Hindu",
      known_for: "Destroyer and transformer",
      hints: ["Performs the cosmic dance (Tandava)", "Often shown with a third eye", "Wears the river Ganga in his hair"],
    },
    {
      answer: "Amaterasu",
      pantheon: "Japanese",
      known_for: "Sun goddess and ruler of the heavens",
      hints: ["Emerges from a cave bringing light", "Ancestor of the imperial family", "Associated with the sun"],
    },
    {
      answer: "Jupiter",
      pantheon: "Roman",
      known_for: "King of the Roman gods, sky and thunder",
      hints: ["Equivalent to Zeus", "Bearer of lightning", "Chief deity of Rome"],
    },
  ],
};

// Utility: safely parse JSON
function safeParseJSON(input: string) {
  try {
    if (!input || typeof input !== "string") return null;

    let cleaned = input.replace(/```json/g, "").replace(/```/g, "").trim();

    // Handle double-encoded JSON
    if (
      (cleaned.startsWith('"') && cleaned.endsWith('"')) ||
      (cleaned.startsWith("'") && cleaned.endsWith("'"))
    ) {
      cleaned = cleaned.slice(1, -1).replace(/\\"/g, '"');
    }

    return JSON.parse(cleaned);
  } catch (err) {
    console.error("⚠️ Failed to parse JSON:", input, err);

    // Try to salvage first JSON object substring
    const match = input.match(/\{[\s\S]*\}/);
    if (match) {
      try {
        return JSON.parse(match[0]);
      } catch (innerErr) {
        console.error("⚠️ Recovery parse failed:", innerErr);
      }
    }
    return null;
  }
}

// Read: Get the active quiz from contract
export const getActiveQuiz = async (): Promise<QuizData> => {
  try {
    const activeClient = await initializeGenLayer();

    const result = await activeClient.readContract({
      address: CONTRACT_ADDRESS,
      functionName: "get_active_quiz", // ✅ matches contract
    });

    console.log("✅ Got quiz data from contract:", result);

    const data = typeof result === "string" ? safeParseJSON(result) : result;
    return data || FALLBACK_QUIZ; // ✅ fallback if parsing fails
  } catch (e) {
    console.error("❌ Failed to read contract:", e);
    return FALLBACK_QUIZ;
  }
};

// Write: Generate a new quiz
export const generateNewQuiz = async (): Promise<QuizData> => {
  try {
    const activeClient = await initializeGenLayer();

    const hash = await activeClient.writeContract({
      address: CONTRACT_ADDRESS,
      functionName: "generate_new_quiz", // ✅ matches contract
    });

    console.log("📝 Transaction sent! Hash:", hash);

    await activeClient.waitForTransactionReceipt({
      hash,
      status: "ACCEPTED",
      retries: 120,
      interval: 5000,
    });

    console.log("✅ Transaction accepted, fetching new quiz...");
    return await getActiveQuiz();
  } catch (e) {
    console.error("❌ Failed to generate new quiz:", e);
    return FALLBACK_QUIZ;
  }
};

// Check contract connection status
export const checkContractStatus = async (): Promise<boolean> => {
  try {
    await initializeGenLayer();
    return true;
  } catch {
    return false;
  }
};