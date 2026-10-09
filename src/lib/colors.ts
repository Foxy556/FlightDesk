/** Paleta compartilhada dos cards (stats e ações rápidas). */
export const colorMap: Record<
  string,
  { glow: string; text: string; border: string; bg: string }
> = {
  blue: {
    glow: "rgba(59,130,246,0.12)",
    text: "var(--accent-blue-light)",
    border: "rgba(59,130,246,0.25)",
    bg: "var(--accent-blue-glow)",
  },
  red: {
    glow: "rgba(239,68,68,0.12)",
    text: "#f87171",
    border: "rgba(239,68,68,0.25)",
    bg: "var(--accent-red-glow)",
  },
  yellow: {
    glow: "rgba(245,158,11,0.12)",
    text: "#fbbf24",
    border: "rgba(245,158,11,0.25)",
    bg: "var(--accent-yellow-glow)",
  },
  green: {
    glow: "rgba(16,185,129,0.12)",
    text: "#34d399",
    border: "rgba(16,185,129,0.25)",
    bg: "var(--accent-green-glow)",
  },
};
