import { Header } from "./components/layout/header";
import { TasksList } from "./components/tasks-list";
import { ThemeProvider } from "./providers/theme-provider";

function App() {
  return (
    <ThemeProvider>
      <div className="h-dvh flex justify-center">
        <main className="container px-5 py-4">
          <Header />
          <TasksList />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
