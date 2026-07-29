import { useUiStore } from "@/store/ui-store";

export function useTheme() {
  const theme = useUiStore((state) => state.theme);
  const toggle = useUiStore((state) => state.toggleTheme);
  const setTheme = useUiStore((state) => state.setTheme);

  return { theme, toggle, setTheme };
}
