// React Libraries
import React from "react";
import ReactDOM from "react-dom/client";
// React Router Components
import { BrowserRouter } from "react-router-dom";
// Root Component
import App from "./components/App.jsx";
// CSS Files
import "./assets/css/main.css";
import "./assets/css/components.css";
import "./assets/css/global_rules.css";
import "normalize.css"; // Normalize.css Library

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
