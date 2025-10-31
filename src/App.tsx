import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Layout } from './layouts/Layout';
import { MenuPage } from './pages/MenuPage';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <MenuPage />
      </Layout>
    </QueryClientProvider>
  );
}

export default App;