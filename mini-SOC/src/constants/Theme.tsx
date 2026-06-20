import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

/* ============================================================
   theme — colour tokens for the Mini-SOC console and a small
   dark/light provider. The app is dark by default (SOC analysts
   work dark rooms); light mode is supported for documentation.

   If you already have a ThemeProvider, keep yours and just lift
   the BRAND tokens below into it.
   ============================================================ */

export const BRAND = {
  bg: "#0B0B0B",        // page background
  panel: "#141414",     // cards / surfaces
  panelHi: "#1A1A1A",   // raised surfaces
  border: "#262626",    // hairline borders
  yellow: "#FFD400",    // primary accent (caution / alert)
  yellowDim: "#C9A700", // hovers, secondary accent
  text: "#F4F4F4",      // primary text
  muted: "#8A8A8A",     // secondary text
  high: "#FF4D4D",      // HIGH risk band
  medium: "#FFD400",    // MEDIUM risk band
  low: "#46C26B",       // LOW risk band
} as const;

type Theme = "dark" | "light";

interface ThemeContextValue {
  theme: Theme;
  toggle: () => void;
  setTheme: (t: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === "undefined") return "dark";
    const saved = window.localStorage.getItem("minisoc-theme");
    return saved === "light" ? "light" : "dark";
  });

  useEffect(() => {
    applyTheme(theme);
    window.localStorage.setItem("minisoc-theme", theme);
  }, [theme]);

  const setTheme = (t: Theme) => setThemeState(t);
  const toggle = () => setThemeState((t) => (t === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider value={{ theme, toggle, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>");
  return ctx;
}