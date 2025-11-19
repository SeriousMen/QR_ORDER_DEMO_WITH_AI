import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MenuPage } from './pages/MenuPage';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-100">
        <MenuPage />
      </div>
    </QueryClientProvider>
  );
}

export default App;