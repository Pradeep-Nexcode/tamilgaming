export const WORLD_THEMES = [
  {
    id: "nature",
    label: "Nature World",
    color: "#2E7D32",
    gradient: "from-green-900/80 to-black",
    keywords: ["forest", "farm", "ranch", "nature", "land", "field"]
  },
  {
    id: "urban",
    label: "Urban World",
    color: "#1565C0",
    gradient: "from-blue-900/80 to-black",
    keywords: ["city", "police", "traffic", "street", "urban"]
  },
  {
    id: "service",
    label: "Service World",
    color: "#8D6E63",
    gradient: "from-amber-900/80 to-black",
    keywords: ["restaurant", "hotel", "cafe", "store", "shop"]
  },
  {
    id: "transport",
    label: "Transport World",
    color: "#F57C00",
    gradient: "from-orange-900/80 to-black",
    keywords: ["truck", "bus", "driver", "taxi", "gas", "station"]
  },
  {
    id: "survival",
    label: "Survival World",
    color: "#6A1B9A",
    gradient: "from-purple-900/80 to-black",
    keywords: ["horror", "escape", "dark", "survival", "fear"]
  }
];

export function detectWorldTheme(text = "") {
  const lower = text.toLowerCase();

  let best = null;
  let bestScore = 0;

  for (const theme of WORLD_THEMES) {
    let score = 0;
    for (const keyword of theme.keywords) {
      if (lower.includes(keyword)) score++;
    }

    if (score > bestScore) {
      bestScore = score;
      best = theme;
    }
  }

  return (
    best || {
      id: "default",
      label: "Murugesan World",
      color: "#F65900",
      gradient: "from-black via-black to-black"
    }
  );
}
