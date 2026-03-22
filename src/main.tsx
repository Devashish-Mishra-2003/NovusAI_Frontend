import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { MantineProvider, createTheme } from "@mantine/core";
import "@mantine/core/styles.css";
import "./index.css";

import App from "./App";
import { AuthProvider } from "./auth/AuthContext";
import { Notifications } from "@mantine/notifications";

const theme = createTheme({
  fontFamily: '"Inter", sans-serif',
  headings: { fontFamily: '"Inter", sans-serif' },
  primaryColor: 'indigo',
  defaultRadius: 'lg',
  shadows: {
    md: '0 8px 30px rgba(0,0,0,0.05)',
    xl: '0 20px 40px rgba(0,0,0,0.1)',
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider defaultColorScheme="dark" theme={theme}>
      <Notifications position="top-right" />
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </MantineProvider>
  </React.StrictMode>
);
