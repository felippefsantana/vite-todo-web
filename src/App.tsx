import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Header } from "./components/layout/header";
import { TasksList } from "./components/tasks-list";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="h-dvh flex justify-center">
        <main className="container px-5 py-4">
          <Header />
          <TasksList />
        </main>
      </div>
    </QueryClientProvider>
  );
}

export default App;
