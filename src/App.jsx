import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Toaster } from "react-hot-toast";

import {DarkModeProvider} from './context/DarkModeContext';
import AppLayout from "./ui/AppLayout";
import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';
import Customer from './pages/Customer';
import Customers from './pages/Customers';
import Menu from "./pages/Menu";
import Category from "./pages/Foods";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import ProtectedRoute from "./ui/ProtectedRoute";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 1000 * 60, // 1 minute
      staleTime: 0,
    },
  },
});
function App() {
  return (
      <DarkModeProvider>
        <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <BrowserRouter>
        <Routes>
        <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
        <Route
                index
                element={<Navigate replace to="dashboard" />}
              ></Route>
              <Route path="dashboard" element={<Dashboard />}></Route>
              <Route path="orders" element={<Orders />}></Route>
              <Route path="customers" element={<Customers />}></Route>
              <Route path="customers/:customerID" element={<Customer />}></Route>
              <Route path="menu" element={<Menu />}></Route>
              <Route path="menu/:categoryName" element={<Category />}></Route>
        </Route>
              <Route path="login" element={<Login />}></Route>
            <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
        
        </BrowserRouter>
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "var(--color-grey-0)",
              color: "var(--color-grey-700)",
            },
          }}
        />
        </QueryClientProvider>
      </DarkModeProvider>
  );
}

export default App;
