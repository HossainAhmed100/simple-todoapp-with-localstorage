"use client";
import { useEffect, useState } from "react";
import { BsSun, BsMoonFill } from "react-icons/bs";
import { useTheme } from "next-themes";

const DarkModeToggle = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <div>
      {currentTheme === "dark" ? (
        <button className="p-2" onClick={() => setTheme("light")}>
          <BsSun size={18} className="text-amber-500" />
        </button>
      ) : (
        <button className="p-2" onClick={() => setTheme("dark")}>
          <BsMoonFill size={18} className="text-gray-500" />
        </button>
      )}
    </div>
  );
};

export default DarkModeToggle;
