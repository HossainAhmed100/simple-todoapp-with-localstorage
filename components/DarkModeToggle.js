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
    <div className="bg-white dark:bg-[#1e293b99] rounded-md border border-gray-200 dark:border-gray-700">
      {currentTheme === "dark" ? (
        <button className="py-2 px-2.5" onClick={() => setTheme("light")}>
          <BsSun size={18} className="text-amber-500" />
        </button>
      ) : (
        <button className="py-2 px-2.5" onClick={() => setTheme("dark")}>
          <BsMoonFill size={18} className="text-gray-500" />
        </button>
      )}
    </div>
  );
};

export default DarkModeToggle;
