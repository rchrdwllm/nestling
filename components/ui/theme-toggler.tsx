import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { Switch } from "./switch";

const ThemeToggler = () => {
  const { theme, setTheme } = useTheme();

  if (!theme) return null;

  const handleThemeChange = (e: any) => {
    e.stopPropagation();

    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div
      onClick={(e) => handleThemeChange(e)}
      className="flex justify-between items-center w-full"
    >
      <div className="flex items-center gap-2">
        {theme === "dark" ? (
          <Sun className="w-4 h-4" />
        ) : (
          <Moon className="w-4 h-4" />
        )}
        <span>{theme.charAt(0).toUpperCase() + theme.slice(1)} mode</span>
      </div>
      <Switch
        checked={theme === "dark"}
        onClick={(e) => handleThemeChange(e)}
      />
    </div>
  );
};

export default ThemeToggler;
