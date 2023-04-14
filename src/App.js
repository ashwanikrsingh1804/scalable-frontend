import {
  BrowserRouter,
  Routes,
  Route,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Invoice from "./pages/Invoice";
import { ThemeProvider, createTheme } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";
import CreateCustomer from "./pages/CreateCustomer";

const queryClient = new QueryClient();
const theme = createTheme();

const router = createBrowserRouter([
  {
    path: "/",
    element: <CreateCustomer />,
  },
  {
    path: "/invoice/:prescriptionId",
    element: <Invoice />,
  },
]);
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <div className="App">
          <ToastContainer position="top-center" />

          <RouterProvider router={router} />
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
