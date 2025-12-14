export const WORLD_PROFILES = [
  {
    id: "nature",
    label: "Nature World",
    color: "#2E7D32",
    keywords: ["forest", "farm", "ranch", "village", "field", "nature"],
    description:
      "A grounded world shaped by land, responsibility, and slow but meaningful work."
  },
  {
    id: "service",
    label: "Service World",
    color: "#8D6E63",
    keywords: ["restaurant", "hotel", "cafe", "shop", "store"],
    description:
      "A fast-paced service world where Murugesan balances chaos, people, and pressure."
  },
  {
    id: "transport",
    label: "Transport World",
    color: "#F57C00",
    keywords: ["truck", "bus", "driver", "taxi", "gas", "station", "road"],
    description:
      "A journey-driven world built on roads, patience, and endless miles."
  },
  {
    id: "urban",
    label: "Urban World",
    color: "#1565C0",
    keywords: ["city", "police", "traffic", "crime", "metro"],
    description:
      "An urban world of control, systems, and high-stakes decision making."
  },
  {
    id: "survival",
    label: "Survival World",
    color: "#6A1B9A",
    keywords: ["horror", "escape", "dark", "survival", "alone"],
    description:
      "A tense survival world where instinct, fear, and choice define every step."
  }
];

/**
 * Detect world profile using confidence score
 */
export function detectWorldProfile(text) {
  const lower = text.toLowerCase();

  let bestMatch = null;
  let bestScore = 0;

  for (const profile of WORLD_PROFILES) {
    let score = 0;
    for (const keyword of profile.keywords) {
      if (lower.includes(keyword)) score++;
    }

    if (score > bestScore) {
      bestScore = score;
      bestMatch = profile;
    }
  }

  return (
    bestMatch || {
      id: "generic",
      label: "Unknown World",
      color: "#444",
      description:
        "A unique chapter in Murugesan’s journey across different worlds."
    }
  );
}
