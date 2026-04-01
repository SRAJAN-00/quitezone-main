import { Platform } from "react-native";

const lightAccent = "#1f6a50";
const darkAccent = "#d9ecdf";

export const Colors = {
  light: {
    text: "#15211c",
    background: "#f4efe7",
    tint: lightAccent,
    icon: "#6e766d",
    tabIconDefault: "#7d847c",
    tabIconSelected: lightAccent,
    page: "#f4efe7",
    pageAlt: "#ece3d8",
    surface: "#fbf8f3",
    surfaceStrong: "#ffffff",
    panel: "#10211a",
    panelMuted: "#173127",
    border: "#dfd4c5",
    borderStrong: "#cbbda9",
    muted: "#687167",
    mutedStrong: "#4d574f",
    accent: lightAccent,
    accentSoft: "#deece4",
    accentTextOn: "#f6f2ea",
    success: "#398d5e",
    warning: "#cf814d",
    danger: "#b34d38",
    input: "#fffdf8",
    placeholder: "#9a9489",
    tabBar: "#f7f2eb",
    overlay: "rgba(16, 33, 26, 0.08)",
  },
  dark: {
    text: "#edf4ef",
    background: "#08130f",
    tint: darkAccent,
    icon: "#9fb3a5",
    tabIconDefault: "#74887b",
    tabIconSelected: darkAccent,
    page: "#08130f",
    pageAlt: "#0d1d17",
    surface: "#10211a",
    surfaceStrong: "#152b22",
    panel: "#dbe7de",
    panelMuted: "#11261d",
    border: "#214033",
    borderStrong: "#325340",
    muted: "#97ada1",
    mutedStrong: "#bdcfc3",
    accent: darkAccent,
    accentSoft: "#1a3027",
    accentTextOn: "#10211a",
    success: "#5dbf85",
    warning: "#e3a360",
    danger: "#e07a5f",
    input: "#152b22",
    placeholder: "#6f877c",
    tabBar: "#0b1712",
    overlay: "rgba(3, 8, 6, 0.28)",
  },
};

export type ColorSchemeName = keyof typeof Colors;
export type QuietTheme = (typeof Colors)["light"];

export function getTheme(colorScheme: ColorSchemeName | null | undefined) {
  return Colors[colorScheme ?? "light"];
}

export const Radius = {
  sm: 14,
  md: 20,
  lg: 28,
  pill: 999,
};

export const Spacing = {
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
};

export const Fonts = Platform.select({
  ios: {
    sans: "system-ui",
    serif: "ui-serif",
    rounded: "ui-rounded",
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'Avenir Next Rounded', 'Trebuchet MS', 'Segoe UI', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, monospace",
  },
});
