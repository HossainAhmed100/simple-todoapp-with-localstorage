import TaskManager from "@/components/TaskManager";
import { ThemeProvider } from "next-themes";

export default function Home() {
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-white dark:bg-[#0c1222]">
        <TaskManager />
      </main>
    </ThemeProvider>
  );
}
