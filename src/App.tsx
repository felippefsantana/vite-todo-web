import { Header } from "./components/layout/header";
import { TodoList } from "./components/todo/todo-list";
import { ThemeProvider } from "./providers/theme-provider";

function App() {
  return (
    <ThemeProvider>
      <div className="h-dvh flex justify-center">
        <main className="container px-5 py-4">
          <Header />
          <TodoList />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
