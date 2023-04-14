import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddEdit from "./pages/AddEdit";
import Home from "./pages/Home";
import View from "./pages/View";
import Invoice from "./pages/Invoice";
import { ThemeProvider, createTheme } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";

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
              <Route exact path="/" component={Home} />
              <Route path="/addContact" component={AddEdit} />
              <Route path="/update/:id" component={AddEdit} />
              <Route path="/view/:id" component={View} />
              <Route path="/invoice" component={Invoice} />
            </Switch>
          </div>
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
