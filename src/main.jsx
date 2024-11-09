/*Nuestro punto de entrada, renderizo app.js*/

import * as React from "react";
import * as ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from './routes/AuthContext';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);