import NavBar from "@/components/NavBar";
import TaskManager from "@/components/TaskManager";
import { ThemeProvider } from "next-themes";

export default function Home() {
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <main className="min-h-screen bg-white dark:bg-[#0c1222]">
        <NavBar />
        <div className="container mx-auto px-4">
          <TaskManager />
        </div>
      </main>
    </ThemeProvider>
  );
}
