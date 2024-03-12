import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <MantineProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </MantineProvider>
  );
}

export default App;
