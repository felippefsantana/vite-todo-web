import { Header } from "./components/layout/header";
import { TasksList } from "./components/tasks-list";

function App() {
  return (
    <div className="h-dvh flex justify-center">
      <main className="container px-5 py-4">
        <Header />
        <TasksList />
      </main>
    </div>
  );
}

export default App;
