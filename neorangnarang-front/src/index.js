import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { BrowserRouter as Router } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import App from "./components/App";
import store from "./redux/store";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./assets/theme/index";

export let persistor = persistStore(store);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {/* <ThemeProvider theme={theme}>
          <CssBaseline /> */}
        <Router>
          <App />
        </Router>
        {/* </ThemeProvider> */}
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
