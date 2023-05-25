"use client";
import DarkModeToggle from "./DarkModeToggle";

const NavBar = () => {
  return (
    <div className="bg-white  dark:bg-[#1e293b99] shadow-1 border-general border-b border-gray-200 dark:border-gray-700 p-2.5  mb-8">
      <div className="flex items-center justify-between container mx-auto px-4">
        <h3 className="text-gray-800 text-lg font-bold dark:text-white">
          DailyTask
        </h3>
        <DarkModeToggle />
      </div>
    </div>
  );
};

export default NavBar;
