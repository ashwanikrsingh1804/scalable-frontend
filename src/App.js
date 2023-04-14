import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Invoice from "./pages/Invoice";
import { ThemeProvider, createTheme } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";
import CreateCustomer from "./pages/CreateCustomer";

const queryClient = new QueryClient();
const theme = createTheme();

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <div className="App">
            <ToastContainer position="top-center" />
            <Switch>
              <Route exact path="/" component={CreateCustomer} />
              <Route path="/invoice" component={Invoice} />
            </Switch>
          </div>
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
