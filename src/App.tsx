import "./App.css";
import "@fontsource/inter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import OrderPage from "./pages/OrderPage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <OrderPage />
    </QueryClientProvider>
  );
}

export default App;
